class Asteroid extends MoveAble {
  constructor(rotation, velocity, position, size) {
    super(rotation, 0.005, 0.1, 0, velocity, position);
    this.size = size;
    this.slowFac = 1;
  }

  show = function () {
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
    drawPent(this.position.x, this.position.y, this.size);
  };
}
