class MemberModel {
  constructor(member) {
    this.memberId = member._id;
    this.name = member.name;
    this.status = member.status;
    this.joinedDate = member.joinedDate;
    this.eventAttendance = [];
  }

  mapEventAttendance = (eventAttendance) => {
    eventAttendance.forEach((attendance) => {
      const { _id, name } = attendance.event;
      const { timeIn, timeOut } = attendance;

      this.eventAttendance.push(
        new EventAttendance(_id, name, timeIn, timeOut)
      );
    });
  };
}

class EventAttendance {
  constructor(id, name, timeIn, timeOut) {
    this.eventId = id;
    this.name = name;
    this.timeIn = timeIn;
    this.timeOut = timeOut;
  }
}

module.exports = MemberModel;
