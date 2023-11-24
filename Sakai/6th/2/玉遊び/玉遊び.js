const canvas = document.getElementById('canvas');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const circles = [];
const gameDuration = 5;

let timeRemaining = gameDuration;
let timerInterval = null;
let score = 0;

function resetParameter(circle, fromLeft, fromTop) {
  circle.radius = Math.floor(Math.random() * 10) + 20;
  circle.xSpeed = (Math.random() - 0.5) * 5;
  circle.ySpeed = (Math.random() - 0.5) * 5;
  const r = Math.floor(Math.random() * 225);
  const g = Math.floor(Math.random() * 225);
  const b = Math.floor(Math.random() * 225);
  circle.rgb = `rgb(${r}, ${g}, ${b})`;
  if (fromLeft) {
    circle.x = 0;
  } else {
    circle.x = canvas.width;
    circle.xSpeed *= -1;
  }
  if (fromTop) {
    circle.y = 0;
  } else {
    circle.y = canvas.height;
    circle.ySpeed *= -1;
  }
  circle.x = Math.random(0, canvas.width) * canvas.width;
  circle.y = Math.random(0, canvas.height) * canvas.height;
  if (fromLeft && !fromTop) {
    circle.x = canvas.width;
    circle.xSpeed *= -1;
  }
  else if (fromLeft && fromTop) {
    circle.x = 0;
  }
  else if (!fromLeft && fromTop) {
    circle.y = canvas.height;
    circle.ySpeed *= -1;
  }
  else if (!fromLeft && !fromTop) {
    circle.y = 0;
  }
}
function createCircle(fromLeft, fromTop) {
  const circle = {};
  resetParameter(circle, fromLeft, fromTop);
  circles.push(circle);
}
function drawCircles() {
  ctx.fillStyle = "rgba(255, 255, 225, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = circle.rgb;
    ctx.fill();
    if (circle.x > canvas.width || circle.x < 0 || circle.y > canvas.height || circle.y < 0) {
      circles.splice(i, 1);
      createCircle(Math.random() < 0.5, Math.random() < 0.5);
    }
  }
}

function anim() {
  drawCircles();
  requestAnimationFrame(anim);
}
function onCanvasClick(ev) {
  const x = ev.clientX;
  const y = ev.clientY;
  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    const xd = x - circle.x;
    const yd = y - circle.y;
    const distanceSquared = xd * xd + yd * yd;
    if (distanceSquared <= circle.radius * circle.radius) {
      score += 1;
      circles.splice(i, 1);
      createCircle(Math.random() < 0.5, Math.random() < 0.5);
    }
  }
}
canvas.addEventListener("click", onCanvasClick);
for (let i = 0; i < 1000; i++) {
  createCircle(Math.random() < 0.5, Math.random() < 0.5);
}
timerInterval = setInterval(() => {
  timeRemaining -= 1;
  if (timeRemaining <= 0) {
    alert(`Game Over! your score: ${score}`);
    score = 0;
    timeRemaining = gameDuration;
  }
}, 1000);

anim();
