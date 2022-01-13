class Ship extends MoveAble {
  constructor(
    rotation = 0,
    rotationSpeed = 0.005,
    topSpeed = 1,
    maxAccMag = 0.0007,
    velocity = new Vector(0, 0)
  ) {
    super(rotation, rotationSpeed, topSpeed, maxAccMag, velocity);
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
