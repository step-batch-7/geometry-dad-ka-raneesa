"use strict";

const assert = require("chai").assert;
const Line = require("../src/line");
const Point = require("../src/point");

describe("Line", function() {
  describe("toString", function() {
    it("Should give the string representation", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const actual = line1.toString();
      const expected = `[Line (2,3) to (4,5)]`;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    it("Should validate for two similar lines", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      assert.isTrue(line1.isEqualTo(line2));
    });

    it("Should validate for two distinct lines", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 4, y: 5 }, { x: 4, y: 6 });
      assert.isFalse(line1.isEqualTo(line2));
    });

    it("Should validate if we given object is not instance of the class line", function() {
      const line1 = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const line2 = {
        endA: { x: 2, y: 3 },
        endB: { x: 4, z: 5 }
      };
      assert.isFalse(line1.isEqualTo(line2));
    });
  });

  describe("length", function() {
    it("Should give the length zero if the line of same points", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 0);
    });

    it("Should give the length of the line of different positive points", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      assert.approximately(line.length, 4.24, 4.25);
    });

    it("Should give the length of the line of different negative points", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 5);
    });
  });

  describe("slope", function() {
    it("Should give slope of line has positive points ", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      assert.approximately(line.slope, 0.7, 0.5);
    });

    it("Should give slope of line has positive points ", function() {
      const line = new Line({ x: -3, y: -4 }, { x: -1, y: -2 });
      assert.approximately(line.slope, 1, 0.1);
    });

    it("should give the positive infinity if the x coordinates are the same and endA ordinate is less than endB ordinate", function() {
      const endA = { x: 1, y: 0 };
      const endB = { x: 1, y: 5 };
      const line = new Line(endA, endB);
      const expected = Infinity;
      assert.strictEqual(line.slope, expected);
    });

    it("should give the negative infinity if the x coordinates are the same and endB ordinate is less than endA ordinate", function() {
      const endA = { x: 1, y: 5 };
      const endB = { x: 1, y: 0 };
      const line = new Line(endA, endB);
      const expected = -Infinity;
      assert.strictEqual(line.slope, expected);
    });

    it("should give zero if the ordinates are equal", function() {
      const endA = { x: 2, y: 5 };
      const endB = { x: 1, y: 5 };
      const line = new Line(endA, endB);
      const expected = 0;
      assert.strictEqual(line.slope, expected);
    });

    it("should give NAN if differences between the ends is zero", function() {
      const endA = { x: 2, y: 5 };
      const endB = { x: 2, y: 5 };
      const line = new Line(endA, endB);
      assert.isNaN(line.slope);
    });
  });

  describe("isParallelTo", function() {
    it("should invalidate overlapping lines", function() {
      const line1 = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      const line2 = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      assert.isFalse(line1.isParallelTo(line2));
    });

    it("Should validate if two lines has positive points are parallel", function() {
      const line1 = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      const line2 = new Line({ x: 6, y: 6 }, { x: 2, y: 3 });
      assert.isTrue(line1.isParallelTo(line2));
    });

    it("Should validate if two lines has positive points are not parallel", function() {
      const line1 = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      const line2 = new Line({ x: 6, y: 7 }, { x: 3, y: 8 });
      assert.isFalse(line1.isParallelTo(line2));
    });

    it("Should validate if two lines has negative points are parallel", function() {
      const line1 = new Line({ x: -5, y: -5 }, { x: -1, y: -2 });
      const line2 = new Line({ x: -6, y: -6 }, { x: -2, y: -3 });
      assert.isTrue(line1.isParallelTo(line2));
    });

    it("Should validate if two lines has negative points are not parallel", function() {
      const line1 = new Line({ x: -5, y: -5 }, { x: -1, y: -2 });
      const line2 = new Line({ x: -6, y: -7 }, { x: -3, y: -8 });
      assert.isFalse(line1.isParallelTo(line2));
    });

    it("should invalidate line itself is passed", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 0 });
      assert.isFalse(line.isParallelTo(line));
    });
  });

  describe("findX", function() {
    it("Should give NaN if y coordinate is greater than line segment", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 10, y: 8 });
      assert.isNaN(line.findX(3));
    });

    it("Should give NaN if y coordinate is lesser than line segment", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 10, y: 8 });
      assert.isNaN(line.findX(9));
    });

    it("Should give x-coordinate of first point if y coordinate is equal to y coordinate of first point", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 10, y: 8 });
      assert.strictEqual(line.findX(5), 2);
    });

    it("Should give x-coordinate of second point if y coordinate is equal to y coordinate of second point", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 10, y: 5 });
      assert.strictEqual(line.findX(5), 10);
    });

    it("Should give x-coordinate of a point if the line has positive points", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      assert.approximately(line.findX(3), 2.3, 0.1);
    });

    it("Should give x-coordinate of a point if the line has positive points", function() {
      const line = new Line({ x: -5, y: -3 }, { x: -1, y: -4 });
      assert.approximately(line.findX(-3), -5.0, 0.1);
    });
  });

  describe("findY", function() {
    it("Should give NaN if x coordinate has same slope but not on the line", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 10, y: 8 });
      assert.isNaN(line.findY(13));
    });

    it("Should give NaN if y coordinate has same slope but not on the line", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 10, y: 8 });
      assert.isNaN(line.findY(0));
    });

    it("Should give y-coordinate of first point if x coordinate is equal to x coordinate of first point", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 10, y: 8 });
      assert.strictEqual(line.findY(2), 5);
    });

    it("Should give y-coordinate of second point if x coordinate is equal to x coordinate of second point", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 10, y: 5 });
      assert.strictEqual(line.findY(10), 5);
    });

    it("Should give y-coordinate of a point if the line has positive points", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      assert.approximately(line.findY(3), 3.0, 0.5);
    });

    it("Should give y-coordinate of a point if the line has positive points", function() {
      const line = new Line({ x: -5, y: -3 }, { x: -1, y: -4 });
      assert.approximately(line.findY(-3), -3.0, 0.5);
    });
  });

  describe("split", function() {
    it("should give 2 lines splitted exactly at the centre of line", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const firstLine = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      const secondLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      assert.deepStrictEqual(line.split(), [firstLine, secondLine]);
    });
  });

  describe("hasPoint", function() {
    it("Should give true for if point has same slope but is on left side,not on the line", function() {
      const point = new Point(2, 3);
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isTrue(line.hasPoint(point));
    });

    it("Should give false for if point has same slope but is on right ,not on the line", function() {
      const point = new Point(-1, 0);
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isFalse(line.hasPoint(point));
    });

    it("Should give false for if point is greater than the line segment", function() {
      const point = new Point(5, 6);
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isFalse(line.hasPoint(point));
    });

    it("Should give false for if point is not on the line", function() {
      const point = new Point(2, 4);
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isFalse(line.hasPoint(point));
    });

    it("Should give false for if object is not instance of point", function() {
      const point = { x: 2, y: 3 };
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isFalse(line.hasPoint(point));
    });
  });
});
