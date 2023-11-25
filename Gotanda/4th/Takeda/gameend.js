function nextQuestion(answer) {
    var questionElement = document.getElementById('question');
    var yesButton = document.createElement('button');
    var noButton = document.createElement('button');

    if (answer === '1') {
        window.location.href = "game.html"
   };

    // ボタンの置き換え
    var buttonContainer = document.getElementById('game-container');
    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(questionElement);
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
}