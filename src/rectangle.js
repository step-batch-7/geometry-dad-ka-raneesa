"use strict";

const Line = require("./line");

const getSides = function(diagonal) {
  const { endA, endB } = diagonal;
  const side1 = new Line(endA, { x: endA.x, y: endB.y });
  const side2 = new Line(endB, { x: endB.x, y: endA.y });
  return [side1, side2];
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
}

module.exports = Rectangle;
