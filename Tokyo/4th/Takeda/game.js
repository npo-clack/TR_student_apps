function nextQuestion(answer) {
    var questionElement = document.getElementById('question');
    var yesButton = document.createElement('button');
    var noButton = document.createElement('button');

    if (answer === '1') {
        window.location.href = "1game2.html"
    } else if (answer === '2') {
        window.location.href = "1game4end.html"
    };

    // ボタンの置き換え
    var buttonContainer = document.getElementById('game-container');
    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(questionElement);
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
}