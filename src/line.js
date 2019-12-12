class Line {
  constructor(x1, y1, x2, y2) {
    this.endA = { x: x1, y: y1 };
    this.endB = { x: x2, y: y2 };
  }
  toString() {
    return `Line (${this.endA.x},${this.endA.y}) (${this.endB.x},${this.endB.y})`;
  }
}

module.exports = Line;
