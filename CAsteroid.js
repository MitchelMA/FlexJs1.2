class Asteroid extends MoveAble {
  constructor(rotation, velocity, position, size) {
    super(rotation, 0.0004, 1.1, 0, velocity, position, 0.1);
    this.size = size;
    this.slowFac = 0.998;
    this.inVector.x = 1;
    this.hitTimeout = 400;
  }

  show = function () {
    if (this.hitTimeout <= 400) {
      this.hitTimeout += deltaT;
    }
    function drawPent(x, y, size) {
      ctx.beginPath();
      ctx.moveTo(
        x + size * Math.cos((2 / 5) * Math.PI),
        y + size * Math.sin((2 / 5) * Math.PI)
      );
      ctx.lineTo(
        x + size * Math.cos((4 / 5) * Math.PI),
        y + size * Math.sin((4 / 5) * Math.PI)
      );
      ctx.lineTo(
        x + size * Math.cos((6 / 5) * Math.PI),
        y + size * Math.sin((6 / 5) * Math.PI)
      );
      ctx.lineTo(
        x + size * Math.cos((8 / 5) * Math.PI),
        y + size * Math.sin((8 / 5) * Math.PI)
      );
      ctx.lineTo(
        x + size * Math.cos((10 / 5) * Math.PI),
        y + size * Math.sin((10 / 5) * Math.PI)
      );
      ctx.lineTo(
        x + size * Math.cos((2 / 5) * Math.PI),
        y + size * Math.sin((2 / 5) * Math.PI)
      );
      ctx.stroke();
      ctx.fill();
    }
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    drawPent(0, 0, this.size);
    ctx.resetTransform();
  };
  colission = function (asteroid) {
    let dist = Math.sqrt(
      Math.pow(this.position.x - asteroid.position.x, 2) +
        Math.pow(this.position.y - asteroid.position.y, 2)
    );
    return dist < asteroid.size;
  };
}
