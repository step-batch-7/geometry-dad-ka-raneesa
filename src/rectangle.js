"use strict";

const Line = require("./line");
const Point = require("./point");

const getSides = function(diagonal) {
  const { endA, endB } = diagonal;
  const side1 = new Line(endA, { x: endB.x, y: endA.y });
  const side2 = new Line(endA, { x: endA.x, y: endB.y });
  const side3 = new Line(endB, { x: endB.x, y: endA.y });
  const side4 = new Line(endB, { x: endA.x, y: endB.y });
  return [side1, side2, side3, side4];
};

class Rectangle {
  constructor(endA, endB) {
    this.diagonal = new Line(endA, endB);
  }

  toString() {
    const { endA, endB } = this.diagonal;
    return `[Rectangle (${endA.x},${endA.y}) to (${endB.x},${endB.y})]`;
  }

  get area() {
    const [side1, side2] = getSides(this.diagonal);
    return side1.length * side2.length;
  }

  get perimeter() {
    const [side1, side2] = getSides(this.diagonal);
    return 2 * (side1.length + side2.length);
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    return this.diagonal.isEqualTo(other.diagonal);
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const sides = getSides(this.diagonal);
    return sides.some(side => side.hasPoint(point));
  }
}

module.exports = Rectangle;
