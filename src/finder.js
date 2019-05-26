
const assert = require("assert");
const getOptions = require("./optionsProvider");

function getFinder(options) {

  const validatedOptions = getOptions(options);

  function prepareFalsyValues(obj, path = [], result = []) {
    let value;
    let fieldPath;
    Object.keys(obj).forEach(key => {
      value = obj[key];
      const modifiedKey = isNaN(key) ? key : `[${key}]`;
      fieldPath = path.concat([modifiedKey]);
      if (value instanceof Object) {
        prepareFalsyValues(value, fieldPath, result);
      } else if (validatedOptions.falsyValues.includes(value)) {
        result.push({"key": fieldPath.join("."), value});
      }
    });
    return result;
  }

  function getFalsyValues(input) {
    assert(input, "input is required");

    if (typeof (input) !== "object") {
      throw new Error("input is not a valid object");
    }

    return prepareFalsyValues(input);
  }

  return {getFalsyValues};

}


module.exports = getFinder;

