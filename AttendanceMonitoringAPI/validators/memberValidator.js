const Joi = require("joi");
const customErrorGenerator = require("./customErrorGenerator");

const memberValidator = Joi.object({
  name: Joi.string().required(),
  joinedDate: Joi.date().iso().optional(),
  status: Joi.string().required(),
}).error((errors) => {
  return customErrorGenerator("Member", errors);
});

module.exports = memberValidator;
