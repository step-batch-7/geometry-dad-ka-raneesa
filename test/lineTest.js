const assert = require("assert");
const { Line } = require("../src/line.js");
describe("Line", function() {
  describe("toString", function() {
    it("Should give the string representation", function() {
      const a = new Line(2, 3, 4, 5);
      const actual = a.toString();
      const expected = `Line {x1:2,y1:3,x2:4,y2:5}`;
      assert.deepStrictEqual(actual, expected);
    });
  });
});
