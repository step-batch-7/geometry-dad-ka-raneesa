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
  describe("isEqualTo", function() {
    it("Should validate for two similar lines", function() {
      const a = new Line(2, 3, 4, 5);
      const b = new Line(2, 3, 4, 5);
      const actual = a.isEqualTo(b);
      assert.strictEqual(actual, true);
    });
    it("Should validate for two distinct lines", function() {
      const a = new Line(2, 3, 4, 5);
      const b = new Line(4, 5, 4, 6);
      const actual = a.isEqualTo(b);
      assert.strictEqual(actual, false);
    });
  });
});
