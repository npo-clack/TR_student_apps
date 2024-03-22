const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// const imageNames=['Nj4','kaki'];
const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  //追加：スペースキーが押されたときファイア
  if (e.code === 'Space'){
    player.bullets.push({
      x: player.x + player.size / 2 -2,
      y: player.y -10,
      size: 4,
      speed: 6
    });
  }
});

document.addEventListener('keyup',(e) => {
  keys[e.code] = false;
});

let player = {
  x: canvas.width /2,
  y: canvas.height - 30 - 30,
  size:60,
  speed: 4, 
  bullets: [],
  ready: false
};

let enemies = [];
let enemySpawnCounter = 0;
let moveDirection = 1;
let moveDownCounter = 0;
let score = 0;

 let playerImage = new Image();
playerImage.onload = function() {
  console.log('bbb')
  player.image = playerImage;
  player.ready = true;
};
playerImage.src = "Nj4.png";

let enemyImage = new Image();
enemyImage.onload = function() {
  for (const enemy of enemies){
    enemy.image = enemyImage;
    enemy.ready = true;
  }
};
enemyImage.src = "kaki.png";

function drawEnemies(){
  console.log(enemies);
  for (const enemy of enemies) {
    if (enemy.ready) {
      ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.size, enemy.size);
    }
  }
}

function drawBullets() {
  ctx.fillStyle = 'white';
  for ( const bullet of player.bullets){
    console.log(bullet)
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (player.ready) {
    ctx.drawImage(player.image, player.x, player.y, player.size, player.size);
  }

  drawEnemies();
  drawBullets();

  if (keys['ArrowLeft']) {
    player.x -= player.speed;
  }
  if(keys['ArrowRight']) {
    player.x += player.speed;
  }

  for (const bullet of player.bullets) {
    bullet.y -= bullet.speed;
  }
  player.bullets = player.bullets.filter(bullet => bullet.y > 0);

  //弾と敵の衝突の判定
  player.bullets.forEach((bullet) => {
    enemies.forEach((enemy) =>{
      if (
        bullet.x < enemy.x + enemy.size &&
        bullet.x + bullet.size > enemy.x &&
        bullet.y < enemy.y + enemy.size &&
        bullet.y + bullet.size > enemy.y
      ) {
        bullet.toRemove = true;
        enemy.toRemove = true;
        score += 10;
      }
    });
  });

  player.bullets = player.bullets.filter((bullet) => !bullet.toRemove);
  enemies = enemies.filter((enemy) => !enemy.toRemove);

  enemySpawnCounter++;
  if (enemySpawnCounter >= 30) {
    let newEnemy = {
      x: Math.random() * (canvas.width -20),
      y: 10,
      size:40,
      speed: 2,
      ready: false
    };
    newEnemy.image = enemyImage;
    newEnemy.ready = true;
    enemies.push(newEnemy);
    enemySpawnCounter = 0;
  }

  moveDownCounter++;
  if (moveDownCounter >= 60){
    moveDirection = -moveDirection;
    for (const enemy of enemies) {
      enemy.y += 20;
    }
    moveDownCounter = 0;
  }

  for(const enemy of enemies){
    enemy.x += enemy.speed * moveDirection;
  }
  enemies = enemies.filter(enemy => enemy.y < canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("score:" + score, 10, 20);
    requestAnimationFrame(update);

  }
  requestAnimationFrame(update);

  canvas.addEventListener('click', (e) => {
    player.bullets.push({
      x: player.x + player.size / 2 -2,
      size: 4,
      speed: 6
    });
  });
  // Promise.all([playerImage, enemyImage]).then(() => {
  update();
// });