"use strict";

class Point {
  constructor(abscissa, ordinate) {
    this.x = abscissa;
    this.y = ordinate;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  visit(functionRef) {
    return functionRef(this.x, this.y);
  }

  isEqualTo(other) {
    if (!(other instanceof Point)) return false;
    const areXsEqual = this.x == other.x;
    const areYsEqual = this.y == other.y;
    return areXsEqual && areYsEqual;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  findDistanceTo(point) {
    if (!(point instanceof Point)) return false;
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.hypot(dx, dy);
  }

  isOn(other) {
    return other.hasPoint(this);
  }
}

module.exports = Point;
