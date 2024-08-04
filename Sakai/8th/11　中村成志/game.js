const canvas = document.getElementById('canvas');
if (!canvas) {
    throw new Error('Canvas element not found!');
}
canvas.width = 768;
canvas.height = 672;

const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Canvas context not found!');
}
ctx.fillStyle = "skyblue";
ctx.fillRect(0, 0, 768, 672);

// game.js
document.addEventListener('DOMContentLoaded', (event) => {
    const startScreen = document.getElementById('startScreen');
    const gameContent = document.getElementById('gameContent');
    const bgm = document.getElementById('bgm');

    // エンターキーの押下を検出するイベントリスナー
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // スタート画面を非表示にしてゲームコンテンツを表示
            startScreen.style.display = 'none';
            gameContent.style.display = 'flex';

            // BGMを再生
            bgm.volume = 0.5; // 音量を設定（0.0 - 1.0の範囲）
            bgm.play().catch(error => {
                console.error('自動再生エラー:', error);
                alert('音楽の再生に問題があります。');
            });

            // ゲームの初期化関数を呼び出す（ここにゲーム開始のコードを追加）
            startGame();
        }
    });
});

const character = new Image();
const characterFlipped = new Image();
const mushroom = new Image();
const bigMario = new Image();
const bigMarioFlipped = new Image();
const flower = new Image();
const fireMario = new Image();
const fireMarioFlipped = new Image();
const marioJump = new Image();
const fireMarioJump = new Image();
const bigMarioJump = new Image();
const marioJumpFlipped = new Image();
const fireMarioJumpFlipped = new Image();
const bigMarioJumpFlipped = new Image();
const fireBallImage = new Image();
const fireball = new Image();
const goomba = new Image();
const goombaFlipped = new Image();
const goombaStomped = new Image();
const marioDeath = new Image(); // マリオの死亡画像
const Ground = new Image();
const pipe = new Image();
const background = new Image();
const questionblock = new Image();
const questionblock2 = new Image();
const gameOverMusic = new Audio('ゲームオーバー.mp3'); // ゲームオーバー用の音楽ファイルのパス
gameOverMusic.preload = 'auto'; // 音楽ファイルを事前に読み込む
gameOverMusic.volume = 0.5; // 音量設定

let characterX = 100; // 初期位置X
let characterY = 600 - 48; // 初期位置Y (キャラクターの底辺がY600になるように設定)
let characterWidth = 36; // キャラクターの幅
let characterHeight = 48; // キャラクターの高さ
const gravity = 5; // 重力加速度を増加
const maxJumpHeight = 100; // 最大ジャンプの高さ
let isJumping = false; // ジャンプ中かどうかを示すフラグ
let isJumping2 = false; // ジャンプ中かどうかを示すフラグ
let jumpStartTime = 0; // ジャンプ開始時間を追跡する変数
let jumpHeight = 0; // 現在のジャンプの高さを記録する変数
let jumpDuration = 0; // ジャンプの時間を記録する変数
const keys = {}; // 押されているキーの状態を管理するオブジェクト
let isDashing = false; // ダッシュ中かどうかを示すフラグ
let isFacingRight = true; // キャラクターの向きを追跡するフラグ
let lastPressedKey = null; // 最後に押されたキーを追跡する変数
let isBig = false; // キャラクターが大きいかどうかを追跡
let isFlower = false; // ファイヤーマリオ状態を追跡
let mushroomX = 200; // キノコの初期位置X
let mushroomY = 600 - 36; // キノコの底辺がY600になるように設定
let mushroomWorldX = 200
let isMushroomVisible = true; // キノコの表示状態を管理するフラグ
let flowerX = 300; // フラワーの初期位置X
let flowerY = 600 - 36; // フラワーの底辺がY600になるように設定
let flowerWorldX = 300
let isFlowerVisible = true; // フラワーの表示状態を管理するフラグ
let isGameOver = false; // ゲームオーバーの状態を管理するフラグ
let deathAnimationY = 0; // 死亡アニメーションのY座標
const deathAnimationSpeed = 2; // 死亡アニメーションの落下速度
const deathAnimationDuration = 2000; // 死亡アニメーションの継続時間（ミリ秒）
let isFiring = false; // ファイヤー状態
let fireballX = 0;  // ファイヤーボールのX座標
let fireballY = 0;  // ファイヤーボールのY座標
let fireballAngle = 225;  // ファイヤーボールの角度
let isFireBallActive = false; // ファイヤーボールがアクティブかどうか
let goombaInvincibilityTime = 0; // クリボーの無敵時間を管理する変数
const fireBallSpeed = 5; // ファイヤーボールの移動速度
let GroundX = 0
let GroundY = 600
let pipeX = 1453
let pipeY = 504
let pipeWorldX = 1453
let backgroundX = 0
let backgroundY = 0
let backgroundWidth = 9120
let questionblockX = 525
let questionblockWorldX = 525
let questionblockY = 250
let questionblockX2 = 477
let questionblockWorldX2 = 477
let questionblockY2 = 350

// クリボーの設定
let goombaX = 500; // クリボーの初期位置X
let goombaWorldX = 500; // 世界内の絶対位置
let goombaY = 600 - 48; // クリボーの底辺がY600になるように設定
let goombaDirection = 1; // クリボーの移動方向、1は右、-1は左
let goombaSpeed = 0.5; // クリボーの移動速度
let isGoombaFlipped = false; // クリボーの向きを管理するフラグ
let isGoombaStomped = false; // クリボーが踏まれた状態を管理するフラグ
let ischaracterdeath = false; // キャラクターが死亡したかどうかを追跡

// 壁の設定（透明）
const walls = [
    { x: -50, y: 0, width: 50, height: 672 }, // 左壁
];

const normalSpeed = 2; // 通常の移動速度
const dashSpeed = 4; // ダッシュ時の移動速度

let imagesLoaded = 0;

function onLoadCallback() {
    imagesLoaded++;
    if (imagesLoaded === 12) { // 画像の数が12なので、12で比較する
        updatePosition();
    }
}

character.onload = onLoadCallback;
character.src = "images/マリオ.png";

characterFlipped.onload = onLoadCallback;
characterFlipped.src = "images/マリオ 反転.png";

mushroom.onload = onLoadCallback;
mushroom.src = "images/キノコ.png";

flower.onload = onLoadCallback;
flower.src = "images/フラワー.png";

bigMario.onload = onLoadCallback;
bigMario.src = "images/デカマリオ.png";

bigMarioFlipped.onload = onLoadCallback;
bigMarioFlipped.src = "images/デカマリオ 反転.png";

fireMario.onload = onLoadCallback;
fireMario.src = "images/フャイヤーマリオ.png";

fireMarioFlipped.onload = onLoadCallback;
fireMarioFlipped.src = "images/フャイヤーマリオ 反転.png";
fireMarioJumpFlipped.width = 51;  // 幅
fireMarioJumpFlipped.height = 96; // 高さ

marioJump.onload = onLoadCallback;
marioJump.src = "images/マリオジャンプ.png";
marioJump.width = 48;  // 幅
marioJump.height = 48; // 高さ

fireMarioJump.onload = onLoadCallback;
fireMarioJump.src = "images/ファイヤーマリオジャンプ.png";
fireMarioJump.width = 51;  // 幅
fireMarioJump.height = 96; // 高さ

bigMarioJump.onload = onLoadCallback;
bigMarioJump.src = "images/デカマリオジャンプ.png";
bigMarioJump.width = 51;  // 幅
bigMarioJump.height = 96; // 高さ

marioJumpFlipped.onload = onLoadCallback;
marioJumpFlipped.src = "images/マリオジャンプ 反転.png";
marioJumpFlipped.width = 48;  // 幅
marioJumpFlipped.height = 48; // 高さ

fireMarioJumpFlipped.onload = onLoadCallback;
fireMarioJumpFlipped.src = "images/ファイヤーマリオジャンプ 反転.png";
bigMarioJumpFlipped.width = 51;  // 幅
bigMarioJumpFlipped.height = 96; // 高さ

bigMarioJumpFlipped.onload = onLoadCallback;
bigMarioJumpFlipped.src = "images/デカマリオジャンプ 反転.png";
bigMarioJumpFlipped.width = 51;  // 幅
bigMarioJumpFlipped.height = 96; // 高さ

fireball.src = "images/ファイヤー.png";
fireball.width = 30;  // 幅
fireball.height = 30; // 高さ

fireBallImage.src = "images/ファイヤー.png";
fireBallImage.width = 30;  // 幅
fireBallImage.height = 30; // 高さ

goomba.onload = onLoadCallback;
goomba.src = "images/クリボー.png";

goombaFlipped.onload = onLoadCallback;
goombaFlipped.src = "images/クリボー 反転.png";

goombaStomped.onload = onLoadCallback;
goombaStomped.src = "images/クリボー 踏まれた.png";

marioDeath.onload = onLoadCallback; // マリオ死亡画像の読み込み
marioDeath.src = "images/マリオ 死亡.png";

// Ground.onload = onLoadCallback;
// Ground.src = "images/地面.png";

pipe.onload = onLoadCallback;
pipe.src = "images/土管.png";

background.onload = onLoadCallback;
background.src = "images/背景.png";

questionblock.onload = onLoadCallback;
questionblock.src = "images/ハテナブロック.png";

questionblock2.onload = onLoadCallback;
questionblock2.src = "images/ハテナブロック2.png";

// 0.5秒ごとにクリボーの画像を切り替えるタイマー
setInterval(() => {
    if (!isGoombaStomped) {
        isGoombaFlipped = !isGoombaFlipped;
    }
}, 500);

function drawCharacter(x, y) {
    if (ischaracterdeath) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
         // 背景画像を描画
         ctx.drawImage(background, backgroundX, backgroundY, 9120, 672);
        
         // 地面を描画
         ctx.drawImage(Ground, GroundX, GroundY, 768, 72);
         
         // パイプを描画
         ctx.drawImage(pipe, pipeX, pipeY, 96, 96);
          
        ctx.drawImage(marioDeath, x, y + (characterHeight - 48), 48, 48); // 死亡画像を描画 (幅48、高さ48、Y座標を調整)
        // 「Game Over」メッセージの表示
        ctx.font = '48px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        return; // アニメーションを停止
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 背景を再描画

let backgroundToDraw = background;
        ctx.drawImage(background,backgroundX,backgroundY,9120,672)
        
    // キノコが表示されているときのみ描画
    if (isMushroomVisible) {
        ctx.drawImage(mushroom, mushroomX, mushroomY, 36, 36);
    }

    // フラワーが表示されているときのみ描画
    if (isFlowerVisible) {
        ctx.drawImage(flower, flowerX, flowerY, 36, 36);
    }

    // 適切なキャラクター画像を選択
    let characterToDraw = character;
let characterToDrawFlipped = characterFlipped;

if (isFlower) {
    if (isJumping) {
        characterToDraw = fireMarioJump;
        characterToDrawFlipped = fireMarioJumpFlipped;
    } else {
        characterToDraw = fireMario;
        characterToDrawFlipped = fireMarioFlipped;
    }
    characterWidth = 48; // ファイヤーマリオの幅
    characterHeight = 96; // ファイヤーマリオの高さ
    // ファイヤーボールの発射の状態を確認
    if (isFireBallActive) {
        // ファイヤーボールを描画
        ctx.save();
        ctx.translate(fireballX + 12, fireballY + 12); // ファイヤーボールの中心に合わせる
        ctx.rotate(fireballAngle * Math.PI / 180); // 回転
        ctx.drawImage(fireBallImage, -12, -12, 24, 24); // ファイヤーボールを描画
        ctx.restore();
    }
} else if (isBig) {
    if (isJumping) {
        characterToDraw = bigMarioJump;
        characterToDrawFlipped = bigMarioJumpFlipped;
    } else {
        characterToDraw = bigMario;
        characterToDrawFlipped = bigMarioFlipped;
    }
    characterWidth = 48; // 大きいキャラクターの幅
    characterHeight = 96; // 大きいキャラクターの高さ
} else {
    if (isJumping) {
        characterToDraw = marioJump;
        characterToDrawFlipped = marioJumpFlipped;
    }
    characterWidth = 36; // 通常キャラクターの幅
    characterHeight = 48; // 通常キャラクターの高さ
}   

if (isFlower) {
    if (isJumping2) {
        characterToDraw = fireMarioJump;
        characterToDrawFlipped = fireMarioJumpFlipped;
    } else {
        characterToDraw = fireMario;
        characterToDrawFlipped = fireMarioFlipped;
    }
    characterWidth = 48; // ファイヤーマリオの幅
    characterHeight = 96; // ファイヤーマリオの高さ
    // ファイヤーボールの発射の状態を確認
    if (isFireBallActive) {
        // ファイヤーボールを描画
        ctx.save();
        ctx.translate(fireballX + 12, fireballY + 12); // ファイヤーボールの中心に合わせる
        ctx.rotate(fireballAngle * Math.PI / 180); // 回転
        ctx.drawImage(fireBallImage, -12, -12, 24, 24); // ファイヤーボールを描画
        ctx.restore();
    }
} else if (isBig) {
    if (isJumping2) {
        characterToDraw = bigMarioJump;
        characterToDrawFlipped = bigMarioJumpFlipped;
    } else {
        characterToDraw = bigMario;
        characterToDrawFlipped = bigMarioFlipped;
    }
    characterWidth = 48; // 大きいキャラクターの幅
    characterHeight = 96; // 大きいキャラクターの高さ
} else {
    if (isJumping2) {
        characterToDraw = marioJump;
        characterToDrawFlipped = marioJumpFlipped;
    }
    characterWidth = 36; // 通常キャラクターの幅
    characterHeight = 48; // 通常キャラクターの高さ
}   

    if (isFacingRight) {
        ctx.drawImage(characterToDraw, x, y, characterWidth, characterHeight); // キャラクターを描画
    } else {
        ctx.drawImage(characterToDrawFlipped, x, y, characterWidth, characterHeight); // 反転キャラクターを描画
    }

    // クリボーの描画
    if (isGoombaStomped) {
        ctx.drawImage(goombaStomped, goombaX, goombaY + 24, 48, 24); // 踏まれた状態のクリボーを描画
    } else {
        ctx.drawImage(isGoombaFlipped ? goombaFlipped : goomba, goombaX, goombaY, 48, 48); // 通常状態のクリボーを描画
    }

    // let GroundToDraw = Ground;
    //     ctx.drawImage(Ground, GroundX, GroundY, 768, 72);

    let pipeToDraw = pipe;
        ctx.drawImage(pipe,pipeX,pipeY,96,96)

    let questionblockToDraw = questionblock;
        ctx.drawImage(questionblock,questionblockX,questionblockY,48,48);
        
    let questionblockToDraw2 = questionblock2;
        ctx.drawImage(questionblock2,questionblockX2,questionblockY2,144,48);

    // マリオが死亡している場合の描画
    if (ischaracterdeath) {
        ctx.drawImage(marioDeath, x, y + (characterHeight - 48), 48, 48); // 死亡画像を描画 (幅48、高さ48、Y座標を調整)
        ctx.font = "48px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2); // ゲームオーバーのメッセージ
        return; // アニメーションを停止
    }
}



function updatePosition() {
    if (ischaracterdeath) {
        drawCharacter(characterX, characterY); // キャラクターの死亡状態を描画
        bgm.pause(); // BGMを停止
        bgm.currentTime = 0; // BGMの再生位置をリセット（最初に戻す）

        if (gameOverMusic.paused) {
            gameOverMusic.play(); // ゲームオーバーの音楽を再生
        }

        return; // これ以上の処理をしない
    }

    const step = isDashing ? dashSpeed : normalSpeed; // ダッシュ中かどうかで移動速度を変える

    // 左端の制限
    const leftBoundary = 0;
    // 右端の制限（画面幅からマリオの幅を引いた値）
    const rightBoundary = 600;

    let backgroundMove = 0; // 背景の移動量を記録
    
    if (lastPressedKey === 'a') {
        if (characterX > 0) {
            characterX -= step;
            if (backgroundX < 0) {
                backgroundX += step / 2; // 背景を右に動かす（半分の速度で）
                backgroundX += backgroundMove;
            }
        }
        isFacingRight = false;
    }
    if (lastPressedKey === 'd') {
        characterX += step;
        if (characterX > 250) {
        if (backgroundX > -(backgroundWidth - canvas.width)) {
            backgroundX -= step / 2; // 背景を左に動かす（半分の速度で）
            backgroundX += backgroundMove;
        }
        isFacingRight = true;
    }
}
    // 背景の位置を制限
    backgroundX = Math.min(0, Math.max(-(backgroundWidth - canvas.width), backgroundX));
    
    // クリボーの世界内位置を更新
    goombaWorldX += goombaDirection * goombaSpeed;

    // // クリボーの画面内位置を更新
    goombaX = goombaWorldX + backgroundX;

    // 土管の画面内位置を更新
    pipeX = pipeWorldX + backgroundX;

    // ハテナブロックの画面内位置を更新
    questionblockX = questionblockWorldX + backgroundX;

    // ハテナブロック2の画面内位置を更新
    questionblockX2 = questionblockWorldX2 + backgroundX;

    // キノコの画面内位置を更新
    mushroomX = mushroomWorldX + backgroundX;

    // キノコの画面内位置を更新
    flowerX = flowerWorldX + backgroundX;

    // マリオとキノコの衝突判定
    if (isMushroomVisible && characterX < mushroomX + 36 && characterX + characterWidth > mushroomX && characterY < mushroomY + 36 && characterY + characterHeight > mushroomY) {
        isMushroomVisible = false; // キノコを消す
        isBig = true; // マリオが大きくなる
        characterY = (600 - 96); // 大きいマリオの高さ分だけ地面の位置を調整
    }

    // マリオとフラワーの衝突判定
    if (isFlowerVisible && characterX < flowerX + 36 && characterX + characterWidth > flowerX && characterY < flowerY + 36 && characterY + characterHeight > flowerY) {
        isFlowerVisible = false; // フラワーを消す
        isFlower = true; // ファイヤーマリオに変わる
        characterY = (600 - 96); // ファイヤーマリオの高さ分だけ地面の位置を調整
    }

    // ファイヤーボールの動作
    if (isFireBallActive) {
        const radian = (fireballAngle * Math.PI) / 180;
        fireballX += fireBallSpeed * Math.cos(radian);
        fireballY -= fireBallSpeed * Math.sin(radian);

        if (fireballY >= 600 - 48) { // 地面に当たった場合
            isFireBallActive = false;
        }
    }

    // 画面の更新と描画
    drawCharacter(characterX, characterY);

    if (isFireBallActive) {
        // ファイヤーボールの描画
        ctx.save();
        ctx.translate(fireballX + 12, fireballY + 12); // ファイヤーボールの中心に合わせる
        ctx.rotate(fireballAngle * Math.PI / 180); // 回転
        ctx.drawImage(fireBallImage, -12, -12, 24, 24); // ファイヤーボールを描画
        ctx.restore();
    }

    // マリオとクリボーの衝突判定
if (characterX < goombaX + 48 && characterX + characterWidth > goombaX && 
    characterY < goombaY + 48 && characterY + characterHeight > goombaY && 
    goombaInvincibilityTime === 0) { // 無敵時間中でない場合のみ判定

    const marioBottom = characterY + characterHeight;
    const goombaTop = goombaY + 10; // クリボーの上部に少し余裕を持たせる

    if (marioBottom <= goombaTop && characterY + characterHeight > goombaY) {
        // マリオがクリボーの上から衝突した場合
        isGoombaStomped = true;
        goombaInvincibilityTime = 30; // 30フレーム（約0.5秒）の無敵時間
        // characterY = 100
        isJumping2 = true
        
        // クリボーを踏んだ効果音を再生するなどの処理をここに追加

        // クリボーを踏んだ後、短い遅延を置いてから消す
        setTimeout(() => {
            isGoombaStomped = false;
            goombaWorldX = -100; // 画面外に移動
        }, 10); // 100ミリ秒後に消す
    } else if (!isGoombaStomped) {
        // マリオがクリボーの横から衝突した場合
        ischaracterdeath = true; // マリオの死亡状態にする
    }
}

// クリボーの状態更新
if (isGoombaStomped) {
    goombaInvincibilityTime--;
    if (goombaInvincibilityTime <= 0) {
        isGoombaStomped = false;
        goombaX = -100; // 画面外に移動
    }
}

    // クリボーの移動
    if (!isGoombaStomped) {
        goombaX += goombaDirection * goombaSpeed;
         // クリボーの移動範囲を制限（例：世界内の500から700の間）
    if (goombaWorldX < 500 || goombaWorldX > 700) {
        goombaDirection *= -1; // 方向を反転
    }
    }

    // マリオと壁の衝突判定
    for (const wall of walls) {
        if (characterX < wall.x + wall.width &&
            characterX + characterWidth > wall.x &&
            characterY < wall.y + wall.height &&
            characterY + characterHeight > wall.y) {
            // 衝突が検出された場合、キャラクターの位置を戻す
            if (lastPressedKey === 'a') {
                characterX += step;
            } else if (lastPressedKey === 'd') {
                characterX -= step;
            }
        }
    }

    if (isJumping) {
        const currentTime = Date.now();
        const jumpElapsed = currentTime - jumpStartTime;
        jumpDuration = jumpElapsed / 5; // ジャンプの経過時間を計算（速くなるように変更）

        // スペースキーを押している時間によってジャンプの高さを調整（最大100）
        jumpHeight = Math.min(maxJumpHeight, jumpDuration);
        characterY = (isBig || isFlower ? 600 - 96 : 600 - 48) - jumpHeight;

        if (jumpHeight >= maxJumpHeight || !keys['j'] || jumpDuration > 2000) { // 最大ジャンプの高さに達したら、またはスペースキーが離されたら、またはジャンプの時間が2秒を超えたら
            isJumping = false;
        }
    } else {
        characterY += gravity;
        if (characterY >= (isBig || isFlower ? 600 - 96 : 600 - 48)) { // 地面の位置に到達したら
            characterY = (isBig || isFlower ? 600 - 96 : 600 - 48); // 地面の位置に固定する
        }
    }

    if (isJumping2) {
        const currentTime = Date.now();
        const jumpElapsed = currentTime - jumpStartTime;
        jumpDuration = jumpElapsed / 1; // ジャンプの経過時間を計算（速くなるように変更）

        // スペースキーを押している時間によってジャンプの高さを調整（最大100）
        jumpHeight = 150;
        characterY = (isBig || isFlower ? 600 - 96 : 600 - 48) - jumpHeight;

        if (jumpHeight >= maxJumpHeight || !keys['j'] || jumpDuration > 2000) { // 最大ジャンプの高さに達したら、またはスペースキーが離されたら、またはジャンプの時間が2秒を超えたら
            isJumping2 = false;
        }
    } else {
        characterY += gravity;
        if (characterY >= (isBig || isFlower ? 600 - 96 : 600 - 48)) { // 地面の位置に到達したら
            characterY = (isBig || isFlower ? 600 - 96 : 600 - 48); // 地面の位置に固定する
        }
    }

    drawCharacter(characterX, characterY);

    requestAnimationFrame(updatePosition);
}

// クリボーの無敵時間を更新
if (goombaInvincibilityTime > 0) {
    goombaInvincibilityTime--;
}

drawCharacter(characterX, characterY);

requestAnimationFrame(updatePosition);

function startGame() {
    // ゲームの初期化コード
    console.log('ゲーム開始');
    // ここにゲームの初期化やメインループの開始コードを追加

    // // BGMの設定
    // bgm.preload = 'auto'; // 音楽ファイルを事前に読み込む
    // bgm.loop = true; // ループ再生
    // bgm.volume = 0.5; // 音量設定
    // bgm.play();

   // ゲームオーバー用の音楽ファイルの設定
   gameOverMusic.preload = 'auto'; // 音楽ファイルを事前に読み込む
   gameOverMusic.volume = 0.5; // 音量設定
}

window.addEventListener('keydown', function(event) {
    if (ischaracterdeath) return; // ゲームオーバー状態でのキーイベントを無視

    keys[event.key] = true;

    if (event.key === 'a' || event.key === 'd') {
        lastPressedKey = event.key;
    }

    if (event.key === 'l') {
        if (event.repeat) return; // 長押しを検出
        isDashing = true;
    }

    if (event.key === 'j' && !isJumping && characterY >= (isBig ? 600 - 96 : 600 - 48)) {
        isJumping = true;
        jumpStartTime = Date.now();
        jumpHeight = 0; // ジャンプの高さをリセット
    }
    // if (event.key === 'j' && !isJumping2 && characterY >= (isBig ? 600 - 96 : 600 - 48)) {
    //     isJumping2 = true;
    //     jumpStartTime = Date.now();
    //     jumpHeight = 0; // ジャンプの高さをリセット
    // }
});

    

window.addEventListener('keyup', function(event) {
    if (ischaracterdeath) return; // ゲームオーバー状態でのキーイベントを無視

    keys[event.key] = false;
    
    if (event.key === 'a' || event.key === 'd') {
        if (lastPressedKey === event.key) {
            lastPressedKey = null; // 同じキーが離された場合、追跡を解除
        }
    }

    if (event.key === 'l') {
        if (event.key === 'l' && isFlower) { // Lボタンが離されたとき
            isDashing = false; // ダッシュ状態を解除
        }
    }

    if (event.key === 'j' && isJumping) {
        // スペースキーを離すと、ジャンプが停止し、自然に落下します
        isJumping = false;
    }
});

// ファイヤーボールの発射
document.addEventListener('keydown', function(event) {
    if (event.key === 'l' && isFlower && !isFireBallActive) { // Lボタンを短押ししている場合
        isFireBallActive = true;
        fireballX = characterX + (isFacingRight ? 24 : -24); // キャラクターの中心から少し前に設定
        fireballY = characterY + 24; // キャラクターの中心から少し上に設定
        fireballAngle = isFacingRight ? 330 : 225; // 向きによって角度を設定
    }
});
