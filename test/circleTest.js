"use strict";

const assert = require("chai").assert;
const Circle = require("../src/circle");
const Point = require("../src/point");

describe("Circle", function() {
  describe("toString", function() {
    it("Should give the string representation", function() {
      const circle = new Circle({ x: 2, y: 3 }, 5);
      const actual = circle.toString();
      const expected = `[Circle @(2,3) radius 5]`;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    it("Should give true if we give same circle", function() {
      const circle = new Circle({ x: 2, y: 3 }, 5);
      assert.isTrue(circle.isEqualTo(circle));
    });

    it("Should give true if we give two circles of same centre and radius", function() {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = new Circle({ x: 1, y: 2 }, 5);
      assert.isTrue(circle.isEqualTo(other));
    });

    it("Should give false if we give two circle of distinct centres and radiuses", function() {
      const circle1 = new Circle({ x: 2, y: 3 }, 5);
      const circle2 = new Circle({ x: 4, y: 3 }, 4);
      assert.isFalse(circle1.isEqualTo(circle2));
    });

    it("Should give false if we give one circle is not instance of circle", function() {
      const circle = new Circle({ x: 2, y: 3 }, 5);
      assert.isFalse(circle.isEqualTo({ x: 4, y: 3 }, 4));
    });
  });

  describe("area", function() {
    it("Should give the area of a circle", function() {
      const circle = new Circle({ x: 2, y: 3 }, 7);
      assert.approximately(circle.area, 153, 1.0);
    });

    it("should give zero as the area of the circle when the radius is zero ", function() {
      const circle = new Circle({ x: 2, y: 2 }, 0);
      assert.strictEqual(circle.area, 0);
    });
  });

  describe("perimeter", function() {
    it("Should give the perimeter of a circle", function() {
      const circle = new Circle({ x: 2, y: 3 }, 7);
      assert.approximately(circle.perimeter, 43, 1);
    });

    it("should give zero as the perimeter of the circle when the radius is zero ", function() {
      const circle = new Circle({ x: 2, y: 2 }, 0);
      assert.strictEqual(circle.perimeter, 0);
    });
  });

  describe("hasPoint", function() {
    it("Should give true if point is on the circle", function() {
      const circle = new Circle({ x: 5, y: 5 }, 2);
      assert.isTrue(circle.hasPoint(new Point(5, 7)));
    });

    it("Should give false if point is on the circle", function() {
      const circle = new Circle({ x: 5, y: 5 }, 2);
      assert.isFalse(circle.hasPoint(new Point(5, 6)));
    });

    it("Should give NaN if given one is not instance of point", function() {
      const circle = new Circle({ x: 5, y: 5 }, 2);
      assert.isFalse(circle.hasPoint({ x: 5, y: 7 }));
    });
  });
});
