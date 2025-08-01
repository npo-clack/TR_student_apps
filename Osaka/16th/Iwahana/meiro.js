const canvas = document.getElementById("meiro");
const ctx = canvas.getContext("2d");


// マップ（20x20)
const originalMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,1,7,0,0,1,0,0,1,1,1,0,0,6,0,1],
  [1,0,1,0,1,0,1,1,0,0,0,0,0,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,1,1,1,0,0,0,1,0,0,1],
  [1,0,0,1,1,0,1,0,0,0,0,0,1,0,1,1,1,0,1,1],
  [1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1],
  [1,5,0,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1],
  [1,1,0,1,0,0,0,6,0,0,1,1,0,1,1,0,1,1,0,1],
  [1,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,1],
  [1,0,1,0,1,0,0,1,0,0,0,1,1,7,3,1,0,0,7,1],
  [1,0,0,0,1,1,0,1,0,1,1,0,0,0,1,1,0,1,1,1],
  [1,1,0,1,0,1,0,0,0,1,0,1,1,1,0,0,0,0,0,1],
  [1,0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,1,0,1,1],
  [1,0,1,1,0,1,1,0,1,0,0,0,0,1,1,1,0,0,0,1],
  [1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1],
  [1,0,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,1,0,1],
  [1,1,1,0,1,0,0,0,6,0,0,1,0,1,1,1,1,0,0,1],
  [1,0,0,0,1,1,1,0,1,0,1,0,0,1,0,6,0,0,0,1],
  [1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


let map =[];
const rows = originalMap.length;
const cols = originalMap[0].length;

const canvasSize = 500;
const tileSize = canvasSize / cols;

const startX = 1;
const startY = 1;
let playerX = startX;
let playerY = startY;
let triggered = false;
let hiddenRevealed = false;
let highlightPath = false;
let pathTimer = null;
let hasMoved = false;

function resetMap(){
  map = originalMap.map(row => row.slice());
  playerX = startX;
  playerY = startY;
  triggered = false;
  hiddenRevealed = false;
  highlightPath = false;
  hasMoved = false;
  drawMap();
}

function drawMap(){
  ctx.clearRect(0,0,canvas.width, canvas.height);

  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      const cell = map[y][x];

      if(cell === 1){
        ctx.fillStyle = "black";
      }else if(x === playerX && y === playerY){
        ctx.fillStyle = "blue";
      }else if(cell === 3){
        ctx.fillStyle = "yellow";
      }else if(cell === 4){
        ctx.fillStyle = "white";
      }else if(cell === 5){
        ctx.fillStyle = "limegreen";
      }else if(cell === 6){
        ctx.fillStyle = "purple";
      }else if(cell === 7){
        ctx.fillStyle = "red";
      }else{
        ctx.fillStyle = (highlightPath || !hasMoved) ? "white" : "black";
      }

      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function revealHiddenPath(){
  if (hiddenRevealed) return;
  map[9][4] = 0;
  map[9][7] = 0;
  map[9][11] = 0;
  map[9][12] = 0;
  hiddenRevealed = true;
}

function movePlayer(dx, dy){
  const newX = playerX + dx;
  const newY = playerY + dy;
  const destination = map[newY][newX];

  if (!hasMoved){
    hasMoved = true;
    drawMap();
  }

  if (destination === 1) return;

  if (destination === 3) {
    triggered = true;
    revealHiddenPath();
  }

  if (destination === 7){
    highlightPath = true;
    drawMap();

    if (pathTimer) clearTimeout(pathTimer);
    pathTimer = setTimeout(() => {
      highlightPath = false;
      drawMap();
    },6000);
  }

  //紫（クイズ）
  if (destination === 6){
    //マスによってクイズを変える
    if (newX === 17 && newY === 1){
      const answer = prompt("クイズ①:日本一大きい湖は？");
      if (answer !== "びわこ" && answer !== "琵琶湖"){
        alert("不正解！");
        return;
      }else{
        alert("正解！");
    }
      }else if (newX === 7 && newY === 7){
        const answer = prompt("クイズ②: 琵琶湖には何種類くらいの魚が住んでいる？");
        const num = Number(answer);
        if (num < 40 || num > 60){
          alert("不正解！");
          return;
          }else{
          alert("正解！");
    }
      }else if (newX === 8 && newY === 16){
        const answer = prompt("クイズ③: 琵琶湖の面積は約何平方キロメートル？");
        if (answer !== "670"){
          alert("不正解！");
          return;
        }else{
          alert("正解！");
        }
      }else if (newX === 15 && newY === 17){
        const answer =prompt("クイズ④: 滋賀県出身の戦国武将で、安土城を築いたのは誰？");
        if (answer !== "織田信長"){
          alert("不正解！");
          return;
        }else{
          alert("正解！");
        }
      }

  // 1回正解したらマスを普通の道に
  map[newY][newX] = 0;
  }

  if (destination === 5){
    alert("ゴール！");
    resetMap();
    return;
  }

  if (triggered && map[playerY][playerX] !== 3){
    map[playerY][playerX] = 4;
  }

  playerX = newX;
  playerY = newY;

  drawMap();
}

document.addEventListener("keydown",(e) => {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
});

// 初期化
resetMap();
