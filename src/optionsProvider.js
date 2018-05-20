const Joi = require("joi");

const finderOptionsSchema = Joi.object({
  "falsyValues": Joi.array().optional().default(["", null, undefined, NaN, Infinity])
});

function getOptions(options = {}) {
  const result = Joi.validate(options, finderOptionsSchema);

  if (result.error) {
    throw new Error(result.error);
  }
  return result.value;
}

module.exports = getOptions;