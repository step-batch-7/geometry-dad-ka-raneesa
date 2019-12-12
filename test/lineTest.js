const assert = require("assert");
const Line = require("../src/line.js");
describe("Line", function() {
  describe("toString", function() {
    it("Should give the string representation", function() {
      const line1 = new Line(2, 3, 4, 5);
      const actual = line1.toString();
      const expected = `Line (2,3) (4,5)`;
      assert.deepStrictEqual(actual, expected);
    });
  });
});
