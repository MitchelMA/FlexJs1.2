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
  heading = function () {
    return Math.atan(this.y / this.x);
  };
}
