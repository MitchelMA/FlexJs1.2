class CButton {
  constructor(centerX, centerY, width, height, displayText) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
    this.displayText = displayText;
    this.displaying = false;
  }

  show = function () {
    if (!this.displaying) return;
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.moveTo(this.centerX - this.width / 2, this.centerY - this.height / 2);
    ctx.lineTo(this.centerX - this.width / 2, this.centerY + this.height / 2);
    ctx.lineTo(this.centerX + this.width / 2, this.centerY + this.height / 2);
    ctx.lineTo(this.centerX + this.width / 2, this.centerY - this.height / 2);
    ctx.lineTo(this.centerX - this.width / 2, this.centerY - this.height / 2);
    ctx.stroke();
    ctx.fill();
    ctx.font = "Arial 30px";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillText(this.displayText, this.centerX, this.centerY);
    ctx.closePath();
  };
  checkClick = function (event) {
    if (!this.displaying) return false;
    return (
      event.clientX > this.centerX - this.width / 2 &&
      event.clientX < this.centerX + this.width / 2 &&
      event.clientY > this.centerY - this.height / 2 &&
      event.clientY < this.centerY + this.height / 2
    );
  };
}
