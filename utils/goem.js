const PI = Math.pi;

class Geometry {
  contructor(distance) {
    this.length = distance;
  }
}

class Circle extends Geometry {
  constructor(radius) {
    this._radius = radius;
  }

  const orgin = (x0, y0) || (0, 0);

  static EuclidDistance(x, y) {
    if (x === 0 && y == 0) {
      return (origin[0] ** 2 + origin[1] ** 2) ** 0.5;
    }
    const pythogoras = x ** 2 + y ** 2;
    return pythogoras ** 0.5
  }

  static Area() {
    return PI * (this._radius ** 2);
  }

  static circum() {
    return 2 * PI * this._radius;
  }

  @setter getRadius(x, y) {
    this._radius = this.EuclideanDistance(x, y);
  }
}
