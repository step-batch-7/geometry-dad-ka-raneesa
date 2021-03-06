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
    return this.x == other.x && this.y == other.y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  findDistanceTo(point) {
    if (!(point instanceof Point)) return NaN;
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.hypot(dx, dy);
  }

  isOn(other) {
    return other.hasPoint(this);
  }
}

module.exports = Point;
