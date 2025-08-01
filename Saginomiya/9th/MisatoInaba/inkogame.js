const soundMap = {
'akubi.PNG' : new Audio('sound1.mp3'),
'unnti.PNG' : new Audio('sound1.mp3'),
'abokado.PNG' : new Audio('sound2.mp3'),
'gorogoro.PNG' : new Audio('sound2.mp3'),
'hananoiro.PNG' : new Audio('sound3.mp3'),
'junnbi.PNG' : new Audio('sound3.mp3'),
'osyaberi.PNG' : new Audio('sound4.mp3'),
'oumu.PNG' : new Audio('sound4.mp3'),
'sigaisenn.PNG' : new Audio('sound5.mp3'),
'nerujikann.PNG' : new Audio('sound5.mp3'),
'yobu.PNG' : new Audio('sound6.mp3'),
'yakimoti.PNG' : new Audio('sound6.mp3'),
}

let flippedCards = [];
let matchedCard = 0;
let playerScore = 0;
let comScore = 0;
let currentPlayer = 'Player';//'Player' or 'COM'

function updateScoreboard() {
  document.getElementById('playerScore').textContent =playerScore;
  document.getElementById('comScore').textContent = comScore;
  document.getElementById('currentTurn').textContent = currentPlayer;
}

//カードを裏返す関数
function flipCard(card) {
  if(currentPlayer !=='Player')return;//COMターン中はクリック禁止
  if(card.classList.contains('matched'))return;

  const front = card.querySelector('.front');
  const back = card.querySelector('.back');

  if(flippedCards.length < 2 && front.classList.contains('hidden')) {
    front.classList.remove('hidden');
    back.classList.add('hidden');

    playSound(front);

    flippedCards.push(card);

    if(flippedCards.length === 2) {
      setTimeout(checkMatch,800);
    }
  }
}

function playSound(front) {
  const imageSrc = front.getAttribute('src').split('/').pop();
  const sound = soundMap[imageSrc];
  if(sound) {
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;
    },2000);
  }
}

//マッチ判定
function checkMatch() {
  const[card1,card2] = flippedCards;
  const img1 = card1.querySelector('.front').getAttribute('src').split('/').pop();
  const img2 = card2.querySelector('.front').getAttribute('src').split('/').pop();
  const sound1 = soundMap[img1]?.src.split('/').pop();
  const sound2 = soundMap[img2]?.src.split('/').pop();
  if(sound1 && sound2 && sound1 === sound2) {
    //マッチ成功
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCard += 2;

    if(currentPlayer === 'Player') {
      playerScore += 2;
    } else {
      comScore += 2;
  }

    updateScoreboard();

    if(matchedCard === document.querySelectorAll('.card').length) {
      setTimeout(() => {
        alert(`ゲーム終了 ! \nPlayer:${playerScore}枚\nCOM:${comScore}枚`);
      },500);
      return;
    }
    //当たったら同じターン続行
    if (currentPlayer === 'COM') {
      setTimeout(comTurn, 1000);
    }
    flippedCards = [];
    return; // ここで終了しないとターン交代処理が走る
  }
    card1.querySelector('.front').classList.add('hidden');
    card1.querySelector('.back').classList.remove('hidden');
    card2.querySelector('.front').classList.add('hidden');
    card2.querySelector('.back').classList.remove('hidden');

    //ターン交代
    currentPlayer = (currentPlayer !== 'Player') ? 'Player' : 'COM';
    updateScoreboard();

  flippedCards = [];
}
//COMのターン
function comTurn() {
  const availableCards = Array.from(document.querySelectorAll('.card'))
  .filter(card => !card.classList.contains('matched')&&
card.querySelector('.front').classList.contains('hidden'));

if(availableCards.length < 2) return;

const card1 = availableCards[Math.floor(Math.random() * availableCards.length)];
flipForCom(card1);

setTimeout(() => {
  const remainingCards = availableCards.filter(c => c !== card1);
  const card2 = remainingCards[Math.floor(Math.random() * remainingCards.length)];
  flipForCom(card2);

    setTimeout(checkMatch,800);
   },1000);
}

function flipForCom(card) {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');

  front.classList.remove('hidden');
  back.classList.add('hidden');
  playSound(front);
  flippedCards.push(card);
}
updateScoreboard();