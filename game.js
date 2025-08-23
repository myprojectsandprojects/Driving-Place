const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');

const keys = {};

const wheelThickness = 20;
const wheelDiameter = 60;
let wheelX = canvas.width / 2;
let wheelY = canvas.height / 2;
let direction = 0;
let speed = 0;

function makeAFrame(timestamp) {
  if (keys.ArrowLeft === true) {
    direction -= 0.01;
  }
  if (keys.ArrowRight === true) {
    direction += 0.01;
  }
  if (keys.ArrowUp === true) {
    speed += 0.05;
  }
  if (keys.ArrowDown === true) {
    speed -= 0.05;
  }

  // wheelX += Math.sin(direction) * speed;
  // wheelY += -Math.cos(direction) * speed;
  wheelX += Math.cos(direction) * speed;
  wheelY += Math.sin(direction) * speed;

  if (speed > 0) {
    // speed -= 0.01;
    // if (speed < 0) {
    //   speed = 0;
    // }
    speed -= Math.min(0.01, speed);
  } else if (speed < 0) {
    speed -= Math.max(-0.01, speed)
  }

  c.clearRect(0, 0, canvas.width, canvas.height);

  c.save();

  c.translate(wheelX, wheelY);
  c.rotate(direction);
  c.fillStyle = 'blue';
  // c.fillRect(-(wheelThickness / 2), -(wheelDiameter / 2), wheelThickness, wheelDiameter);
  c.fillRect(-(wheelDiameter / 2), -(wheelThickness / 2), wheelDiameter, wheelThickness);

  c.restore();

  requestAnimationFrame(makeAFrame);
}

requestAnimationFrame(makeAFrame);

document.addEventListener('keydown', (event) => {
  console.log(`key (${event.code}) down`);
  keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  console.log(`key (${event.code}) up`);
  keys[event.code] = false;
});

