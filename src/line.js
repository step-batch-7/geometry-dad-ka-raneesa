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
  isEqualTo(otherLine) {
    const areEndAEqual = arePointsEqual(this.endA, otherLine.endA);
    const areEndBEqual = arePointsEqual(this.endB, otherLine.endB);
    return otherLine instanceof Line && areEndAEqual && areEndBEqual;
  }
}

module.exports = Line;
