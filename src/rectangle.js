"use strict";

const Point = require("./point.js");
const Line = require("./line.js");

const isInRange = (range, number) => {
  const [min, max] = range.sort((a, b) => a - b);
  return number < max && number > min;
};

const getPointBandD = function(pointA, pointC) {
  return {
    pointB: new Point(pointA.x, pointC.y),
    pointD: new Point(pointC.x, pointA.y)
  };
};

const get2AdjacentSides = function(pointA, pointC) {
  const { pointB } = getPointBandD(pointA, pointC);
  return [new Line(pointB, pointA), new Line(pointB, pointC)];
};

class Rectangle {
  constructor(pointA, pointC) {
    this.pointA = new Point(pointA.x, pointA.y);
    this.pointC = new Point(pointC.x, pointC.y);
  }

  toString() {
    return `[Rectangle (${this.pointA.x},${this.pointA.y}) to (${this.pointC.x},${this.pointC.y})]`;
  }

  get area() {
    const length = this.pointA.x - this.pointC.x;
    const width = this.pointA.y - this.pointC.y;
    return Math.abs(length * width);
  }

  get perimeter() {
    const length = this.pointA.x - this.pointC.x;
    const width = this.pointA.y - this.pointC.y;
    return 2 * (Math.abs(length) + Math.abs(width));
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const { pointB, pointD } = getPointBandD(this.pointA, this.pointC);
    const diagonal1 = new Line(this.pointA, this.pointC);
    const diagonal2 = new Line(pointB, pointD);
    const diagonalOfOther = new Line(other.pointA, other.pointC);
    return (
      diagonal1.isEqualTo(diagonalOfOther) ||
      diagonal2.isEqualTo(diagonalOfOther)
    );
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    const [side1, side2] = get2AdjacentSides(this.pointA, this.pointC);
    const [side3, side4] = get2AdjacentSides(this.pointC, this.pointA);
    return (
      side1.hasPoint(other) ||
      side2.hasPoint(other) ||
      side3.hasPoint(other) ||
      side4.hasPoint(other)
    );
  }

  covers(other) {
    if (!(other instanceof Point)) return false;
    return (
      isInRange([this.pointA.x, this.pointC.x], other.x) &&
      isInRange([this.pointA.y, this.pointC.y], other.y)
    );
  }
}

module.exports = Rectangle;
