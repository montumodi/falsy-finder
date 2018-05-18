const getFalsyValues = require("../src/index");
const someJson = require("./testData.json");

console.log(getFalsyValues(JSON.stringify(someJson)));
console.log(getFalsyValues(JSON.stringify(someJson)));