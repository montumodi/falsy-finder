const getOptions = require("../src/optionsProvider");
const {experiment, it} = (exports.lab = require("@hapi/lab").script());
const {expect, fail} = require("@hapi/code");


experiment("Falsy finder schema validator", () => {
  experiment("When no options are provided", () => {
    it("should generate options object with default values", () => {
      const options = getOptions();
      expect(options).to.equal({"falsyValues": ["", null, undefined, NaN]});
    });
  });
  experiment("When options are provided", () => {
    it("should generate options object with provided values", () => {
      const options = getOptions({"falsyValues": ["test"]});
      expect(options).to.equal({"falsyValues": ["test"]});
    });
  });
  experiment("When options are provided with not allowed property", () => {
    it("should generate options object with provided values", () => {
      try {
        getOptions({"falsyValues1": ["test"]});
        fail("should not have passed");
      } catch (error) {
        expect(error.message).to.equal("ValidationError: \"falsyValues1\" is not allowed");
      }
    });
  });
});
