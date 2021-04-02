const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  timeIn: {
    type: Date,
    required: true,
  },
  timeOut: {
    type: Date,
    required: false,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "member",
    },
  ],
  event: {
    type: Schema.Types.ObjectId,
    ref: "event",
  },
});

module.exports = Attendance = mongoose.model("attendance", AttendanceSchema);
