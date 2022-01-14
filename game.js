var Canvas = document.getElementById("VCan");
var ctx = Canvas.getContext("2d");

// variabel dat checkt of de game over is
var end = false;

// spelersschip
var myShip = new Ship();

// lijst met Asteroids
var AsteroidList = [
  new Asteroid(0, new Vector(0.33, 0.3), new Vector(100, 100), 50),
  new Asteroid(0, new Vector(-0.1, 0), new Vector(500, 100), 50),
];

// setup function
function setup() {
  window.requestAnimationFrame(draw);
}

// benodigde variabelen om de fps te kunnen berekenen en de delta tussen de frames
var oldT = 0,
  deltaT = 0,
  fps = 0;

// draw function (dit is de function die iedere frame gecalled wordt)
function draw(time) {
  // fps en delta berekenen
  if (oldT != 0) {
    deltaT = time - oldT;
    fps = 1000 / deltaT;
  }

  // zet de canvas achtergrond
  ctx.fillStyle = "rgb(240, 240, 240)";
  ctx.fillRect(0, 0, Canvas.width, Canvas.height);

  // teken het schip
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  myShip.show();
  myShip.update();

  // check for collision tussen het schip en de asteroids
  for (let i = 0; i < AsteroidList.length; i++) {
    // collission function wordt gecalled bij het schip, en er wordt dus gecheckt of er een collision is met de huidige index
    if (myShip.collision(AsteroidList[i])) {
      // check voor invincibility frames
      if (myShip.InvincibilityTimeout >= 900) {
        // set de timeout naar 0
        myShip.InvincibilityTimeout = 0;
        // minder de huidige score
        myShip.score--;
        // check of de score kleiner of gelijk is aan -1, zo ja, dan verlies je.
        if (myShip.score <= -1) {
          lose();
        }
      }

      // maak snapshots van de vectoren
      let shipVelSnap = myShip.velocity.copy();
      let AstVelSnap = AsteroidList[i].velocity.copy();

      // verander de velocities van beiden naar nul
      myShip.velocity.sub(shipVelSnap);
      AsteroidList[i].velocity.sub(AstVelSnap);

      // multiply de snapshots
      shipVelSnap.mult(0.9);
      AstVelSnap.mult(1);

      // en voeg ze toe
      AsteroidList[i].velocity.add(shipVelSnap);
      myShip.velocity.add(AstVelSnap);
    }
  }

  // teken de Asteroids
  for (let i = 0; i < AsteroidList.length; i++) {
    ctx.fillStyle = "rgb(100, 100, 100)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "square";
    AsteroidList[i].show();
    AsteroidList[i].update();

    // verwijder een Asteroid als zijn grootte kleiner is dan 10
    if (AsteroidList[i].size < 10) {
      AsteroidList.splice(i, 1);
      myShip.score += 0.5;
      if (myShip.score >= 25) {
        win();
      }
      // als er eentje "kapot" gaat, zorg dan voor een willekeurige kans dat er een nieuwe bij komt
      if (0.5 < Math.random() && AsteroidList.length < 30) {
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
    }
  }

  // Asteroids collision onderling
  for (let i = 0; i < AsteroidList.length; i++) {
    for (let j = 0; j < AsteroidList.length; j++) {
      if (i == j) continue;
      if (
        AsteroidList[i].collision(AsteroidList[j]) &&
        AsteroidList[i].hitTimeout >= 400 &&
        AsteroidList[j].hitTimeout >= 400
      ) {
        AsteroidList[i].hitTimeout = 0;
        AsteroidList[j].hitTimeout = 0;
        // zelfde geval: maak snapshots van de velocity
        let snapOne = AsteroidList[i].velocity.copy();
        let snapTwo = AsteroidList[j].velocity.copy();

        // zorg dat bij beide de velocity nul is
        AsteroidList[i].velocity.sub(snapOne);
        AsteroidList[j].velocity.sub(snapTwo);

        // multiply de velocities.
        snapOne.mult(0.9);
        snapTwo.mult(0.9);

        // en voeg ze toe aan elkaar.
        AsteroidList[i].velocity.add(snapTwo);
        AsteroidList[j].velocity.add(snapOne);
      }
    }
  }

  // teken de lesers
  for (let i = 0; i < myShip.laserArray.length; i++) {
    myShip.laserArray[i].update();
    myShip.laserArray[i].show();
    // check voor collision met de laser en Asteroids (dit moet in een try catch, omdat het zomaar iets uit de AsteroidList verwijderd)
    try {
      for (let j = 0; j < AsteroidList.length; j++) {
        // check voor collision
        if (myShip.laserArray[i].collision(AsteroidList[j])) {
          // zet de velocity van de laser heel laag
          myShip.laserArray[i].velocity.mult(0.1);
          // voeg de velocity van de laser toe aan de Asteroid
          AsteroidList[j].velocity.add(myShip.laserArray[i].velocity);
          // verwijder de laster
          myShip.laserArray.splice(i, 1);

          // maak twee kopiën van de asteroid, die de helft van de oorspronkelijke grootte hebben en allebei een andere kant op vliegen.
          AsteroidList.push(
            new Asteroid(
              AsteroidList[j].rotation,
              AsteroidList[j].velocity.copy(),
              AsteroidList[j].position.copy(),
              AsteroidList[j].size / 2
            )
          );
          AsteroidList[j].velocity.mult(-1);
          AsteroidList.push(
            new Asteroid(
              AsteroidList[j].rotation,
              AsteroidList[j].velocity.copy(),
              AsteroidList[j].position.copy(),
              AsteroidList[j].size / 2
            )
          );
          // uiteindelijk wordt de oorspronkelijke Asteroid verwijderd.
          AsteroidList.splice(j, 1);
        }
      }
      // verwijder een laser als hij zijn maximum "leeftijd" heeft berijkt
      if (myShip.laserArray[i].age > Laser.maxAge)
        myShip.laserArray.splice(i, 1);
    } catch (e) {}
  }

  // teken de info text zoals fps, direction en score.
  ctx.font = "16px Arial";
  ctx.fillText("snelheid: " + myShip.velocity.mag().toFixed(2), 10, 20);
  ctx.fillText(
    "richting: " + ((myShip.velocity.heading() * 180) / Math.PI).toFixed(2),
    10,
    50
  );
  ctx.fillText("score: " + myShip.score, 10, 80);
  oldT = time;
  if (!end) window.requestAnimationFrame(draw);
}

setup();

// keyinput
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

function win() {
  end = true;
  setTimeout(() => {
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Je hebt gewonnen!", Canvas.width / 2, Canvas.height / 2 - 90);
    ctx.fillText(
      `Jouw score: ${myShip.score}`,
      Canvas.width / 2,
      Canvas.height / 2
    );
  }, 300);
}

function lose() {
  end = true;
  setTimeout(() => {
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "Helaas, je hebt verloren!",
      Canvas.width / 2,
      Canvas.height / 2
    );
  }, 500);
}
