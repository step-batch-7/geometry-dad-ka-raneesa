"use strict";

const Point = require("../src/point");

class Circle {
  constructor(centre, radius) {
    this.centre = { x: centre.x, y: centre.y };
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.centre.x},${this.centre.y}) radius ${this.radius}]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Circle)) return false;
    const centrePoint1 = new Point(this.centre.x, this.centre.y);
    const centrePoint2 = new Point(other.centre.x, other.centre.y);
    return centrePoint1.isEqualTo(centrePoint2) && this.radius == other.radius;
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

module.exports = Circle;
