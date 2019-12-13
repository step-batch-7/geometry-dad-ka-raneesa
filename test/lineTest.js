const assert = require("assert");
const Line = require("../src/line.js");
describe("Line", function() {
  describe("toString", function() {
    it("Should give the string representation", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const actual = line1.toString();
      const expected = `Line (2,3) (4,5)`;
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("isEqualTo", function() {
    it("Should validate for two similar lines", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const actual = line1.isEqualTo(line2);
      assert.strictEqual(actual, true);
    });
    it("Should validate for two distinct lines", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 4, y: 5 }, { x: 4, y: 6 });
      const actual = line1.isEqualTo(line2);
      assert.strictEqual(actual, false);
    });
  });
});
