function nextQuestion(answer) {
    var questionElement = document.getElementById('question');
    var yesButton = document.createElement('button');
    var noButton = document.createElement('button');

    if (answer === '1') {
        // 画面を飛ばす
        window.location.href = "1game1.html";
    } else if (answer === '2') {
        window.location.href = "2game.html";
    } else if(answer === '3'){
        window.location.href = "3game.html";
    }

    yesButton.onclick = function() {
        window.location.href = "next.html";
    };

    noButton.onclick = function() {
        // ここで新しい質問に対する処理を追加
    };

    // ボタンの置き換え
    var buttonContainer = document.getElementById('game-container');
    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(questionElement);
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
}