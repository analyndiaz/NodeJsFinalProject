const Joi = require("joi");
const customErrorGenerator = require("./customErrorGenerator");

const eventValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  startDateTime: Joi.date().iso().required(),
  endDateTime: Joi.date().iso().min(Joi.ref("startDateTime")).required(),
}).error((errors) => {
  return customErrorGenerator("Event", errors);
});

module.exports = eventValidator;
