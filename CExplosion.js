class Explosion {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sprite;
    this.loaded = false;
    let sprite = new Image();
    sprite.onload = () => {
      this.loaded = true;
      this.sprite = sprite;
    };
    sprite.src = "./img/Explosion.png";
    this.column = 0;
    this.row = 0;
    this.frameSize = 192;
    this.maxFrameTime = 20; // in milliseconds
    this.curFrameTime = 0;
    this.ended = false;
  }

  show = function () {
    if (!this.ended && this.loaded) {
      ctx.drawImage(
        this.sprite,
        this.column * this.frameSize,
        this.row * this.frameSize,
        this.frameSize,
        this.frameSize,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
      this.curFrameTime += deltaT;
      if (this.curFrameTime > this.maxFrameTime) {
        this.incFrame();
        this.curFrameTime = 0;
      }
    }
  };
  incFrame = function () {
    this.column++;
    if (this.column > 4) {
      this.column = 0;
      this.row++;
    }
    if (this.row > 3) {
      this.column = 0;
      this.row = 0;
      this.ended = true;
    }
  };
}
