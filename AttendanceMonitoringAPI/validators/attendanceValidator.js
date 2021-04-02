const Joi = require("joi");
const customErrorGenerator = require("./customErrorGenerator");

const attendanceValidator = Joi.object({
  timeIn: Joi.date().iso().required(),
  timeOut: Joi.date().iso().min(Joi.ref("timeIn")).optional(),
  event: Joi.string().required(),
  members: Joi.array().required(),
}).error((errors) => {
  return customErrorGenerator("Attendance", errors);
});

module.exports = attendanceValidator;
