"use strict";

const Point = require("./point");

class Rectangle {
  constructor(diaP1, diaP2) {
    this.diaP1 = new Point(diaP1.x, diaP1.y);
    this.diaP2 = new Point(diaP2.x, diaP2.y);
  }

  toString() {
    return `[Rectangle (${this.diaP1.x},${this.diaP1.y}) to (${this.diaP2.x},${this.diaP2.y})]`;
  }
}

module.exports = Rectangle;
