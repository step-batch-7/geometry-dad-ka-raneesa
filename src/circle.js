"use strict";

class Circle {
  constructor(centre, radius) {
    this.centre = { x: centre.x, y: centre.y };
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.centre.x},${this.centre.y}) radius ${this.radius}]`;
  }
}

module.exports = Circle;
