const assert = require("assert");

/* eslint-disable no-undefined */

function getFinder(falsyValuesToCheck = ["", null, undefined, NaN, Infinity, ""]) {

  const falsies = [];

  function isArray(obj) {
    return (
      obj &&
    typeof obj === "object" &&
    obj.constructor.toString().includes("Array")
    );
  }

  function isObject(obj) {
    return (
      obj &&
    typeof obj === "object" &&
    obj.constructor.toString().includes("Object")
    );
  }

  function handleSingleValue(key, value) {
    if (falsyValuesToCheck.includes(value)) {
      falsies.push({key, value});
    }
  }

  function handleObject(obj) {
    Object.keys(obj).forEach(key => {
      if (falsyValuesToCheck.includes(obj[key])) {
        falsies.push({key, "value": obj[key]});
      }
      if (isObject(obj[key])) {
        return handleObject(obj[key]);
      }
      if (isArray(obj[key])) {
        return handleArray(key, obj[key]); /* eslint-disable-line no-use-before-define*/
      }
    });
  }

  function handleArray(key, arr) {
    arr.forEach(element => {
      if (isArray(element)) {
        return handleArray(key, element);
      }

      if (isObject(element)) {
        return handleObject(element);
      }
      return handleSingleValue(key, element);
    });
  }

  function getFalsyValues(input) {
    assert(input, "input is required");

    // clear the array
    falsies.length = 0;

    if (typeof (input) !== "object") {
      throw new Error("input is not a valid object");
    }

    isArray(input) ? handleArray("array", input) : handleObject(input);
    return falsies;
  }

  return {getFalsyValues};

}


module.exports = getFinder;

/* eslint-enable no-undefined */
