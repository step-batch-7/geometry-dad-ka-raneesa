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

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const dx = point.x - this.centre.x;
    const dy = point.y - this.centre.y;
    const sumOfSqrOfCoordinates = Math.pow(dx, 2) + Math.pow(dy, 2);
    return sumOfSqrOfCoordinates == Math.pow(this.radius, 2);
  }
}

module.exports = Circle;
