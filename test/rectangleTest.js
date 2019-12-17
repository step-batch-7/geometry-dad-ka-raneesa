"use strict";

const assert = require("chai").assert;
const Rectangle = require("../src/rectangle");
const Point = require("../src/point");

describe("Rectangle", function() {
  describe("toString", function() {
    it("should give string representation of rectangle object", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.strictEqual(rectangle.toString(), "[Rectangle (1,1) to (2,3)]");
    });
  });

  describe("area", function() {
    it("Should give area of a rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.strictEqual(rectangle.area, 2);
    });
  });

  describe("perimeter", function() {
    it("Should give perimeter of a rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.strictEqual(rectangle.perimeter, 6);
    });
  });

  describe("isEqualTo", function() {
    it("Should give true if both rectangles are on same coordinates", function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const rectangle2 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.isTrue(rectangle1.isEqualTo(rectangle2));
    });

    it("Should give true if both rectangles are on same coordinates but in reverse order", function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const rectangle2 = new Rectangle({ x: 2, y: 3 }, { x: 1, y: 1 });
      assert.isTrue(rectangle1.isEqualTo(rectangle2));
    });

    it("Should give true if diagonals are distinct but are of same rectangle", function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const rectangle2 = new Rectangle({ x: 1, y: 3 }, { x: 2, y: 1 });
      assert.isTrue(rectangle1.isEqualTo(rectangle2));
    });

    it("Should give false if both rectangles are distinct coordinates", function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const rectangle2 = new Rectangle({ x: 2, y: 4 }, { x: 2, y: 1 });
      assert.isFalse(rectangle1.isEqualTo(rectangle2));
    });

    it("Should give false if one is not instance of rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const diaEndA = { x: 1, y: 1 };
      const diaEndB = { x: 2, y: 3 };
      assert.isFalse(rectangle.isEqualTo({ diaEndA, diaEndB }));
    });
  });

  describe("hasPoint", function() {
    it("Should give true if point is on the line ", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(2, 2);
      assert.isTrue(rectangle.hasPoint(point));
    });

    it("Should give false if point is on the line ", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(2, 4);
      assert.isFalse(rectangle.hasPoint(point));
    });

    it("Should give true if point is one of the corner", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(2, 3);
      assert.isTrue(rectangle.hasPoint(point));
    });

    it("Should give false if point is not instance of point", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = { x: 2, y: 3 };
      assert.isFalse(rectangle.hasPoint(point));
    });
  });

  describe("covers", () => {
    it("should validate a point that is on the sides", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(1, 1);
      assert.isFalse(rectangle.covers(point));
    });

    it("should validate a point that is inside the circle", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(1.5, 2);
      assert.isTrue(rectangle.covers(point));
    });

    it("should invalidate a point that is not inside the circle", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(0, 6);
      assert.isFalse(rectangle.covers(point));
    });

    it("should invalidate a point that is not an instance of class Point", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = { x: 0, y: 5 };
      assert.isFalse(rectangle.covers(point));
    });
  });
});
