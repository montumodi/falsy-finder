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
function handleArray(arr) {
  arr.forEach(element => {
    isArray(element) ? handleArray(element): handleObject(element);
  });
}

function handleObject(obj) {
  Object.keys(obj).forEach(key => {
    if(defaultFalsyValuesToCheck.includes(obj[key])) {
      falsies.push({"key": key, "value": obj[key]});
    }
    if (isObject(obj[key])) {
      handleObject(obj[key]);
    }
    if(isArray(obj[key])) {
      handleArray(obj[key]);
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

