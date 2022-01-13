class Ship extends MoveAble {
  constructor(
    rotation = 0,
    rotationSpeed = 0.005,
    topSpeed = 1,
    maxAccMag = 0.0007,
    velocity = new Vector(0, 0),
    position = new Vector(Canvas.width / 2, Canvas.height / 2)
  ) {
    super(rotation, rotationSpeed, topSpeed, maxAccMag, velocity, position, 0);
    this.laserArray = new Array();
    this.score = 0;
    this.InvincibilityTimeout = 400;
  }

  showMag = function () {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(
      this.position.x + this.velocity.x * 70,
      this.position.y + this.velocity.y * 70
    );
    ctx.stroke();
  };

  show = function () {
    if (this.InvincibilityTimeout < 900) {
      this.InvincibilityTimeout += deltaT;
    }
    function shipShape(x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y);
      ctx.lineTo(x - size / 2, y - size / 2);
      ctx.lineTo(x - size / 2, y + size / 2);
      ctx.lineTo(x + size / 2, y);
      ctx.stroke();
      ctx.fill();
    }
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    shipShape(0, 0, 20);
    ctx.resetTransform();
  };

  shoot = function () {
    if (this.laserArray.length >= 3) return;
    this.laserArray.push(
      new Laser(
        this.rotation,
        this.topSpeed * 1.1,
        AngleToVector(this.rotation),
        new Vector(this.position.x, this.position.y)
      )
    );
  };

  colission = function (asteroid) {
    let dist = Math.sqrt(
      Math.pow(this.position.x - asteroid.position.x, 2) +
        Math.pow(this.position.y - asteroid.position.y, 2)
    );

    return dist < asteroid.size;
  };
}

class Laser extends MoveAble {
  constructor(rotation, topSpeed, velocity, position) {
    super(rotation, 0, topSpeed, 0, velocity, position, 0);
    this.velocity.mult(this.topSpeed);
    this.slowFac = 1;
    this.age = 0;
  }
  static maxAge = 900;
  show = function () {
    // calculate positoin
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    // draw the laser
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, 0);
    ctx.stroke();

    // reset the transformation
    ctx.resetTransform();

    // add age
    this.age += deltaT;
  };

  colission = function (asteroid) {
    let dist = Math.sqrt(
      Math.pow(this.position.x - asteroid.position.x, 2) +
        Math.pow(this.position.y - asteroid.position.y, 2)
    );
    return dist < asteroid.size;
  };
}
