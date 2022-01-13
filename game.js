var Canvas = document.getElementById("VCan");
var ctx = Canvas.getContext("2d");

var myShip = new Ship();

function setup() {
  window.requestAnimationFrame(draw);
}
var oldT = 0,
  deltaT = 0,
  fps = 0;
function draw(time) {
  if (oldT != 0) {
    deltaT = time - oldT;
    fps = 1000 / deltaT;
  }
  ctx.fillStyle = "rgb(240, 240, 240)";
  ctx.fillRect(0, 0, Canvas.width, Canvas.height);

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  myShip.show();
  myShip.showMag();
  myShip.update();

  for (let i = 0; i < myShip.laserArray.length; i++) {
    myShip.laserArray[i].update();
    myShip.laserArray[i].show();
    if (myShip.laserArray[i].age > Laser.maxAge) myShip.laserArray.splice(i, 1);
  }

  ctx.font = "16px Arial";
  ctx.fillText(myShip.velocity.mag().toFixed(2), 10, 20);
  ctx.fillText(
    ((myShip.velocity.heading() * 180) / Math.PI).toFixed(2),
    10,
    50
  );
  ctx.fillText(fps.toFixed(2), 10, 80);
  oldT = time;
  window.requestAnimationFrame(draw);
}

setup();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      myShip.inVector.y = 1;
      break;
    case "ArrowRight":
      myShip.inVector.x = 1;
      break;
    case "ArrowDown":
      myShip.inVector.y = -1;
      break;
    case "ArrowLeft":
      myShip.inVector.x = -1;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    myShip.inVector.y = 0;
  } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    myShip.inVector.x = 0;
  }
  if (e.key === " ") {
    myShip.shoot();
  }
});

// extra functies
function AngleToVector(radians) {
  let x = Math.cos(radians);
  let y = Math.sin(radians);

  return new Vector(x, y);
}
