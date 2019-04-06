const finder = require("../src/index");
const testData = require("./testData.json");
const {experiment, it} = (exports.lab = require("lab").script());
const {expect, fail} = require("code");

const expectedResultForArray = [
  {
    "key": "[0].data.firstName",
    "value": ""
  },
  {
    "key": "[1].data.lastName",
    "value": ""
  },
  {
    "key": "[1].data.company.[0].ashi",
    "value": null
  }
];

const expectedResultForObject = [
  {
    "key": "address.City",
    "value": ""
  },
  {
    "key": "tags.[2]",
    "value": ""
  },
  {
    "key": "tags.[3]",
    "value": null
  },
  {
    "key": "tags.[4].[0].nested",
    "value": null
  }
];

experiment("Falsy finder with default options", () => {
  const {getFalsyValues} = finder();
  experiment("getFalsyValues Method", () => {
    experiment("When object (no array) is provided as input", () => {
      it("should return array of keys successfully", () => {
        const result = getFalsyValues(testData.object);
        expect(result).to.equal(expectedResultForObject);
      });
    });
    experiment("When array is provided as input", () => {
      it("should return array of keys successfully", () => {
        const result = getFalsyValues(testData.array);
        expect(result).to.equal(expectedResultForArray);
      });
    });
    experiment("When string is provided as input", () => {
      it("should throw error", () => {
        try {
          getFalsyValues("string");
          fail("should have thrown an error");
        } catch (error) {
          expect(error.message).to.equal("input is not a valid object");
        }
      });
    });
  });
});

experiment("Falsy finder with custom options", () => {
  const {getFalsyValues} = finder({"falsyValues": ["custom", "options"]});
  const objectInput = {
    "data": {
      "value": "custom"
    }
  };
  const arrayInput = [
    {
      "data": "options"
    }
  ];
  experiment("getFalsyValues Method", () => {
    experiment("When object (no array) is provided as input", () => {
      it("should return array of keys successfully", () => {
        const result = getFalsyValues(objectInput);
        expect(result).to.equal([{"key": "data.value", "value": "custom"}]);
      });
    });
    experiment("When array is provided as input", () => {
      it("should return array of keys successfully", () => {
        const result = getFalsyValues(arrayInput);
        expect(result).to.equal([{"key": "[0].data", "value": "options"}]);
      });
    });
    experiment("When string is provided as input", () => {
      it("should throw error", () => {
        try {
          getFalsyValues("custom string");
          fail("should have thrown an error");
        } catch (error) {
          expect(error.message).to.equal("input is not a valid object");
        }
      });
    });
  });
});
