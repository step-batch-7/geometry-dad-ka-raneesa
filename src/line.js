const Point = require("../src/point");

const getMidPoint = function(endA, endB) {
  const midOfXs = (endA.x + endB.x) / 2;
  const midOfYs = (endA.y + endB.y) / 2;
  return { x: midOfXs, y: midOfYs };
};

const arePointsCollinear = (point1, point2, point3) => {
  return (
    point1.x * (point2.y - point3.y) +
      point2.x * (point3.y - point1.y) +
      point3.x * (point1.y - point2.y) ==
    0
  );
};

const isNotInRange = (range, coordinate) => {
  const min = Math.min(range[0], range[1]);
  const max = Math.max(range[0], range[1]);
  return coordinate < min || coordinate > max;
};

const getPointCoordinates = function(ratio, p1, p2) {
  const x = (1 - ratio) * p1.x + ratio * p2.x;
  const y = (1 - ratio) * p1.y + ratio * p2.y;
  return [x, y];
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
  }

  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      (this.endA.isEqualTo(other.endA) || this.endA.isEqualTo(other.endB)) &&
      (this.endB.isEqualTo(other.endB) || this.endB.isEqualTo(other.endA))
    );
  }

  get length() {
    return this.endA.findDistanceTo(this.endB);
  }

  get slope() {
    const dx = this.endB.x - this.endA.x;
    const dy = this.endB.y - this.endA.y;
    return dy / dx;
  }

  isParallelTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      !arePointsCollinear(this.endA, other.endA, this.endB) &&
      this.slope === other.slope
    );
  }

  findX(y) {
    const { endA, endB } = this;
    if (isNotInRange([endA.y, endB.y], y)) return NaN;
    if (endA.y == endB.y) return endA.x;
    const dy = y - endA.y;
    const product = this.slope * endA.x;
    return (dy + product) / this.slope;
  }

  findY(x) {
    const { endA, endB } = this;
    if (isNotInRange([endA.x, endB.x, x], x)) return NaN;
    if (endA.x == endB.x) return endA.y;
    const dx = x - endA.x;
    const product = this.slope * dx;
    return product + endA.y;
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
    if (!Number.isInteger(distance)) return undefined;
    const { endA, endB } = this;
    const ratioOfDist = distance / this.length;
    if (isNotInRange([1, 0], ratioOfDist)) return null;
    const [x, y] = getPointCoordinates(ratioOfDist, endA, endB);
    return new Point(x, y);
  }

  findPointFromEnd(distance) {
    if (!Number.isInteger(distance)) return undefined;
    return this.findPointFromStart(this.length - distance);
  }
}

module.exports = Line;
