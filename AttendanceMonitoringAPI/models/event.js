class EventModel {
  constructor(event) {
    this.eventId = event._id;
    this.name = event.name;
    this.type = event.type;
    this.startDateTime = event.startDateTime;
    this.endDateTime = event.endDateTime;
    this.memberAttendance = [];
  }

  mapMemberAttendance = (memberAttendance) => {
    memberAttendance.forEach((attendance) => {
      const { timeIn, timeOut } = attendance;
      const mappedMembers = attendance.members.map(
        (member) =>
          new MemberAttendance(member._id, member.name, timeIn, timeOut)
      );

      this.memberAttendance.push(...mappedMembers);
    });
  };
}

class MemberAttendance {
  constructor(id, name, timeIn, timeOut) {
    this.memberId = id;
    this.name = name;
    this.timeIn = timeIn;
    this.timeOut = timeOut;
  }
}

module.exports = EventModel;
