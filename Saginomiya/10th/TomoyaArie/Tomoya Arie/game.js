// ========== game.js ==========
// チャリ走 物理演算版 — 無限モード対応（穴判定元に戻す）

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

const GRAVITY = 900;
const WHEEL_RADIUS = 15;
const BASE_SPEED = 650;
const SPEED_INCREASE_PER_STAGE = 40;
const JUMP_POWER = 450;
const STAGE_COUNT = 10;
const INFINITE_MAX_X = 1000000;

let currentStage = 0;
let terrain = [];
let holes = [];
let bike = { x: 50, y: 0, vx: 0, vy: 0, onGround: false, fell: false };
let cameraX = 0;
let keys = {};
let cleared = false;
let goalX = 3000;
let uiState = "play"; // play / clear / loading / infinite / gameclear
let uiTimer = 0;
let infiniteMode = false;

// ======= ステージ生成 =======
function generateTerrain(stageIndex, startX = 0, startY = null) {
  let x = startX;
  let y = startY !== null ? startY : canvas.height - 150;

  if (!infiniteMode) {
    terrain = [];
    holes = [];
    goalX = 4000 + stageIndex * 600;
    terrain.push({ x1: 0, y1: y, x2: 400, y2: y, hole: false });
    x = 400;
  } else {
    goalX = Math.min(x + 800, INFINITE_MAX_X);
  }

  const holeChance = 0.25 + stageIndex * 0.05;
  const slopeRange = 0.25 + stageIndex * 0.05;

  const vx = BASE_SPEED + stageIndex * SPEED_INCREASE_PER_STAGE;
  const vy = JUMP_POWER;
  const tJump = (2 * vy) / GRAVITY;
  const maxJumpDistance = vx * tJump;
  const safeMaxDistance = maxJumpDistance * 0.75;

  while (x < goalX + 800 && x < INFINITE_MAX_X) {
    const isHole = Math.random() < holeChance;
    const slope = (Math.random() - 0.5) * slopeRange;
    const length = 250 + Math.random() * 300;

    if (isHole) {
      const holeWidth = 150 + Math.random() * Math.max(0, safeMaxDistance - 150);
      holes.push({ x1: x, x2: x + holeWidth, y: y });

      // 壁の高さは床から +200
      terrain.push({
        x1: x,
        y1: y + 200,
        x2: x + holeWidth,
        y2: y + 200,
        hole: true,
      });

      y = y + (Math.random() - 0.5) * 30;
      terrain.push({
        x1: x + holeWidth,
        y1: y,
        x2: x + holeWidth + 300,
        y2: y,
        hole: false,
      });

      x += holeWidth + 300;
    } else {
      const newY = y + slope * 200;
      terrain.push({
        x1: x,
        y1: y,
        x2: x + length,
        y2: newY,
        hole: false,
      });
      y = newY;
      x += length;
    }
  }
}

// ======= 地形の高さを取得 =======
function terrainY(x) {
  for (let seg of terrain) {
    if (x >= seg.x1 && x <= seg.x2 && !seg.hole) {
      const t = (x - seg.x1) / (seg.x2 - seg.x1);
      return seg.y1 + (seg.y2 - seg.y1) * t;
    }
  }
  return null;
}

// ======= 入力 =======
document.addEventListener("keydown", (e) => {
  if (["ArrowRight", "ArrowLeft", "Space"].includes(e.code)) keys[e.code] = true;
  if (e.code === "KeyR") resetGame();
});
document.addEventListener("keyup", (e) => {
  if (["ArrowRight", "ArrowLeft", "Space"].includes(e.code)) keys[e.code] = false;
});

// ======= リセット =======
function resetGame() {
  bike = { x: 50, y: 0, vx: 0, vy: 0, onGround: false, fell: false };
  cameraX = 0;
  cleared = false;
  uiState = "play";
  uiTimer = 0;

  if (!infiniteMode) {
    generateTerrain(currentStage);
  } else {
    const last = terrain[terrain.length - 1];
    generateTerrain(currentStage, last.x2, last.y2);
  }
}

// ======= ステージ遷移 =======
function nextStage() {
  if (!infiniteMode) {
    if (currentStage < STAGE_COUNT - 1) {
      currentStage++;
      resetGame();
    } else {
      infiniteMode = true;
      uiState = "infinite";
      uiTimer = 0;
    }
  } else {
    resetGame();
  }
}

// ======= 更新 =======
function update(dt) {
  if (uiState !== "play") return;

  const stageFactor = infiniteMode ? currentStage + uiTimer * 0.1 : currentStage;
  const speed = BASE_SPEED + stageFactor * SPEED_INCREASE_PER_STAGE;

  if (keys["ArrowRight"]) bike.vx = speed;
  else if (keys["ArrowLeft"]) bike.vx = -speed / 1.5;
  else bike.vx = 0;

  if (keys["Space"] && bike.onGround) {
    bike.vy = -JUMP_POWER;
    bike.onGround = false;
  }

  bike.vy += GRAVITY * dt;
  bike.x += bike.vx * dt;
  bike.y += bike.vy * dt;

  // ===== 穴判定（以前の状態） =====
  for (let hole of holes) {
    const leftWallX = hole.x1;
    const rightWallX = hole.x2;
    const wallTop = hole.y;
    const wallBottom = hole.y + 200;

    if (
      bike.x + WHEEL_RADIUS > leftWallX &&
      bike.x - WHEEL_RADIUS < leftWallX &&
      bike.y > wallTop + WHEEL_RADIUS &&
      bike.y < wallBottom + WHEEL_RADIUS
    ) {
      bike.fell = true;
      uiState = "loading";
      uiTimer = 0;
      return;
    }

    if (
      bike.x - WHEEL_RADIUS < rightWallX &&
      bike.x + WHEEL_RADIUS > rightWallX &&
      bike.y > wallTop + WHEEL_RADIUS &&
      bike.y < wallBottom + WHEEL_RADIUS
    ) {
      bike.fell = true;
      uiState = "loading";
      uiTimer = 0;
      return;
    }
  }

  // ===== 通常落下 =====
  if (bike.y > canvas.height + 100 && !bike.fell) {
    bike.fell = true;
    uiState = "loading";
    uiTimer = 0;
    return;
  }

  if (bike.fell) return;

  // ===== 地形判定 =====
  const groundY = terrainY(bike.x);

  if (groundY === null) {
    if (bike.y > canvas.height + 50) {
      bike.fell = true;
      uiState = "loading";
      uiTimer = 0;
    }
  } else {
    if (bike.y + WHEEL_RADIUS > groundY) {
      bike.y = groundY - WHEEL_RADIUS;
      bike.vy = 0;
      bike.onGround = true;
    } else {
      bike.onGround = false;
    }
  }

  // ===== ゴール判定 =====
  if (!infiniteMode && bike.x > goalX && !cleared) {
    cleared = true;
    uiState = "clear";
    uiTimer = 0;
  }

  // 無限モード用追加生成
  if (infiniteMode) {
    const lastX = terrain[terrain.length - 1].x2;
    if (bike.x + canvas.width * 2 > lastX && lastX < INFINITE_MAX_X) {
      generateTerrain(currentStage, lastX, terrain[terrain.length - 1].y2);
    }
  }

  cameraX = Math.max(0, bike.x - canvas.width / 2);
}

// ======= UI更新 =======
function updateUI(dt) {
  if (uiState === "clear") {
    uiTimer += dt;
    if (uiTimer > 0.5) {
      uiState = "loading";
      uiTimer = 0;
    }
  } else if (uiState === "loading") {
    uiTimer += dt;
    if (uiTimer > 0.5) {
      if (cleared) nextStage();
      else resetGame();
    }
  } else if (uiState === "infinite") {
    uiTimer += dt;
    if (uiTimer > 1.2) {
      uiState = "play";
      resetGame();
      uiTimer = 0;
    }
  }
}

// ======= 描画 =======
function draw() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#150050");
  grad.addColorStop(1, "#000");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-cameraX, 0);

  // 地形
  for (let seg of terrain) {
    if (seg.hole) continue;
    const neonGrad = ctx.createLinearGradient(seg.x1, seg.y1, seg.x2, seg.y2);
    neonGrad.addColorStop(0, "#00f5d4");
    neonGrad.addColorStop(1, "#ff4d6d");
    ctx.strokeStyle = neonGrad;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
    ctx.stroke();
  }

  // 穴
  for (let hole of holes) {
    ctx.fillStyle = "#000";
    ctx.fillRect(hole.x1, hole.y - 5, hole.x2 - hole.x1, canvas.height - hole.y);

    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(hole.x1, hole.y);
    ctx.lineTo(hole.x1, hole.y + 200);
    ctx.moveTo(hole.x2, hole.y);
    ctx.lineTo(hole.x2, hole.y + 200);
    ctx.stroke();
  }

  // ゴールライン（無限モードでは非表示）
  if (!infiniteMode) {
    const goalGrad = ctx.createLinearGradient(goalX, 0, goalX + 10, canvas.height);
    goalGrad.addColorStop(0, "#00fff5");
    goalGrad.addColorStop(1, "#ff00f5");
    ctx.fillStyle = goalGrad;
    ctx.fillRect(goalX, 0, 10, canvas.height);
  }

  // バイク
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#00f5ff";
  ctx.fillStyle = "#00f5ff";
  ctx.beginPath();
  ctx.arc(bike.x - 15, bike.y, WHEEL_RADIUS, 0, Math.PI * 2);
  ctx.arc(bike.x + 15, bike.y, WHEEL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "#ff00ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bike.x - 15, bike.y);
  ctx.lineTo(bike.x, bike.y - 25);
  ctx.lineTo(bike.x + 15, bike.y);
  ctx.stroke();

  ctx.restore();

  // HUD
  ctx.fillStyle = "#0ff";
  ctx.font = "22px 'Orbitron', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(
    infiniteMode ? `Stage ∞` : `Stage ${currentStage + 1} / ${STAGE_COUNT}`,
    20,
    30
  );

  // ステージクリア表示
  if (uiState === "clear") {
    ctx.fillStyle = "rgba(0,255,255,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "48px 'Orbitron', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("STAGE CLEAR!", canvas.width / 2, canvas.height / 2);
  }

  // 無限モード演出
  if (uiState === "infinite") {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = "60px 'Orbitron', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("∞ INFINITE MODE ∞", canvas.width / 2, canvas.height / 2);
  }

  // ローディング
  if (uiState === "loading") {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0ff";
    ctx.font = "36px 'Orbitron', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("LOADING...", canvas.width / 2, canvas.height / 2);
  }
}

// ======= メインループ =======
let last = 0;
function loop(t) {
  const dt = (t - last) / 1000;
  last = t;
  update(dt);
  updateUI(dt);
  draw();
  requestAnimationFrame(loop);
}

// 初期化
generateTerrain(currentStage);
requestAnimationFrame(loop);
