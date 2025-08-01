const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const cols = 30;
const rows = 30;
const cellSize = canvas.width / cols;

let maze = [];
let stack = [];

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;
  }

  draw() {
    const x = this.x * cellSize;
    const y = this.y * cellSize;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    if (this.walls[0]) drawLine(x, y, x + cellSize, y); // top
    if (this.walls[1]) drawLine(x + cellSize, y, x + cellSize, y + cellSize); // right
    if (this.walls[2]) drawLine(x + cellSize, y + cellSize, x, y + cellSize); // bottom
    if (this.walls[3]) drawLine(x, y + cellSize, x, y); // left
  }

  checkNeighbors() {
    const neighbors = [];
    const top = getCell(this.x, this.y - 1);
    const right = getCell(this.x + 1, this.y);
    const bottom = getCell(this.x, this.y + 1);
    const left = getCell(this.x - 1, this.y);

    [top, right, bottom, left].forEach(cell => {
      if (cell && !cell.visited) {
        neighbors.push(cell);
      }
    });

    if (neighbors.length > 0) {
      const r = Math.floor(Math.random() * neighbors.length);
      return neighbors[r];
    }
    return undefined;
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function getCell(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return undefined;
  return maze[x + y * cols];
}

function removeWalls(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  if (dx === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (dx === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (dy === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (dy === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

// タイマー関連
let timer = 0;
let timerInterval = null;

function startTimer() {
  timer = 0;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timer++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent = timer;
}

// プレイヤー
let player = { x: 0, y: 0 };

// ゴール
const goal = { x: cols - 1, y: rows - 1 };

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    player.x * cellSize + cellSize / 2,
    player.y * cellSize + cellSize / 2,
    cellSize / 3,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function drawGoal() {
  ctx.fillStyle = "green";
  ctx.fillRect(
    goal.x * cellSize + 4,
    goal.y * cellSize + 4,
    cellSize - 8,
    cellSize - 8
  );
}

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  maze.forEach(cell => cell.draw());
  drawGoal();
  drawPlayer();
}

// 迷路生成とゲーム開始
function setup() {
  maze = [];
  stack = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      maze.push(new Cell(x, y));
    }
  }

  let current = maze[0];
  current.visited = true;
  stack.push(current);

  while (stack.length > 0) {
    current = stack[stack.length - 1];
    const next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(next);
      removeWalls(current, next);
    } else {
      stack.pop();
    }
  }

  player.x = 0;
  player.y = 0;
  drawMaze();
  startTimer(); // タイマー開始
}

// プレイヤー操作
document.addEventListener("keydown", (e) => {
  const current = getCell(player.x, player.y);
  if (e.key === "ArrowUp" && !current.walls[0]) player.y--;
  else if (e.key === "ArrowRight" && !current.walls[1]) player.x++;
  else if (e.key === "ArrowDown" && !current.walls[2]) player.y++;
  else if (e.key === "ArrowLeft" && !current.walls[3]) player.x--;

  if (player.x === goal.x && player.y === goal.y) {
    stopTimer();
    setTimeout(() => {
      alert(`ゴールしました！経過時間：${timer} 秒`);
      setup(); // ゲームを再開
    }, 100);
  }

  drawMaze();
});

setup(); // 初回起動