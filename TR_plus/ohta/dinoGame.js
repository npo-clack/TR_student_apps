const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageNames = ['dino', 'bird', 'cactus', 'pteranodon']; // 画像の名前

// グローバルな game オプション
const game = {
  counter: 0,
  backGrounds: [],
  enemys: [],
  bgm1: new Audio('bgm/fieldSong.mp3'), // BGM
  bgm2: new Audio('bgm/jump.mp3'),
  enemyCountdown: 0,
  image: {},
  score: 0,
  state: 'loading',
  timer: null,
  bestScores: JSON.parse(localStorage.getItem('dino_best_scores') || '[]') // 上位の三つスコア
};
game.bgm1.loop = true;
// 複数画像の読み込み
let imageLoadCounter = 0;
for (const imageName of imageNames) {
  const imagePath = `image/${imageName}.png`;
  game.image[imageName] = new Image();
  game.image[imageName].src = imagePath;
  game.image[imageName].onload = () => {
    imageLoadCounter += 1;
    if (imageLoadCounter === imageNames.length) {
      console.log('画像のロードが完了しました。');
      init();
    }
  }
}
// 初期化
function init() {
  game.counter = 0;
  game.enemys = [];
  game.enemyCountdown = 0;
  game.score = 0;
  game.state = 'init';
  // 雲をゆっくり（スタート画面）
  const cloudsEl = document.querySelector('.bg-layer.clouds');
  if (cloudsEl) {
    cloudsEl.style.setProperty('--cloud-duration', '40s');
    cloudsEl.style.setProperty('--cloud-duration-slow', '70s');
  }
  // 画面クリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 恐竜の表示
  createDino();
  drawDino();
  // 背景の描画
  createBackGround();
  drawBackGrounds();
  // 文章の表示
  ctx.fillStyle = 'black';
  ctx.font = 'bold 60px serif';
  ctx.fillText(`Press Space key`, 60, 150);
  ctx.fillText(`to start.`, 150, 230);
  // 上位スコアの表示（開始画面）
  ctx.fillStyle = 'black';
  ctx.font = '18px sans-serif';
  ctx.fillText('TOP SCORES:', canvas.width - 200,60); // 表示位置
  for (let i = 0; i < Math.min(3, game.bestScores.length); i++) {
    ctx.fillText(`${i + 1}. ${game.bestScores[i]}`, canvas.width - 200, 90 + i * 26);
  }
}
// ゲーム開始
function start() {
  game.state = 'gaming';
  game.bgm1.play();
  game.timer = setInterval(ticker, 30);
}

function ticker() {
  // 画面クリア
  ctx.clearRect(0,0, canvas.width, canvas.height);

  // 背景の作成
  if (game.counter % 10 === 0) {
    createBackGround();
  }

  // 敵キャラクターの生成
  createEnemys();

  // 移動
  moveBackGrounds(); // 背景の移動
  moveDino(); // 恐竜の移動
  moveEnemys(); // 敵キャラクターの移動

  // 描画
  drawBackGrounds(); // 背景の描画
  drawDino(); // 恐竜の描画
  drawEnemys(); // 敵キャラクターの描画
  drawScore(); // スコアの描画

  // あたり判定
  hitCheck();

  //　カウンターの更新
  game.score += 1; // スコア
  game.counter = (game.counter + 1) % 1000000;
  game.enemyCountdown -= 1;
}

function createDino() {
  game.dino = {
    x: game.image.dino.width / 2,
    y: canvas.height - game.image.dino.height / 2,
    moveY: 0,
    width: game.image.dino.width,
    height: game.image.dino.height,
    image: game.image.dino
  }
}
// 背景
function createBackGround() {
  game.backGrounds = [];
  for (let x = 0; x <= canvas.width; x += 200) {
    game.backGrounds.push({
      x: x,
      y: canvas.height,
      width: 200,
      moveX: -20,
    });
  }
}
// 敵キャラクター（サボテン）
function createCactus(createX) {
  game.enemys.push({
    x: createX,
    y: canvas.height - game.image.cactus.height / 2, // 開始位置
    width: game.image.cactus.width,
    height: game.image.cactus.height,
    moveX: -10, // 速度
    image: game.image.cactus
  });
}
// プテラノドン
function createPteranodon() {
  const pteranodonY = Math.random() * (250 - game.image.pteranodon.height) + 150;
  game.enemys.push({
    x: canvas.width + (game.image.pteranodon.width * 0.5) / 2,
    y: pteranodonY,
    width: game.image.pteranodon.width * 0.5,
    height: game.image.pteranodon.height * 0.5,
    moveX: -25, // 速度
    image: game.image.pteranodon
  });
}
//　敵キャラクターの速度
function createEnemys() {
  if (game.enemyCountdown === 0) {
    game.enemyCountdown = 60 - Math.floor(game.score / 100);
    if (game.enemyCountdown <= 30) game.enemyCountdown = 30;
    switch (Math.floor(Math.random() * 4)) { // 画像を増やすにつれて数字を増やす
      case 0:
        createCactus(canvas.width + game.image.cactus.width / 2);
        break;
      case 1:
        createCactus(canvas.width + game.image.cactus.width / 2);
        createCactus(canvas.width + game.image.cactus.width * 3 / 2);
        break;
      case 2:
        createPteranodon();
        break;
    }
  }
}

// 背景移動
function moveBackGrounds() {
  for (const backGround of game.backGrounds) {
    backGround.x += backGround.moveX;
  }
}
// 恐竜移動（ジャンプ）
function moveDino() {
  game.dino.y += game.dino.moveY;
  if (game.dino.y >= canvas.height - game.dino.height / 2) {
    game.dino.y = canvas.height - game.dino.height / 2;
    game.dino.moveY = 0;
  } else {
    game.dino.moveY += 3.5;
  }
}
// 敵キャラクター移動
function moveEnemys() {
  for (const enemy of game.enemys) {
    enemy.x += enemy.moveX;
  }
  // 画面の外に出たキャラクターを配列から削除
  game.enemys = game.enemys.filter(enemy => enemy.x > -enemy.width);
}
// 背景の描画 色
function drawBackGrounds() {
  ctx.fillStyle = 'sienna';
  for (const backGround of game.backGrounds) {
    ctx.fillRect(backGround.x, backGround.y - 5, backGround.width, 5);
    ctx.fillRect(backGround.x + 20, backGround.y - 10, backGround.width - 40, 5);
    ctx.fillRect(backGround.x + 50, backGround.y - 15, backGround.width - 100, 5);
  }
}

function drawDino() {
  ctx.drawImage(game.image.dino, game.dino.x - game.dino.width / 2, game.dino.y - game.dino.height / 2);
}
// 敵キャラクターの描画
function drawEnemys() {
  for (const enemy of game.enemys) {
    ctx.drawImage(
      enemy.image, 
      enemy.x - enemy.width / 2, 
      enemy.y - enemy.height / 2,
      enemy.width,
      enemy.height
    );
  }
}
// スコア
function drawScore() {
  // 現在のスコアの表示（左上）
  ctx.fillStyle = 'black';
  ctx.font = '30px serif';
  ctx.fillText(`SCORE: ${game.score}`, 0, 30,);
  // 上位スコアの表示（右上）(プレイ中)
  ctx.fillStyle = 'black';
  ctx.font = '25px sans-serif';
  ctx.fillText('TOP SCORES:', canvas.width - 200,30); // 表示位置
  for (let i = 0; i < Math.min(3,game.bestScores.length); i++) {
    ctx.fillText(`${i + 1}. ${game.bestScores[i]}`, canvas.width - 200, 60 + i * 22); // 順位の位置 間隔
  }
}
// 当たり判定　ダメージ
function hitCheck() {
  for (const enemy of game.enemys) {
    if (
      Math.abs(game.dino.x - enemy.x) < game.dino.width * 0.8 / 2 + enemy.width * 0.9 / 2 &&
      Math.abs(game.dino.y - enemy.y) < game.dino.height * 0.8 / 2 + enemy.height * 0.9 / 2
    ) {
      // ゲームオーバー処理(最初に一度だけ上位スコアの更新そして保存
      if (game.state !== 'GAMEOVER') {
        // 順列
        game.bestScores.push(game.score);
        game.bestScores.sort((a, b) => b -a);
        game.bestScores = game.bestScores.slice(0, 3); // 上位三つだけ保存
        localStorage.setItem('dino_best_scores', JSON.stringify(game.bestScores));
      }
      game.state = 'GAMEOVER';
      game.bgm1.pause();
      ctx.fillStyle = 'black';
      ctx.font = 'bold 100px serif';
      ctx.fillText(`Game Over!`, 150, 250); // ゲームオーバーの文字サイズ
      clearInterval(game.timer);
      // ゲームオーバー画面でも上位スコアの表示
      ctx.font = 'bold 30px serif';
      ctx.fillText(`SCORE: ${game.score}`,150 ,300);
      ctx.fillText(`TOP SCORES:`, 150, 330);
      for (let i = 0; i < Math.min(3, game.bestScores.length); i++) {
        ctx.fillText(`${i + 1}. ${game.bestScores[i]}`, 150, 360 + i * 28);
      }
    }
  }
}

document.onkeydown = function(e) {
  if(e.code === 'Space' && game.state === 'init') {
    start();
  } // ジャンプBGM
  if(e.code === 'Space' && game.dino.moveY === 0) {
    game.dino.moveY = -41;
    game.bgm2.play(); // ジャンプBGM
  }
  if (e.code === 'Enter' && game.state === 'GAMEOVER') {
    init(); // もう一度遊ぶ
  }
};
