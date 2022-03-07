class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add = function (inVec) {
    this.x += inVec.x;
    this.y += inVec.y;
  };
  sub = function (inVec) {
    this.x -= inVec.x;
    this.y -= inVec.y;
  };
  mag = function () {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  };
  setMag = function (magnitude) {
    let m = this.mag();
    if (m == 0) return;
    this.x = (this.x / m) * magnitude;
    this.y = (this.y / m) * magnitude;
  };
  norm = function () {
    let m = this.mag();
    if (m == 0) return;
    this.x = this.x / m;
    this.y = this.y / m;
  };
  limit = function (max) {
    let m = this.mag();
    if (m == 0 || m < max) return;
    this.x = this.x / m;
    this.y = this.y / m;
    this.mult(max);
  };
  mult = function (factor) {
    this.x *= factor;
    this.y *= factor;
  };
  div = function (factor) {
    this.x /= factor;
    this.y /= factor;
  };
  setByAngle = function (angle) {
    this.x = Math.cos(angle);
    this.y = Math.sin(angle);
    return this;
  };

  rotatedBy = function (angle) {
    // deze function maakt gebruik van de volgende Matrix-transformatie:
    // | COS θ  -SIN θ | | Vx |
    // | SIN θ   COS θ | | Vy |
    // Waar θ = angle en V de Vector waarop deze function op werd geroepen

    // bereken de dot-product van (COS θ, -SIN θ) * (Vx)
    let newX = Math.cos(angle) * this.x + -Math.sin(angle) * this.y;

    // bereken de dot-product van (SIN θ, COS θ) * (Vy)
    let newY = Math.sin(angle) * this.x + Math.cos(angle) * this.y;

    // maak een kopie van de vector waar de function op was geroepen
    let VP = this.copy();

    // set de x en y
    VP.x = newX;
    VP.y = newY;

    // return deze vector
    return VP;
  };
  heading = () => Math.atan2(this.y, this.x);
  copy = () => new Vector(this.x, this.y);
}
