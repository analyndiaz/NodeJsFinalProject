const {
  attendanceRepository,
  eventRepository,
  memberRepository,
} = require("../db/repositories");
const {
  objectHelper: { isEmpty, asyncForEach },
} = require("../utilities");
const BaseController = require("./baseController");

class AttendanceController extends BaseController {
  constructor() {
    super(attendanceRepository, "Attendance");
  }

  createAttendance = async (req, res) => {
    const { members, event } = req.body;

    const checkMembers = await this.checkEventMembers(event, members);

    if (!checkMembers.success) {
      return res.status(404).json({
        error: checkMembers.errors,
      });
    }

    return await this.createData(req, res);
  };

  updateAttendance = async (req, res) => {
    const { members, event } = req.body;

    const checkMembers = await this.checkEventMembers(event, members);

    if (!checkMembers.success) {
      return res.status(404).json({
        error: checkMembers.errors,
      });
    }

    return await this.updateData(req, res);
  };

  checkEventMembers = async (event, members) => {
    const dbEvent = await eventRepository.getById(event);
    if (isEmpty(dbEvent)) {
      return {
        success: false,
        errors: `Event with id: ${event} does not exists.`,
      };
    }

    return await this.checkMembers(members);
  };

  checkMembers = async (members) => {
    let result = { success: true, errors: [] };
    await asyncForEach(members, async (member) => {
      const dbMember = await memberRepository.getById(member);
      if (isEmpty(dbMember) || dbMember.status === "In-active") {
        result.success = false;
        result.errors.push(
          `Member with id: ${member} does not exist or inactive.`
        );
      }
    });
    return result;
  };
}

module.exports = new AttendanceController();
