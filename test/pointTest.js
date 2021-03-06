"use strict";

const assert = require("chai").assert;
const Point = require("../src/point");
const Line = require("../src/line");
const Circle = require("../src/circle");

describe("Point", function() {
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

  describe("isEqualTo", function() {
    it("should give true if both points are similar", function() {
      const point = new Point(2, 3);
      const other = new Point(2, 3);
      assert.isTrue(point.isEqualTo(other));
    });

    it("should give false if both points are not similar", function() {
      const point = new Point(2, 3);
      const other = new Point(1, 3);
      assert.isFalse(point.isEqualTo(other));
    });

    it("should give false if the type of 'other' doesn't belongs to the class Point", function() {
      const point = new Point(2, 3);
      const other = { x: 2, y: 3 };
      assert.isFalse(point.isEqualTo(other));
    });
  });

  describe("clone", function() {
    it("should give the exact copy of the given point", function() {
      const point = new Point(2, 3);
      assert.deepStrictEqual(point.clone(), point);
    });
  });

  describe("findDistanceTo", function() {
    it("Should give the length zero if points are equal", function() {
      const point1 = new Point(2, 3);
      const point2 = new Point(2, 3);
      assert.strictEqual(point1.findDistanceTo(point2), 0);
    });

    it("Should give the length if it is positive points", function() {
      const point1 = new Point(2, 3);
      const point2 = new Point(5, 8);
      assert.approximately(point1.findDistanceTo(point2), 5, 0.9);
    });

    it("Should give the length if it is negative points", function() {
      const point1 = new Point(-2, -3);
      const point2 = new Point(-5, -8);
      assert.approximately(point1.findDistanceTo(point2), 5, 0.9);
    });

    it("Should give NaN if it is not instance of point", function() {
      const point = new Point(-2, -3);
      assert.isNaN(point.findDistanceTo({ x: -5, y: -8 }));
    });

    it("should give the distance when one point is origin", function() {
      const point1 = new Point(1, 1);
      const point2 = new Point(0, 0);
      assert.approximately(point1.findDistanceTo(point2), 1, 0.5);
    });
  });

  describe("isOn", function() {
    it("should validate if the point is on the line", function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 1 });
      assert.isTrue(point.isOn(line));
    });

    it("should invalidate if the point is not on the line", function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 5, y: 5 }, { x: 7, y: 1 });
      assert.isFalse(point.isOn(line));
    });

    it("Should give true if point is on the circle", function() {
      const point = new Point(5, 7);
      const circle = new Circle({ x: 5, y: 5 }, 2);
      assert.isTrue(point.isOn(circle));
    });

    it("Should give false if point is on the circle", function() {
      const point = new Point(5, 6);
      const circle = new Circle({ x: 5, y: 5 }, 2);
      assert.isFalse(point.isOn(circle));
    });

    it("should validate a point that is parallel to y axis and given a point on the line", () => {
      const line = new Line({ x: 5, y: 0 }, { x: 5, y: 10 });
      const point = new Point(5, 5);
      assert.isTrue(point.isOn(line));
    });
  });
});
