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


  c.strokeStyle = '#204FCF';
  c.lineWidth = 3;
  c.fillStyle = '#20CFA0';
  c.beginPath();
  c.moveTo(10, 10);
  c.lineTo(50, 50);
  c.lineTo(90, 50);
  // c.lineTo(10, 50);
  // c.closePath();
  c.stroke();
  c.fill();

  const centerPointX = 100;
  const centerPointY = 100;
  const radius = 30;
  const numPoints = 9;

  const angleChange = 2 * Math.PI / numPoints;
  const points = [];
  for (let angle = 0; angle < 2 * Math.PI; angle += angleChange) {
    const pointX = centerPointX + Math.cos(angle) * radius;
    const pointY = centerPointY + Math.sin(angle) * radius;
    points.push({x: pointX, y: pointY});
  }

  c.lineWidth = 1;
  c.strokeStyle = '#000000';
  c.beginPath();
  c.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    c.lineTo(points[i].x, points[i].y);
  }
  c.closePath();
  c.stroke();

  c.fillStyle = '#ff0000';
  for (let i = 0; i < points.length; i += 1) {
    c.beginPath();
    c.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI);
    c.fill();
  }

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

  requestAnimationFrame(makeAFrame);
}

requestAnimationFrame(makeAFrame);

document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

