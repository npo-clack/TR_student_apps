

// 以下のコードはそのまま使用します
// ...

// タイピングする文章のリスト
const quotes = [
  "Hello, type this sentence!",
  "Practice makes perfect.",
  "Coding is fun!",
  "Keep calm and code on.",
  // 他の文章を追加することもできます
];

const quoteDisplay = document.getElementById('quote');
const typedInput = document.getElementById('typedInput');
const timerDisplay = document.getElementById('timer');
const timerSelect = document.getElementById('timerSelect');
const startButton = document.getElementById('startButton');
// const gameInfoContainer = document.getElementById('gameInfo');

let currentQuoteIndex = 0;
let timer = parseInt(timerSelect.value); // 最初の制限時間をセット
let countdown; // タイマー用の変数

let selectedTime; // selectedTime をここで宣言
// ゲーム開始時の初期設定
function startGame() {
  // console.log("gagagaagagagagagagagagagagag")
  clearInterval(countdown); // 既存のタイマーをクリア
  selectedTime = parseInt(timerSelect.value);
  timer = selectedTime; // 選択された制限時間をセット
  timerDisplay.innerText = timer; // 初期表示の更新
  showNewQuote();
  countdown = setInterval(updateTimer, 1000); // タイマーを1秒ごとに更新
  // <input type="text" id="typedInput"> の値をクリア
  typedInput.value = '';
    // <input type="text" id="typedInput"> を入力可能にする
    typedInput.removeAttribute('disabled');
  // タイマーが0になったらゲーム終了
  setTimeout(() => {
    clearInterval(countdown);
    endGame();
  }, timer * 1000); // ゲーム終了時間

  // // ゲーム情報を表示
  // gameInfoContainer.innerHTML = `
  //   <p>タイプする文章: <span id="quote">${quoteDisplay.textContent}</span></p>
  //   <p>経過時間: <span id="elapsedTime">0</span>秒</p>
  //   <input type="text" id="typedInput">
  // `;
}

// 新しい文章を表示する関数
function showNewQuote() {
  quoteDisplay.textContent = quotes[currentQuoteIndex];
  typedInput.value = ''; // 入力フィールドをクリア
  typedInput.style.color = 'black'; // 入力フィールドの色を初期化
}


// タイマーを更新する関数
function updateTimer() {
  if (timer > 0) {
    timer--;
    timerDisplay.textContent = timer;
    document.getElementById('elapsedTime').textContent = selectedTime - timer; // 経過時間を更新
  } else {
    endGame();
  }
}

// ゲーム終了時の処理
function endGame() {
  clearInterval(countdown);
 typedInput.setAttribute('disabled', 'true'); 
  // ゲーム終了時の処理を追加
}

// スタートボタンが押されたらゲームを開始
startButton.addEventListener('click', startGame);

// 入力された文字が正しいかどうかを確認し、文字の色を変える関数
typedInput.addEventListener('input', function () {
  const currentQuote = quoteDisplay.textContent;
  const typedText = typedInput.value;
  const partialText = currentQuote.substring(0, typedText.length);

  if (typedText === currentQuote) {
    // 全ての文字が正しく入力された場合
    typedInput.style.color = 'green';
    // 次の文章を表示するための処理
    setTimeout(function () {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      showNewQuote();
      typedInput.value = '';
      typedInput.style.color = 'black';
      // タイマーを更新
      updateTimer();
    }, 1000); // 1秒後に次の文章を表示
  } else if (typedText === partialText) {
    // 部分的に正しい文字が入力された場合
    typedInput.style.color = 'black';
  } else {
    // 間違った文字が入力された場合
    typedInput.style.color = 'red';
  }
});
// 経過時間を初期化
document.getElementById('elapsedTime').textContent = 0;
console.log(timer)

startGame(); // ゲームを開始