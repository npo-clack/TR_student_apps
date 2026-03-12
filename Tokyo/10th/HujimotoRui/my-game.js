const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ===== 設定 =====
const brickRowCount = 6;
const brickColumnCount = 12;
const brickWidth = 50;
const brickHeight = 18;
const brickPadding = 5;
const brickOffsetTop = 100;
const brickOffsetLeft = 60;

let ballRadius = 8;
const paddleOriginalWidth = 100;
let paddleWidth = paddleOriginalWidth;
let paddleHeight = 10;
let lives = 3;
let score = 0;

// ===== ゲーム変数 =====
let rightPressed = false;
let leftPressed = false;
let bricks = [];
let currentLevel = 1;
let balls = [];      // 複数ボール
let powerUps = [];   // アイテム
let endlessMode = false;
let endlessTimer = 0;
let lastTime = performance.now();
let paddleX = 0;
let paddleExpandTimer = 0;
let gameEnded = false;
let endMessage = ""; // GAME CLEAR / GAME OVER

// ===== 効果音 =====
const soundPaddle = new Audio("sounds/paddle.wav");
const soundWall = new Audio("sounds/wall.wav");
const soundBrick = new Audio("sounds/brick.wav");
const soundPowerUp = new Audio("sounds/powerup.wav");
const soundClear = new Audio("sounds/clear.wav");
const soundGameOver = new Audio("sounds/gameover.wav");

// ===== イベント =====
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("levelSelect").style.display = "block";
});

document.querySelectorAll(".levelBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLevel = parseInt(btn.dataset.level);
    document.getElementById("levelSelect").style.display = "none";
    canvas.style.display = "block";
    if(currentLevel===5) endlessMode = true;
    else endlessMode=false;
    init();
  });
});

document.addEventListener("keydown", e => {
  if (["ArrowRight","Right","d"].includes(e.key)) rightPressed = true;
  if (["ArrowLeft","Left","a"].includes(e.key)) leftPressed = true;
});
document.addEventListener("keyup", e => {
  if (["ArrowRight","Right","d"].includes(e.key)) rightPressed = false;
  if (["ArrowLeft","Left","a"].includes(e.key)) leftPressed = false;
});

// ===== 初期化 =====
function init() {
  balls = [{x: canvas.width/2, y: canvas.height-50, dx:6, dy:-6, isExtra:false}];
  paddleX = (canvas.width - paddleWidth)/2;
  score = 0;
  lives = 3;
  endlessTimer = 0;
  powerUps = [];
  paddleWidth = paddleOriginalWidth;
  paddleExpandTimer = 0;
  gameEnded = false;
  endMessage = "";
  generateBricks();
  lastTime = performance.now();
  draw(lastTime);
}

// ===== ブロック生成 =====
function generateBricks() {
  bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      let hits = 1;
      let status = 1;
      if (currentLevel === 2 && r === 0) hits = 4;
      if (currentLevel === 3) {
        if (Math.random() < 0.15) status = -1;
        else if (Math.random() < 0.15) hits = 4;
      }
      const brickX = brickOffsetLeft + c * (brickWidth + brickPadding);
      const brickY = brickOffsetTop + r * (brickHeight + brickPadding);
      bricks[c][r] = { x: brickX, y: brickY, status, hitsLeft: hits };
    }
  }
}

// ===== 描画 =====
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      const b = bricks[c][r];
      if (b.status !== 0) {
        ctx.beginPath();
        ctx.rect(b.x, b.y, brickWidth, brickHeight);
        if (b.status === -1) ctx.fillStyle = "#888";
        else if (b.hitsLeft === 4) ctx.fillStyle = "#f40";
        else ctx.fillStyle = "#0ff";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  balls.forEach(ball=>{
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ball.isExtra ? "#0f0" : "#fff";
    ctx.fill();
    ctx.closePath();
  });
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - 20, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ff0";
  ctx.fill();
  ctx.closePath();
}

function drawHUD() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 8, 20);
  ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
}

// ===== 衝突判定 =====
function collisionDetection() {
  balls.forEach(ball=>{
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < bricks[c].length; r++) {
        const b = bricks[c][r];
        if (b.status !== 0) {
          if (ball.x + ballRadius > b.x && ball.x - ballRadius < b.x + brickWidth &&
              ball.y + ballRadius > b.y && ball.y - ballRadius < b.y + brickHeight) {

            const prevX = ball.x - ball.dx;
            const prevY = ball.y - ball.dy;
            const fromLeft = prevX + ballRadius <= b.x;
            const fromRight = prevX - ballRadius >= b.x + brickWidth;
            const fromTop = prevY + ballRadius <= b.y;
            const fromBottom = prevY - ballRadius >= b.y + brickHeight;

            if (fromLeft) { ball.dx = -Math.abs(ball.dx); ball.x = b.x - ballRadius; }
            else if (fromRight) { ball.dx = Math.abs(ball.dx); ball.x = b.x + brickWidth + ballRadius; }
            if (fromTop) { ball.dy = -Math.abs(ball.dy); ball.y = b.y - ballRadius; }
            else if (fromBottom) { ball.dy = Math.abs(ball.dy); ball.y = b.y + brickHeight + ballRadius; }
            if (!fromLeft && !fromRight && !fromTop && !fromBottom) ball.dy = -ball.dy;

            if (b.status !== -1) {
              b.hitsLeft--;
              if (b.hitsLeft <= 0) b.status = 0;
              score++;
              soundBrick.currentTime = 0;
              soundBrick.play();

              // アイテム10%で生成
              if (Math.random() < 0.1) {
                const type = Math.random() < 0.5 ? "ball" : "paddle";
                powerUps.push({x: b.x + brickWidth/2, y: b.y + brickHeight/2, radius:8, type});
              }
            }
          }
        }
      }
    }
  });
}

// ===== アイテム描画 =====
function drawPowerUps() {
  for (let i = powerUps.length -1; i >=0; i--) {
    const p = powerUps[i];
    p.y += 2;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    ctx.fillStyle = p.type === "paddle" ? "#ff0" : "#0f0";
    ctx.fill();
    ctx.closePath();

    if (p.y + p.radius > canvas.height - paddleHeight - 20 &&
        p.x > paddleX && p.x < paddleX + paddleWidth) {

      if (p.type === "ball") {
        const originalBall = balls[0];
        balls.push({x: originalBall.x, y: originalBall.y, dx:originalBall.dx, dy:-originalBall.dy, isExtra:true});
        balls.push({x: originalBall.x, y: originalBall.y, dx:-originalBall.dx, dy:-originalBall.dy, isExtra:true});
      } else if (p.type === "paddle") {
        paddleWidth = paddleOriginalWidth * 1.5;
        paddleExpandTimer = 10000;
      }

      powerUps.splice(i,1);
      soundPowerUp.currentTime = 0;
      soundPowerUp.play();
    } else if (p.y - p.radius > canvas.height) {
      powerUps.splice(i,1);
    }
  }
}

// ===== エンドレスモード =====
function updateEndless(deltaTime) {
  if (!endlessMode) return;
  endlessTimer += deltaTime;
  if (endlessTimer >= 15000) { // 15秒ごと
    endlessTimer = 0;
    const newRow = [];
    for (let c = 0; c < brickColumnCount; c++) {
      let hits = Math.random() < 0.2 ? 4 : 1;
      let status = 1;
      newRow[c] = {x: brickOffsetLeft + c*(brickWidth+brickPadding), y: brickOffsetTop, hitsLeft:hits, status};
    }
    for (let c = 0; c < bricks.length; c++) {
      for (let r = bricks[c].length-1; r>=0; r--) bricks[c][r].y += brickHeight+brickPadding;
      bricks[c].unshift(newRow[c]);
    }
  }
}

// ===== ゲーム終了判定 =====
function checkGameEnd() {
  if (gameEnded) return;

  let remaining = 0;
  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      if (bricks[c][r].status > 0) remaining++;
    }
  }

  if (remaining === 0) {
    gameEnded = true;
    endMessage = "GAME CLEAR";
    showEndScreen(endMessage);
  } else if (lives <= 0) {
    gameEnded = true;
    endMessage = "GAME OVER";
    showEndScreen(endMessage);
  }
}

// ===== 終了画面表示 =====
function showEndScreen(message) {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  let img = new Image();
  if (message === "GAME CLEAR") {
    soundClear.currentTime = 0;
    soundClear.play();
    img.src = "over.jpg";
  } else if (message === "GAME OVER") {
    soundGameOver.currentTime = 0;
    soundGameOver.play();
    img.src = "images/gameover.png";
  }

  img.onload = () => {
    ctx.drawImage(img, canvas.width/2 - img.width/2, canvas.height/2 - img.height/2 - 30);
  }

  ctx.font = "48px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width/2, canvas.height/2 + 150);

  // 再スタートボタン
  ctx.fillStyle = "#0ff";
  ctx.fillRect(canvas.width/2 - 80, canvas.height/2 + 180, 160, 50);
  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText("RESTART", canvas.width/2, canvas.height/2 + 215);
}

// ===== 再スタート / 次ステージ =====
canvas.addEventListener("click", (e) => {
  if (!gameEnded) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  if (clickX >= canvas.width/2 - 80 && clickX <= canvas.width/2 + 80 &&
      clickY >= canvas.height/2 + 180 && clickY <= canvas.height/2 + 230) {
    gameEnded = false;
    if(endMessage === "GAME CLEAR" && currentLevel < 5){
      currentLevel++;
    }
    init();
  }
});

// ===== メインループ =====
function draw(now){
  const deltaTime = now - lastTime;
  lastTime = now;

  updateEndless(deltaTime);

  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawHUD();
  collisionDetection();
  drawPowerUps();
  checkGameEnd();

  balls.forEach((ball,index)=>{
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
      ball.dx = -ball.dx;
      soundWall.currentTime = 0;
      soundWall.play();
    }
    if (ball.y + ball.dy < ballRadius) {
      ball.dy = Math.abs(ball.dy);
      soundWall.currentTime = 0;
      soundWall.play();
    } else if (ball.y + ball.dy > canvas.height - ballRadius - 20 - paddleHeight) {
      if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
        ball.dy = -Math.abs(ball.dy);
        soundPaddle.currentTime = 0;
        soundPaddle.play();
      } else if (ball.y + ball.dy > canvas.height - ballRadius) {
        if (!ball.isExtra) {
          lives--;
          if (!lives) checkGameEnd();
          else balls = [{x: canvas.width/2, y: canvas.height-50, dx:6, dy:-6, isExtra:false}];
        } else balls.splice(index,1);
      }
    }
  });

  if (paddleExpandTimer > 0) {
    paddleExpandTimer -= deltaTime;
    if (paddleExpandTimer <= 0) paddleWidth = paddleOriginalWidth;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 12;
  else if (leftPressed && paddleX > 0) paddleX -= 12;

  if (!gameEnded) requestAnimationFrame(draw);
}
