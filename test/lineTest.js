"use strict";

const Line = require("../src/line.js");
const assert = require("chai").assert;

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
      assert.isOk(actual, true);
    });

    it("Should validate for two distinct lines", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 4, y: 5 }, { x: 4, y: 6 });
      const actual = line1.isEqualTo(line2);
      assert.isNotOk(actual, false);
    });

    it("Should validate if we given object is not instance of the class line", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = {
        endA: { x: 2, y: 3 },
        endB: { x: 4, z: 5 }
      };
      const actual = line1.isEqualTo(line2);
      assert.isNotOk(actual, false);
    });
  });

  describe("length", function() {
    it("Should give the length zero if the line of same points", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      const actual = line.length;
      assert.strictEqual(actual, 0);
    });

    it("Should give the length of the line of different positive points", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const actual = line.length;
      assert.approximately(actual, 4.24, 4.25);
    });

    it("Should give the length of the line of different negative points", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      const actual = line.length;
      assert.strictEqual(actual, 5);
    });
  });

  describe("slope", function() {
    it("Should give slope of line has positive points ", function() {
      const line1 = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      const actual = line1.slope;
      assert.approximately(actual, -0.7, 0.5);
    });
    it("Should give slope of line has positive points ", function() {
      const line1 = new Line({ x: -3, y: -4 }, { x: -1, y: -2 });
      const actual = line1.slope;
      assert.approximately(actual, -1, 0.5);
    });
  });
});
