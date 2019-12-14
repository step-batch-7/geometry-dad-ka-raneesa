const assert = require("chai").assert;
const Point = require("./../src/point");

describe("class", function() {
  describe("toString", function() {
    it("should give string representation of the point", function() {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), "[Point @(2,3)]");
    });
  });

  describe("visit", function() {
    const point = new Point(2, 3);
    it("should give the sum of the coordinates", function() {
      const actual = point.visit((x, y) => x + y);
      assert.strictEqual(actual, 5);
    });

    it("should give the product of the coordinates", function() {
      const actual = point.visit((x, y) => x * y);
      assert.strictEqual(actual, 6);
    });
  });
});
