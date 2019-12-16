"use strict";

const assert = require("chai").assert;
const Circle = require("../src/circle");

describe("Circle", function() {
  describe("toString", function() {
    it("Should give the string representation", function() {
      const circle = new Circle({ x: 2, y: 3 }, 5);
      const actual = circle.toString();
      const expected = `[Circle @(2,3) radius 5]`;
      assert.deepStrictEqual(actual, expected);
    });
  });
});
