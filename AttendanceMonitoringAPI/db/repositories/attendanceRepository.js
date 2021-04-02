const { Attendance } = require("../entities");
const BaseRepository = require("./baseRepository");
const {
  objectHelper: { isEmpty },
} = require("../../utilities");

class AttendanceRepository extends BaseRepository {
  constructor() {
    super(Attendance);
  }

  async getByEventId(id) {
    const eventAttendance = Attendance.find({ event: id })
      .select({ timeIn: 1, timeOut: 1, members: 1, event: 1, _id: 0 })
      .populate({ path: "members", select: ["_id", "name"] })
      .sort({ timeIn: 1 })
      .exec();

    return eventAttendance;
  }

  async getByMemberId(id) {
    const memberAttendance = Attendance.find({
      members: { $in: [id] },
    })
      .select({ timeIn: 1, timeOut: 1, event: 1, members: 1, _id: 0 })
      .populate({ path: "event", select: ["_id", "name"] })
      .sort({ timeIn: 1 })
      .exec();

    return memberAttendance;
  }

  async insert(data) {
    const newAttendance = new Attendance({
      timeIn: data.timeIn,
      timeOut: data.timeOut,
      members: data.members,
      event: data.event,
    });

    await this.save(newAttendance);
  }

  async update(id, data) {
    const dbAttendance = await this.getById(id);

    if (isEmpty(dbAttendance)) {
      return;
    }

    if (data.timeIn) dbAttendance.timeIn = data.timeIn;
    if (data.timeOut) dbAttendance.timeOut = data.timeOut;
    if (data.members) dbAttendance.members = data.members;
    if (data.event) dbAttendance.event = data.event;

    await this.save(dbAttendance);
  }
}

module.exports = new AttendanceRepository();
