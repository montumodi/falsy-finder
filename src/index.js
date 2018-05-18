const assert = require("assert");
const defaultFalsyValuesToCheck = [
  "",
  null,
  undefined,
  NaN,
  Infinity,
  ''
];

const falsies = [];
function handleArray(key, arr) {
  arr.forEach(element => {
    if (isArray(element)) {
      return handleArray(key, element)
    }

    if (isObject(element)) {
      return handleObject(element)
    }
    return handleSingleValue(key, element)
  });
}

function handleSingleValue(key, val) {
  if(defaultFalsyValuesToCheck.includes(val)) {
    falsies.push({"key": key, "value": val});
  }
}

function handleObject(obj) {
  Object.keys(obj).forEach(key => {
    if(defaultFalsyValuesToCheck.includes(obj[key])) {
      falsies.push({"key": key, "value": obj[key]});
    }
    if (isObject(obj[key])) {
      return handleObject(obj[key]);
    }
    if(isArray(obj[key])) {
      return handleArray(key, obj[key]);
    }
  });
}

function isArray(obj) {
  return obj && typeof(obj) === "object" && obj.constructor.toString().includes("Array");
}

function isObject(obj) {
  return obj && typeof(obj) === "object" && obj.constructor.toString().includes("Object");
}

function getObjectFromString(input) {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error("Provided input is not a valid json");
  }
}

function getFalsyValues(input, falsyValuesToCheck = defaultFalsyValuesToCheck) {
  assert(input, "input is required");

  // clear the array
  falsies.length = 0;

  if (typeof(input) === "string") {
    input = getObjectFromString(input);
  }

  isArray(input) ? handleArray(input): handleObject(input);
  return falsies;
}

module.exports = getFalsyValues;

