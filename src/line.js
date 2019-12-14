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
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
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
    return dy / dx;
  }

  isParallelTo(other) {
    if (!(other instanceof Line) || this.isEqualTo(other)) return false;
    const slopeOfFirst = this.slope;
    const slopeOfSecond = other.slope;
    return slopeOfFirst == slopeOfSecond;
  }

  findX(y) {
    const { endA, endB } = this;
    const min = Math.min(endA.y, endB.y);
    const max = Math.max(endA.y, endB.y);
    if (y < min || y > max) return NaN;
    const slopeOfLine = this.slope;
    const dy = y - endA.y;
    const product = slopeOfLine * endA.x;
    const x = (dy + product) / slopeOfLine;
    return x;
  }

  findY(x) {
    const { endA, endB } = this;
    const min = Math.min(endA.x, endB.x);
    const max = Math.max(endA.x, endB.x);
    if (x < min || x > max) return NaN;
    const slopeOfLine = this.slope;
    const dx = x - endA.x;
    const product = slopeOfLine * dx;
    const y = product + endA.y;
    return y;
  }
}

module.exports = Line;
