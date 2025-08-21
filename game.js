console.log("Hello from Javascript!");

const canvas = document.getElementById('game-canvas');
console.log(canvas);

const c = canvas.getContext('2d');
console.log(c);

c.clearRect(0, 0, canvas.width, canvas.height);

c.fillStyle = 'blue';
c.fillRect(10, 10, 100, 100);

