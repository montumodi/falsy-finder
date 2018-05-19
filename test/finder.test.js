const finder = require("../src/index");
const testData = require("./testData.json");
const {experiment, it} = (exports.lab = require("lab").script());
const {expect, fail} = require("code");

const expectedResultForArray = [
  {
    "key": "firstName",
    "value": ""
  },
  {
    "key": "lastName",
    "value": null
  }
];

const expectedResultForObject = [
  {
    "key": "firstName",
    "value": ""
  },
  {
    "key": "City",
    "value": null
  },
  {
    "key": "tags",
    "value": ""
  },
  {
    "key": "tags",
    "value": null
  },
  {
    "key": "nested",
    "value": null
  }
];

experiment("Falsy finder with default options", () => {
  const {getFalsyValues} = finder();
  experiment("getFalsyValues Method", () => {
    experiment("When object (no array) is provided as input", () => {
      it("should return array of keys successfully", done => {
        const result = getFalsyValues(testData.object);
        expect(result).to.equal(expectedResultForObject);
        done();
      });
    });
    experiment("When array is provided as input", () => {
      it("should return array of keys successfully", done => {
        const result = getFalsyValues(testData.array);
        expect(result).to.equal(expectedResultForArray);
        done();
      });
    });
  });
  experiment("When string is provided as input", () => {
    it("should throw error", done => {
      try {
        getFalsyValues("string");
        fail("should have thrown an error");
      } catch (error) {
        expect(error).to.equal(new Error("input is not a valid object"));
      }
      done();
    });
  });
});

