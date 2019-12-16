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

const getPointCoordinates = function(ratio, endA, endB) {
  const x = (1 - ratio) * endA.x + ratio * endB.x;
  const y = (1 - ratio) * endA.y + ratio * endB.y;
  return [x, y];
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
    if (endA.y == endB.y) return endA.x;
    const slopeOfLine = this.slope;
    const dy = y - endA.y;
    const product = slopeOfLine * endA.x;
    const x = (dy + product) / slopeOfLine;
    console.log(x);
    return x;
  }

  findY(x) {
    const { endA, endB } = this;
    if (isNotInRange([endA.x, endB.x, x], x)) return NaN;
    if (endA.x == endB.x) return endA.y;
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
    return point.y == this.findY(point.x) || point.x == this.findX(point.y);
  }

  findPointFromStart(distance) {
    const { endA, endB } = this;
    if (!Number.isInteger(distance) || distance > this.length || distance < 0)
      return null;
    const ratioOfDist = distance / this.length;
    const [x, y] = getPointCoordinates(ratioOfDist, endA, endB);
    return new Point(x, y);
  }
}

module.exports = Line;
