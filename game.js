var Canvas = document.getElementById("VCan");
var ctx = Canvas.getContext("2d");

var myShip = new Ship();

var AsteroidList = [
  new Asteroid(0, new Vector(0.1, 0.2), new Vector(100, 100), 50),
];

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

  for (let i = 0; i < AsteroidList.length; i++) {
    if (myShip.colission(AsteroidList[i])) {
      let shipVelSnap = new Vector(myShip.velocity.x, myShip.velocity.y);
      let AstVelSnap = new Vector(
        AsteroidList[i].velocity.x,
        AsteroidList[i].velocity.y
      );
      shipVelSnap.mult(0.1);
      AstVelSnap.mult(0.1);
      AsteroidList[i].velocity.add(shipVelSnap);
      myShip.velocity.sub(AstVelSnap);
    }
    console.log(myShip.colission(AsteroidList[i]));
  }

  for (let i = 0; i < AsteroidList.length; i++) {
    AsteroidList[i].show();
    AsteroidList[i].update();
    if (AsteroidList[i].size < 10) {
      // randomly create a new Asteroid when one gets broken.
      if (0.7 < Math.random() && AsteroidList.length < 10) {
        AsteroidList.push(
          new Asteroid(
            Math.random() * Math.PI,
            new Vector(Math.random() * 0.4, Math.random() * 0.2),
            new Vector(
              Math.random() * Canvas.width,
              Math.random() * Canvas.height
            ),
            25 + Math.random() * 50
          )
        );
      }
      AsteroidList.splice(i, 1);
    }
  }

  for (let i = 0; i < myShip.laserArray.length; i++) {
    myShip.laserArray[i].update();
    myShip.laserArray[i].show();
    try {
      for (let j = 0; j < AsteroidList.length; j++) {
        console.log(myShip.laserArray[i].colission(AsteroidList[j]));
        if (myShip.laserArray[i].colission(AsteroidList[j])) {
          myShip.laserArray[i].velocity.mult(0.1);
          AsteroidList[j].velocity.add(myShip.laserArray[i].velocity);
          myShip.laserArray.splice(i, 1);
          AsteroidList.push(
            new Asteroid(
              AsteroidList[j].rotation,
              new Vector(
                AsteroidList[j].velocity.x,
                AsteroidList[j].velocity.y
              ),
              new Vector(
                AsteroidList[j].position.x,
                AsteroidList[j].position.y
              ),
              AsteroidList[j].size / 2
            )
          );
          AsteroidList[j].velocity.mult(-1);
          AsteroidList.push(
            new Asteroid(
              AsteroidList[j].rotation,
              new Vector(
                AsteroidList[j].velocity.x,
                AsteroidList[j].velocity.y
              ),
              new Vector(
                AsteroidList[j].position.x,
                AsteroidList[j].position.y
              ),
              AsteroidList[j].size / 2
            )
          );
          AsteroidList.splice(j, 1);
        }
      }
      if (myShip.laserArray[i].age > Laser.maxAge)
        myShip.laserArray.splice(i, 1);
    } catch (e) {}
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
