const {
  memberRepository,
  attendanceRepository,
} = require("../db/repositories");
const { MemberModel } = require("../models");
const {
  objectHelper: { isEmpty },
} = require("../utilities/");
const BaseController = require("./baseController");

class MemberController extends BaseController {
  constructor() {
    super(memberRepository, "Member");
  }

  getMember = async (req, res) => {
    const { id } = req.params;

    const dbMember = await memberRepository.getById(id);
    if (isEmpty(dbMember)) {
      return res.status(404).json({
        error: `Member with id: ${id} does not exists.`,
      });
    }

    const member = new MemberModel(dbMember);

    const attendance = await attendanceRepository.getByMemberId(id);
    member.mapEventAttendance(attendance);

    res.send(member);
  };

  searchMember = async (req, res) => {
    const { name, status } = req.query;
    if (!name && !status) {
      return res.status(404).json({
        error: `No valid search criteria provided.`,
      });
    }
    const dbMember = await memberRepository.search(name, status);

    res.send(dbMember);
  };

  createMember = async (req, res) => {
    const { name: memberName } = req.body;
    const dbMember = await memberRepository.getByFilter({
      name: memberName,
    });
    if (!isEmpty(dbMember)) {
      return res.status(409).json({
        error: `Member: ${memberName} already exists.`,
      });
    }

    return await this.createData(req, res);
  };

  deleteMember = async (req, res) => {
    const { id } = req.params;

    const attendance = await attendanceRepository.getByMemberId(id);
    if (!isEmpty(attendance)) {
      return res.status(422).json({
        error: `Cannot delete member id: ${id} with event attendance.`,
      });
    }

    return await this.deleteData(req, res);
  };
}

module.exports = new MemberController();
