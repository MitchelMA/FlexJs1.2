class MoveAble {
  constructor(rotation, rotationSpeed, topSpeed, maxAccMag, velocity) {
    this.rotation = rotation;
    this.rotationSpeed = rotationSpeed;
    this.topSpeed = topSpeed;
    this.maxAccMag = maxAccMag;
    this.inVector = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.velocity = velocity;
    this.position = new Vector(Canvas.width / 2, Canvas.height / 2);
  }

  update = function () {
    this.rotation += this.rotationSpeed * this.inVector.x * deltaT;

    this.acceleration.x = Math.cos(this.rotation) * this.inVector.y;
    this.acceleration.y = Math.sin(this.rotation) * this.inVector.y;

    this.acceleration.setMag(this.maxAccMag * deltaT);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);

    if (this.inVector.y == 0) {
      this.velocity.mult(0.994);
    }

    this.position.x += this.velocity.x * deltaT;
    this.position.y += this.velocity.y * deltaT;
    if (this.position.x > Canvas.width) this.position.x = 0;
    if (this.position.y > Canvas.height) this.position.y = 0;
    if (this.position.x < 0) this.position.x = Canvas.width;
    if (this.position.y < 0) this.position.y = Canvas.height;
  };
}
