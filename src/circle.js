"use strict";

const Point = require("../src/point");

class Circle {
  constructor(centre, radius) {
    this.centre = new Point(centre.x, centre.y);
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.centre.x},${this.centre.y}) radius ${this.radius}]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Circle)) return false;
    return this.centre.isEqualTo(other.centre) && this.radius == other.radius;
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    return this.centre.findDistanceTo(other) == this.radius;
  }

  moveTo(object) {
    const centre = { x: object.x, y: object.y };
    const radius = this.radius;
    return new Circle(centre, radius);
  }
}

module.exports = Circle;
