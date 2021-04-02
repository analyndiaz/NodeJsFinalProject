const _ = require("lodash");
const Validators = require("../validators");

const supportedMethods = ["POST", "PUT"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

class SchemaValidator {
  validateRequest = (req, res, next) => {
    const route = req.baseUrl;
    const method = req.method.toUpperCase();

    if (_.includes(supportedMethods, method) && _.has(Validators, route)) {
      const validator = _.get(Validators, route);

      if (validator) {
        try {
          const validationResult = validator.validate(
            req.body,
            validationOptions
          );
          if (!validationResult) {
            return;
          } else if (validationResult.error) {
            res.status(422).json(this.logError(validationResult.error, true));
          } else {
            next();
          }
        } catch (err) {
          res.status(422).json(this.logError(err, false));
        }
      }
    } else {
      next();
    }
  };

  logError = (err, useCustom) => {
    const customError = {
      status: "failed",
      error: {
        details: _.map(err.message.split(","), (errMsg) => ({
          message: errMsg,
        })),
      },
    };

    const defaultError = {
      status: "failed",
      error: `Unexpected error occurred: ${err}.`,
    };

    return useCustom ? customError : defaultError;
  };
}

module.exports = new SchemaValidator();
