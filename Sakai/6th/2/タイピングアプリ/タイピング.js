let game = {
  words: [
    'How are you?',
    'See you soon',
    'Pretty good',
    'What brought you to japan?',
  ],
  currentWord: '',
  matchedIndex: 0,
  startTime: null,
  isPlaying: false,
  mainArea: document.getElementById('main'),
  resultArea: document.getElementById('result'),
  start: function () {
    game.isPlaying = true;
    game.startTime = Date.now();
    game.setWord();
  },
  setWord: function () {
    game.currentWord = game.words.shift() || '';
    game.matchedIndex = 0;
    game.displayWord();
  },
  displayWord: function () {
    game.mainArea.innerText = '$'.repeat(game.matchedIndex) + game.currentWord.substring(game.matchedIndex);
  },
  isFinished: function () {
    return game.words.length === 0;
  },
  displayResult: function () {
    const currentTime = Date.now();
    const elapsedTime = formattedSeconds(currentTime - game.startTime);
    game.resultArea.innerText = `${elapsedTime}秒かかりました。 \n もう一度プレイする場合にはブラウザーをリロードしてください。`;
    game.isPlaying = false;
  },
};
document.onkeydown = (event) => {
  if (!game.isPlaying && event.key === 'Enter') {
    game.start();
  }

  if (game.isPlaying && event.key === game.currentWord[game.matchedIndex]) {
    game.matchedIndex++;
    game.displayWord();

    if (game.matchedIndex === game.currentWord.length) {
      if (game.isFinished()) {
        game.displayResult();
      }
      game.setWord();
    }
  }
};
function formattedSeconds(ms) {
  return (ms / 1000).toFixed(2);
}

