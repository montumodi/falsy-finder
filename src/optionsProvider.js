const Joi = require("@hapi/joi");

const finderOptionsSchema = Joi.object({
  "falsyValues": Joi.array().optional().default(["", null, undefined, NaN])
});

function getOptions(options = {}) {
  const result = finderOptionsSchema.validate(options);

  if (result.error) {
    throw new Error(result.error);
  }
  return result.value;
}

module.exports = getOptions;
