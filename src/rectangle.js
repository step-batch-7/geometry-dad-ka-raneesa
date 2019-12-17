"use strict";

const Point = require("./point");

class Rectangle {
  constructor(diaEndA, diaEndB) {
    this.diaEndA = new Point(diaEndA.x, diaEndA.y);
    this.diaEndB = new Point(diaEndB.x, diaEndB.y);
  }

  toString() {
    return `[Rectangle (${this.diaEndA.x},${this.diaEndA.y}) to (${this.diaEndB.x},${this.diaEndB.y})]`;
  }

  area() {
    const length = this.diaEndA.x - this.diaEndB.x;
    const breadth = this.diaEndA.y - this.diaEndB.x;
    return Math.abs(length) * Math.abs(breadth);
  }

  perimeter() {
    const length = this.diaEndA.x - this.diaEndB.x;
    const breadth = this.diaEndA.y - this.diaEndB.x;
    return 2 * (Math.abs(length) + Math.abs(breadth));
  }
}

module.exports = Rectangle;