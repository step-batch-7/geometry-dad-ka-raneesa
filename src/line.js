class Line {
  constructor(a, b, c, d) {
    this.x1 = a;
    this.y1 = b;
    this.x2 = c;
    this.y2 = d;
  }
  toString() {
    return `Line {x1:${this.x1},y1:${this.y1},x2:${this.x2},y2:${this.y2}}`;
  }
}

exports.Line = Line;
