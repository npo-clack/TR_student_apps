// オーディオ要素を作成
const audio = new Audio('file:///C:/Users/User/Downloads/%E9%8A%83%E7%81%AB%E5%99%A8%E3%83%BB%E6%8B%B3%E9%8A%8301_Audio%20Trimmer%20(2).mp3'); // 音声ファイルのパスを指定


const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const countdownDisplay = document.getElementById('countdown');
const retryButton = document.getElementById('retryButton');
let score = 0;
let buttonDisplayed = false;
let remainingTime = 60;
let gameInterval;
let gameActive = true;


// 的の位置をランダムに変更
function moveTarget() {
  const maxX = window.innerWidth - target.offsetWidth;
  const maxY = window.innerHeight - target.offsetHeight;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  target.style.left = randomX + 'px';
  target.style.top = randomY + 'px';
}

// ゲーム開始時に的を配置
moveTarget();

// クリック時の処理を追加
target.addEventListener('click', () => {
  if (gameActive) {
    audio.play();
    score += 2; // -2点
    scoreDisplay.textContent = score;
    moveTarget();
  }

});
// クリック時の処理を追加
document.addEventListener('click', () => {
  if (gameActive) {
    audio.play();
    score -= 1; // クリックしたときスコアを-1減少
    scoreDisplay.textContent = score;
  }

});


// 一分後に再読み込みボタンを表示
setTimeout(function () {
  const reloadButtonContainer = document.getElementById('reloadButtonContainer');
  const reloadButton = document.createElement('button');
  reloadButton.textContent = 'Retry';
  reloadButton.addEventListener('click', function () {
    location.reload(); // ページを再読み込み
  });
  reloadButtonContainer.appendChild(reloadButton);
}, 60000); // 60000ミリ秒 = 1分後

// カウントダウン用の変数

let countdownInterval;

// カウントダウンを表示する関数
function updateCountdown() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  countdownDisplay.textContent = `残り時間: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// カウントダウンを開始
countdownInterval = setInterval(() => {
  remainingTime--;
  updateCountdown();
  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = '時間切れ';
    retryButton.style.display = 'block'; // リトライボタンを表示
  }
}, 1000);
// 一分後にクリックのプログラムを終了
setTimeout(() => {
  gameActive = false; // クリックのプログラムを終了
}, 60000); // 60000ミリ秒 = 1分後

