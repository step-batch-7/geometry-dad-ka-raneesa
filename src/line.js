const isPointsEqual = function(a, b) {
  return a.x == b.x && a.y == b.y;
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
    const isEqual = isPointsEqual(this.endA, other.endA);
    return isEqual && isPointsEqual(this.endB, other.endB);
  }
}

module.exports = Line;
