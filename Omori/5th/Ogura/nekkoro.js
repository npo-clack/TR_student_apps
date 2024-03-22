const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageNames = ['24851338', 'bird', 'cactus', 'dino'];
const game = {
  counter: 0,
  backGrounds: [],
  bgm1: new Audio('bgm/fieldSong.mp3'),
  bgm2: new Audio('bgm/jump.mp3'),
  bgm3:new Audio('bgm/kansei.mp3'),
  bgm4:new Audio('bgm/sippai.mp3'),
  enemys: [],
  enemyCountdown: 0,
  image: {},
  isGameOver: true,
  score: 0,
  state: 'loading',
  timer: null
};
game.bgm1.loop = true;
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
  };
}

function init() {
  game.counter = 0;
  game.enemys = [];
  game.enemyCountdown = 0;
  game.score = 0;
  game.state = 'init';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createDino();
  drawDino();
  createBackGround();
  drawBackGrounds();
  ctx.fillStyle = 'black';
  ctx.font = 'bold 60px serif';
  ctx.fillText(`Press Space key to start.`, 60, 150);
  ctx.fillText(`Wait till 2000`, 150, 230);
}

function start() {
  game.state = 'gaming';
  game.bgm1.play();
  game.timer = setInterval(ticker, 30);
}

function ticker() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (game.counter % 10 === 0) {
    createBackGround();
  }
  createEnemys();
  moveBackGrounds();
  moveDino();
  moveEnemys();
  drawBackGrounds();
  drawDino();
  drawEnemys();
  drawScore();
  hitCheck();
  game.score += 1;
  game.counter = (game.counter + 1) % 1000000;
  game.enemyCountdown -= 1;
  if(game.score>=2001){endGame();}
}
function endGame() {
  game.state = 'Game Clear';
  game.bgm1.pause();
  game.bgm3.play();
  ctx.fillStyle = 'black';
  ctx.font = 'bold 100px serif';
  ctx.fillText(`Game Clear!`, 150, 200);
  clearInterval(game.timer);
}
function createDino() {
  game.dino = {
    x: game.image.dino.width / 2,
    y: canvas.height - game.image.dino.height / 2,
    moveY: 0,
    width: game.image.dino.width,
    height: game.image.dino.height,
    image: game.image.dino
  };
}

function createBackGround() {
  game.backGrounds = [];
  for (let x = 0; x <= canvas.width; x += 200) {
    game.backGrounds.push({
      x: x,
      y: canvas.height,
      width: 200,
      height: 30,
      moveX: -20
    });
  }
}
function createBird() {
  const birdY = Math.random() * (300 - game.image.bird.height) + 150;
  game.enemys.push({
    x: canvas.width + game.image.bird.width/2,
    y: birdY,
    width: game.image.bird.width,
    height: game.image.bird.height,
    moveX: -15,
    image: game.image.bird
  });
}
function createCactus(createX) {
  game.enemys.push({
    x: createX,
    y:canvas.height- game.image.cactus.height/2,
    width: game.image.cactus.width,
    height: game.image.cactus.height,
    moveX: -10,
    image: game.image.cactus

  });
}
function create24851338(createX) {
  let y = canvas.height-game.image['24851338'].height / 1.2;
  game.enemys.push({
  x: createX,
    y:y,
    width: game.image['24851338'].width,
    height: game.image['24851338'].height,
    moveX: -13,
    moveY:0,
    image: game.image['24851338']
  });
  game.enemyCountdown = 60;
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -6;}},1100);
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(1000>game.score&&game.score>490&&lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -12;}},550);
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(1500>game.score&&game.score>=1000&&lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -15;}},400);
setTimeout(()=>{const lastEnemyIndex = game.enemys.length - 1;if(game.score>=1500&&lastEnemyIndex>=0){game.enemys[lastEnemyIndex].moveY = -16;}},170);}
function moveBackGrounds() {
  for (const backGround of game.backGrounds) {
    backGround.x += backGround.moveX;
  }
}
function createEnemys() {
  if (game.score<1000&&game.score>=0&&game.enemyCountdown === 0) {
    game.enemyCountdown = 60 - Math.floor(game.score / 100);
    const randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        createCactus(canvas.width + game.image.cactus.width / 2);
        break;
      case 1:
        createCactus(canvas.width + game.image.cactus.width / 2);
        createCactus(canvas.width + game.image.cactus.width * 3 / 2);
        break;
      case 2:
        createBird();
        break;
      case 3:
        create24851338(canvas.width + game.image.cactus.width / 9);
        break;
    }
  }
  if (game.score>=1000&&game.enemyCountdown === 0) {
    game.enemyCountdown = 60 - Math.floor(game.score / 61);
    const randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        createCactus(canvas.width + game.image.cactus.width / 2);
        break;
      case 1:
        createCactus(canvas.width + game.image.cactus.width / 2);
        createCactus(canvas.width + game.image.cactus.width * 3 / 2);
        break;
      case 2:
        createBird();
        break;
      case 3:
        create24851338(canvas.width + game.image.cactus.width / 9);
        break;
    }
  }
}

function moveDino() {
  game.dino.y += game.dino.moveY;
  if (game.dino.y >= canvas.height - game.dino.height / 2) {
    game.dino.y = canvas.height - game.dino.height / 2;
    game.dino.moveY = 0;
  } else {
    game.dino.moveY += 3;
  }
}
function moveEnemys() {
  for (const enemy of game.enemys) {
  if(game.score>=1500){enemy.x+=enemy.moveX-35}
    else if (game.score >= 1000) {
      enemy.x += enemy.moveX - 15;
    }
  else if (game.score >= 500) {
      enemy.x += enemy.moveX - 10;
    } else {
      enemy.x += enemy.moveX;
    }
   if(enemy.image === game.image['24851338']) {enemy.y+=enemy.moveY;}
  }
  game.enemys = game.enemys.filter(enemy => enemy.x > -enemy.width);
}

function drawBackGrounds() {
  ctx.fillStyle = 'sienna';
  for (const backGround of game.backGrounds) {
    ctx.fillRect(backGround.x, backGround.y - 5, backGround.width, 5);
    ctx.fillRect(backGround.x+ 20, backGround.y - 10, backGround.width - 40, 5);
    ctx.fillRect(backGround.x + 50, backGround.y - 15, backGround.width - 100, 5);
  }
}

function drawDino() {
  ctx.drawImage(game.image.dino, game.dino.x - game.dino.width / 2, game.dino.y - game.dino.height / 2);
}

function drawEnemys() {
  for (const enemy of game.enemys) {
    ctx.drawImage(enemy.image, enemy.x - enemy.width / 2, enemy.y - enemy.height / 2);
  }
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '24px serif';
  ctx.fillText(`score:${game.score}`, 0, 30);
}

function hitCheck() {
  for (const enemy of game.enemys) {
    if (Math.abs(game.dino.x - enemy.x) < game.dino.width * 0.8 / 2 + enemy.width * 0.9 / 2 &&
      Math.abs(game.dino.y - enemy.y) < game.dino.height * 0.5 / 2 + enemy.height * 0.9 / 2) {
      game.state = 'gameover';
      game.bgm1.pause();
      game.bgm4.play();
      ctx.fillStyle = 'black';
      ctx.font = 'bold 100px serif';
      ctx.fillText(`Game Over!`, 150, 200);
      clearInterval(game.timer);
    }
  }
}

document.onkeydown = function (e) {
  if (e.key === ' ' && game.state === 'init') {
    start();
  }
  if (e.key === ' ' && game.dino.moveY === 0) {
    game.dino.moveY = -41;
    game.bgm2.play();
  }
  if (e.key === 'Enter' && game.state === 'gameover') {
    init();}
  if (e.key === 'Enter' && game.state === 'Game Clear') {
      init();
  }
};


