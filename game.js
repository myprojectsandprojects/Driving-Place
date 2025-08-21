const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');

const wheelThickness = 20;
const wheelDiameter = 60;
const wheelX = canvas.width / 2;
const wheelY = canvas.height / 2;
let angle = 0;

function makeAFrame(timestamp) {
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.save();

  c.translate(wheelX, wheelY);
  c.rotate(angle);
  c.fillStyle = 'blue';
  c.fillRect(-(wheelThickness / 2), -(wheelDiameter / 2), wheelThickness, wheelDiameter);

  c.restore();

  angle += 0.01;

  requestAnimationFrame(makeAFrame);
}

requestAnimationFrame(makeAFrame);
