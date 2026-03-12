function nextQuestion(answer) {
    var questionElement = document.getElementById('question');
    var yesButton = document.createElement('button');
    var noButton = document.createElement('button');

    if (answer === '1') {
        questionElement.innerText = '十分ほど待った。';
        yesButton.innerText = 'もういいだろうと鳥居をくぐる';
        noButton.innerText = 'めんどくさいので帰る';
    } else if (answer === '2') {
        window.location.href = "1game2end.html";
    };
    

    yesButton.onclick = function() {
        window.location.href = "1game1end.html";
    };

    noButton.onclick = function() {
        // ここで新しい質問に対する処理を追加
        window.location.href = "1game2end.html"
    };

    // ボタンの置き換え
    var buttonContainer = document.getElementById('game-container');
    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(questionElement);
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
}