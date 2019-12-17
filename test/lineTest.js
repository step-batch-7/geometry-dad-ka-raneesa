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

    it("should validate when start of one line is equal to end of other line and vise versa", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 12, y: 13 }, { x: 10, y: 11 });
      assert.isTrue(line.isEqualTo(otherLine));
    });

    it("should validate when the reference of both the lines are same", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 1 });
      assert.isTrue(line.isEqualTo(line));
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
    it("should return slope of given line when slope is positive", () => {
      const line = new Line({ x: 4, y: 3 }, { x: 1, y: 2 });
      assert.approximately(line.slope, 0.33, 0.01);
    });

    it("should return slope of given line if slope is negative", () => {
      const line = new Line({ x: 0, y: 3 }, { x: 1, y: 1 });
      assert.strictEqual(line.slope, -2);
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
      const expected = Infinity;
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

    it("should determine false for lines overlapping", function() {
      let line1 = new Line({ x: 0, y: 0 }, { x: 4, y: 0 });
      let line2 = new Line({ x: 1, y: 0 }, { x: 3, y: 0 });
      assert.isNotOk(line1.isParallelTo(line2));
    });

    it("should determine false for 2 different type of lines.", function() {
      const line1 = new Line({ x: 0, y: -2 }, { x: -1, y: 4 });
      const line2 = { endA: { x: 0, y: -2 }, endB: { x: -1, y: 4 } };
      assert.isNotOk(line1.isParallelTo(line2));
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

    it("Should give first x-coordinate if  both y coordinates are equal", function() {
      const line = new Line({ x: 2, y: 8 }, { x: 10, y: 8 });
      assert.strictEqual(line.findX(8), 2);
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

    it("Should give first y- coordinate if both x coordinates are equal", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 2, y: 8 });
      assert.strictEqual(line.findY(2), 5);
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

  describe("findPointFromStart", function() {
    it("should give a point on the line in given distance in the forward direction when point is in x axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 5, y: 0 });
      const point = new Point(2, 0);
      const pointInDistance = line.findPointFromStart(2);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });

    it("should give a point on the line in given distance in the forward direction when point is in y axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 5 });
      const point = new Point(0, 2);
      const pointInDistance = line.findPointFromStart(2);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });

    it("should give the point of the certain distance from the start of the line if it exists on the line segment", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 2 });
      const point = new Point(3, 2);
      assert.deepStrictEqual(line.findPointFromStart(2), point);
    });

    it("should give null if the distance is greater than the line distance", function() {
      const line = new Line({ x: 1, y: 6 }, { x: 4, y: 6 });
      assert.isNull(line.findPointFromStart(12));
    });

    it("should give null for there is no given distance is negative", function() {
      const line = new Line({ x: 2, y: 4 }, { x: 2, y: 8 });
      assert.isNull(line.findPointFromStart(-1));
    });
  });

  describe("findPointFromEnd", function() {
    it("should give a point on the line in given distance in the forward direction when point is in x axis", () => {
      const line = new Line({ x: 5, y: 0 }, { x: 0, y: 0 });
      const point = new Point(2, 0);
      const pointInDistance = line.findPointFromEnd(2);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });

    it("should give a point on the line in given distance in the forward direction when point is in y axis", () => {
      const line = new Line({ x: 0, y: 5 }, { x: 0, y: 0 });
      const point = new Point(0, 2);
      const pointInDistance = line.findPointFromEnd(2);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });

    it("should give the point of the certain distance from the start of the line if it exists on the line segment", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 5, y: 2 });
      const point = new Point(4, 2);
      assert.deepStrictEqual(line.findPointFromEnd(1), point);
    });

    it("should give null if the distance is greater than the line distance", function() {
      const line = new Line({ x: 1, y: 6 }, { x: 4, y: 6 });
      assert.isNull(line.findPointFromEnd(12));
    });

    it("should give null for there is no given distance is negative", function() {
      const line = new Line({ x: 2, y: 4 }, { x: 2, y: 8 });
      assert.isNull(line.findPointFromEnd(-1));
    });

    it("should return end Point if distance is Zero", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 2 });
      const actual = line.findPointFromEnd(0);
      const expected = new Point(7, 2);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
