"use strict";

const arePointsEqual = function(a, b) {
  const areXsEqual = a.x == b.x;
  const areYsEqual = a.y == b.y;
  return areXsEqual && areYsEqual;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    return `Line (${this.endA.x},${this.endA.y}) (${this.endB.x},${this.endB.y})`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    const areEndAEqual = arePointsEqual(this.endA, other.endA);
    const areEndBEqual = arePointsEqual(this.endB, other.endB);
    return areEndAEqual && areEndBEqual;
  }

  get length() {
    const dx = this.endA.x - this.endB.x;
    const dy = this.endA.y - this.endB.y;
    return Math.hypot(dx, dy);
  }

  get slope() {
    const dx = this.endB.x - this.endA.x;
    const dy = this.endB.y - this.endA.y;
    console.log(dy / dx);
    return dy / dx;
  }

  isParallelTo(other) {
    if (!(other instanceof Line) || this.isEqualTo(other)) return false;
    const slopeOfFirst = this.slope;
    const slopeOfSecond = other.slope;
    return slopeOfFirst == slopeOfSecond;
  }

  findX(y) {
    if ((this.endA.y == this.endB.y) == y) return Infinity;
    const slopeOfLine = this.slope;
    const dy = y - this.endA.y;
    const x = (dy + slopeOfLine * this.endA.x) / slopeOfLine;
    return x;
  }
}

module.exports = Line;
