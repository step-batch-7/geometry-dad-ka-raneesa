const Point = require("../src/point");

const arePointsEqual = function(a, b) {
  const areXsEqual = a.x == b.x;
  const areYsEqual = a.y == b.y;
  return areXsEqual && areYsEqual;
};

const getMidPoint = function(endA, endB) {
  const midOfXs = (endA.x + endB.x) / 2;
  const midOfYs = (endA.y + endB.y) / 2;
  return { x: midOfXs, y: midOfYs };
};

const findIntercept = function(x, y, slope) {
  return y - slope * x;
};

const isNotInRange = (range, coordinate) => {
  const min = Math.min(range[0], range[1]);
  const max = Math.max(range[0], range[1]);
  return coordinate < min || coordinate > max;
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
    const yInterceptOfOtherLine = findIntercept(
      other.endA.x,
      other.endA.y,
      other.slope
    );
    const yInterceptOfThisLine = findIntercept(
      this.endA.x,
      this.endA.y,
      this.slope
    );
    return (
      yInterceptOfOtherLine != yInterceptOfThisLine && other.slope == this.slope
    );
  }

  findX(y) {
    const { endA, endB } = this;
    if (isNotInRange([endA.y, endB.y], y)) return NaN;
    const slopeOfLine = this.slope;
    const dy = y - endA.y;
    const product = slopeOfLine * endA.x;
    const x = (dy + product) / slopeOfLine;
    return x;
  }

  findY(x) {
    const { endA, endB } = this;
    if (isNotInRange([endA.x, endB.x, x], x)) return NaN;
    const slopeOfLine = this.slope;
    const dx = x - endA.x;
    const product = slopeOfLine * dx;
    const y = product + endA.y;
    return y;
  }

  split() {
    const { endA, endB } = this;
    const midPoint = getMidPoint(endA, endB);
    const firstLine = new Line(endA, midPoint);
    const secondLine = new Line(midPoint, endB);
    return [firstLine, secondLine];
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const line1 = new Line(this.endA, point);
    const line2 = new Line(this.endB, point);
    return line1.length + line2.length == this.length;
  }
}

module.exports = Line;
