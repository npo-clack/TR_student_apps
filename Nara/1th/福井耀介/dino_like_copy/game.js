// ゲームキャンバスの設定
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

// 画像を読み込む
const dinoImage = new Image();
const cactusImage1 = new Image();
const cactusImage2 = new Image();
const cactusImage3 = new Image();
const backgroundImage = new Image();

// 画像ファイルのパスを指定
dinoImage.src = '犬　いらすと.png'; // 恐竜の画像
cactusImage1.src = './animal car.png'; // 障害物1
cactusImage2.src = './キリン.png'; // 障害物2
cactusImage3.src = './鬼.png'; // 障害物3
backgroundImage.src = '山の背景いらすと.png'; // 背景画像

// ゲームの初期設定
let isJumping = false;
let jumpHeight = 0;
let gravity = 1.0;
let speed = 5;
let score = 0;
let dino = { x: 50, y: 150, width: 40, height: 40 }; // 恐竜
let obstacles = [];

// キー入力を監視して、ジャンプの状態を変更
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
        jumpHeight = 20;  // 初期ジャンプ力
    }
});

// 画像が読み込まれたらゲームを開始する
let imagesLoaded = 0;

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 4) {
        gameLoop(); // すべての画像が読み込まれたらゲームを開始
    }
}

dinoImage.onload = checkImagesLoaded;
cactusImage1.onload = checkImagesLoaded;
cactusImage2.onload = checkImagesLoaded;
cactusImage3.onload = checkImagesLoaded;
backgroundImage.onload = checkImagesLoaded;

// 背景の描画
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 背景画像を描画
}

// 恐竜を描画
function drawDino() {
    if (isJumping) {
        dino.y -= jumpHeight;
        jumpHeight -= gravity;
        if (dino.y >= 150) {
            isJumping = false;
            dino.y = 150; // 地面に戻る
        }
    }

    // 恐竜画像を描画
    ctx.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
}

// 障害物の生成
function createObstacle() {
    const height = Math.random() * (40 - 20) + 20; // 障害物の高さをランダムに設定
    const y = 150 - height; // 障害物のY位置を決定

    let obstacleImage;
    
    // スコアに基づいて障害物の種類を変更
    if (score >= 80) {
        obstacleImage = cactusImage3;  // スコア80以上は障害物3
    } else if (score >= 40) {
        obstacleImage = cactusImage2;  // スコア40以上は障害物2
    } else {
        obstacleImage = cactusImage1;  // スコア40未満は障害物1
    }

    obstacles.push({
        x: canvas.width,
        y: y,
        width: height + 50,
        height: height + 50,
        image: obstacleImage // 障害物画像を設定
    });
}

// 障害物を描画
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed; // 障害物が移動
        ctx.drawImage(obstacles[i].image, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // 障害物が画面外に出たら配列から削除
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score += 10; // スコアを増加
        }
    }
}

// 衝突判定
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        if (
            dino.x + dino.width > obstacles[i].x &&
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.y + dino.height > obstacles[i].y
        ) {
            // 衝突した場合、ゲームオーバー
            alert('Game Over! Score: ' + score);
            resetGame();
        }
    }
}

// ゲームリセット
function resetGame() {
    obstacles = [];
    score = 0;
    dino.y = 150;
    isJumping = false;
}

// ゲームループ
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア

    drawBackground();
    drawDino();
    drawObstacles();
    checkCollision();

    // スコアの表示
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    requestAnimationFrame(gameLoop); // 次のフレームを要求
}

// 障害物を定期的に生成
setInterval(createObstacle, 2000); // 2秒ごとに障害物を生成
