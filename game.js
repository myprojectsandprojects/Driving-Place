const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');

const keys = {};

const wheelThickness = 10;
const wheelDiameter = 30;

const frontRearDistance = 50;
let frontWheelDirection = 0;
let frontWheelX = canvas.width / 2;
let frontWheelY = canvas.height / 2;
let rearWheelDirection = 1;
let rearWheelX = frontWheelX - frontRearDistance;
let rearWheelY = frontWheelY;

let speed = 0;

function makeAFrame(timestamp) {
  if (keys.ArrowLeft === true) {
    frontWheelDirection -= 0.03;
  }
  if (keys.ArrowRight === true) {
    frontWheelDirection += 0.03;
  }
  if (keys.ArrowUp === true) {
    speed += 0.05;
  }
  if (keys.ArrowDown === true) {
    speed -= 0.05;
  }

  frontWheelX += Math.cos(frontWheelDirection) * speed;
  frontWheelY += Math.sin(frontWheelDirection) * speed;

  const frontToRearX = rearWheelX - frontWheelX;
  const frontToRearY = rearWheelY - frontWheelY;
  const frontToRearDirection = Math.atan2(frontToRearY, frontToRearX);
  rearWheelX = frontWheelX + Math.cos(frontToRearDirection) * frontRearDistance;
  rearWheelY = frontWheelY + Math.sin(frontToRearDirection) * frontRearDistance;
  rearWheelDirection = Math.atan2(-frontToRearY, -frontToRearX);

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

  c.translate(frontWheelX, frontWheelY);
  c.rotate(frontWheelDirection);

  c.fillStyle = '#333333';
  c.fillRect(-(wheelDiameter / 2), -(wheelThickness / 2), wheelDiameter, wheelThickness);

  c.restore();


  c.save();

  c.translate(rearWheelX, rearWheelY);
  c.rotate(rearWheelDirection);

  c.fillStyle = '#333333';
  c.fillRect(-(wheelDiameter / 2), -(wheelThickness / 2), wheelDiameter, wheelThickness);

  c.restore();
  

  // c.strokeStyle = 'blue';
  // c.beginPath();
  // c.moveTo(frontWheelX, frontWheelY);
  // c.lineTo(rearWheelX, rearWheelY);
  // c.stroke();
  // //@ c.endPath()?

  requestAnimationFrame(makeAFrame);
}

requestAnimationFrame(makeAFrame);

document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

