
// ゲームエリアの要素を取得
const gameArea = document.getElementById('gameArea');
const result = document.getElementById('result');
const instructions = document.getElementById('instructions');

// ゲームの開始時間と色が変わるまでのタイマーIDを保存する変数
let startTime, timeoutId;
let gameStarted = false;
let isWaiting = false;

// ゲームをリセットする関数
function resetGame() {
gameArea.style.backgroundColor = 'lightgray';
gameArea.textContent = 'START';
instructions.textContent = 'クリックしてスタート';
result.textContent = '';
gameStarted = false;
isWaiting = false;
}

// ゲーム開始時に呼ばれる関数
function startGame() {

// ランダムな時間(2秒～5秒の間)で色を変える
const randomTime = Math.random() * 3000 + 2000;
gameArea.textContent = 'Waiting...';
instructions.textContent = '色が変わったらクリックしてください';
isWaiting = true;
timeoutId = setTimeout(() => {
gameArea.style.backgroundColor = 'green';
gameArea.textContent = 'CLICK';
startTime = Date.now();
gameStarted = true;
isWaiting = false;
}, randomTime);
}

// ゲームエリアがクリックされたときの処理
gameArea.addEventListener('click', () => {
if (!gameStarted && !isWaiting) {
// ゲームがまだ始まっていない（クリックでスタートする段階）
resetGame();
startGame();

// Waiting...の状態でクリックした場合（お手付き）
} else if (isWaiting) {
clearTimeout(timeoutId);
result.textContent = 'お手付き！';
instructions.textContent = 'もう一度クリックして再挑戦！';
gameStarted = false;
isWaiting = false;

// 色が変わってからのクリック（反応時間を測定）
} else {
const reactionTime = Date.now() - startTime;
let seconds = Math.floor(reactionTime / 1000);
let milliseconds = Math.floor((reactionTime % 1000) / 10);
let time = `${seconds}.${milliseconds}`;
result.textContent = `反応時間: ${time}秒`;
instructions.textContent = 'もう一度クリックして再挑戦！';
const kekka = document.getElementById('kekka');
if (time <= 0.15) {
    alert("バショウカジキレベル！🎉🎉🎉 90km/h");
    kekka.innerHTML = "<img src=\"basyou.jpg\">"    
} else if (time <= 0.2) {
    alert("カジキレベル！🎉🎉 80km/h");
    kekka.innerHTML = "<img src=\"カジキ.jpg\" id='myImage'>" 
} else if (time <= 0.25) {
    alert("マグロレベル！　75km/h");
    kekka.innerHTML = "<img src=\"まぐろ.jpg\" id='myImage'>" 
    
} else if (time <= 0.3) {
    alert("イルカレベル！46km/h");
    kekka.innerHTML = "<img src=\"iruka.jpg\" id='myImage'>" 
} else if (time <= 0.35) {
    alert("サーモンレベル　39km/h");
    kekka.innerHTML = "<img src=\"sake.jpg\" id='myImage'>" 
} else {
    alert("サカバンバスピスレベル...");
    kekka.innerHTML = "<img src=\"sakabannbasupisu.jpg\" id='myImage'>" 
}

 var img = document.getElementById("myImage");

img.width = 500;  // 幅を500pxに変更
img.height = 300; 
gameStarted = false;
}
});

// 初期状態をセット
resetGame();