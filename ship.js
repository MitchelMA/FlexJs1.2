var Canvas = document.getElementById("VCan");
var ctx = Canvas.getContext("2d");

class MoveAble {
  constructor() {
    this.rotation = 0;
    this.rotationSpeed = 0.005;
    this.topSpeed = 0.4;
    this.inVector = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(Canvas.width / 2, Canvas.height / 2);
  }

  update = function () {
    this.rotation += this.rotationSpeed * this.inVector.x * deltaT;

    this.acceleration.x = Math.cos(this.rotation) * this.inVector.y;
    this.acceleration.y = Math.sin(this.rotation) * this.inVector.y;

    this.acceleration.setMag(0.0007 * deltaT);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);

    if (this.inVector.y == 0) {
      this.velocity.mult(0.994);
    }

    this.position.add(velocity * deltaT);
    if (this.position.x > Canvas.width) this.position.x = 0;
    if (this.position.y > Canvas.height) this.position.y = 0;
    if (this.position.x < 0) this.position.x = Canvas.width;
    if (this.position.y < 0) this.position.y = Canvas.height;
  };
}

class Ship extends MoveAble {
  constructor() {
    super();
    this.rotation = 0;
    this.rotationSpeed = 0.005;
    this.topSpeed = 1;
    this.inVector = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(Canvas.width / 2, Canvas.height / 2);
  }

  update = function () {
    this.rotation += this.rotationSpeed * this.inVector.x * deltaT;

    this.acceleration.x = Math.cos(this.rotation) * this.inVector.y;
    this.acceleration.y = Math.sin(this.rotation) * this.inVector.y;

    this.acceleration.setMag(0.0007 * deltaT);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);

    if (this.inVector.y == 0) {
      this.velocity.mult(0.994);
    }
    // this.position.add(this.velocity);
    this.position.x += this.velocity.x * deltaT;
    this.position.y += this.velocity.y * deltaT;
    if (this.position.x > Canvas.width) this.position.x = 0;
    if (this.position.y > Canvas.height) this.position.y = 0;
    if (this.position.x < 0) this.position.x = Canvas.width;
    if (this.position.y < 0) this.position.y = Canvas.height;
  };

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
}
