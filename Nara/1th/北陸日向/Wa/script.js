// script.js
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1980;
canvas.height = 1080;

const tileSize = 32;

// 簡単なマップデータ (0: 草地, 1: 道, 2: 建物)
const map = [
  [1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// キャラクターの初期位置
const player = {
  x: 2,
  y: 2,
};

// キー入力の設定
const keys = {};

// イベントリスナーを登録
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// タイル描画
function drawTile(x, y, type) {
  switch (type) {
    case 0:
      ctx.fillStyle = "#228B22"; // 草地
      break;
    case 1:
      ctx.fillStyle = "#D2B48C"; // 道
      break;
    case 2:
      ctx.fillStyle = "#8B4513"; // 建物
      break;
  }
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

// マップ描画
function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      drawTile(x, y, map[y][x]);
    }
  }
}

// キャラクター描画
function drawPlayer() {
  ctx.fillStyle = "#FF0000"; // 赤い主人公
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// ゲームの更新
function update() {
  if (keys["ArrowUp"] && player.y > 0 && map[player.y - 1][player.x] !== 2) player.y--;
  if (keys["ArrowDown"] && player.y < map.length - 1 && map[player.y + 1][player.x] !== 2) player.y++;
  if (keys["ArrowLeft"] && player.x > 0 && map[player.y][player.x - 1] !== 2) player.x--;
  if (keys["ArrowRight"] && player.x < map[0].length - 1 && map[player.y][player.x + 1] !== 2) player.x++;
}

// ゲームループ
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
  update();
  requestAnimationFrame(gameLoop);
}

// ゲーム開始
gameLoop();
