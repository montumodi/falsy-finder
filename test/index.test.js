const getFalsyValues = require("../src/index");
const someJson = require("./testData.json");

const expectedResult = [
  { key: 'firstName', value: '' },
  { key: 'City', value: null },
  { key: 'tags', value: '' },
  { key: 'tags', value: null }
];

console.log(getFalsyValues(JSON.stringify(someJson)));