const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Member = mongoose.model("member", MemberSchema);
