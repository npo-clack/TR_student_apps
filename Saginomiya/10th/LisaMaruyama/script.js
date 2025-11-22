const container = document.getElementById("game-container");
const message = document.getElementById("message");

let nextNumber = 1;

// 1〜30 の配列を作成
let numbers = [];
for (let i = 1; i <= 30; i++) numbers.push(i);

// 配列をシャッフル（Fisher-Yates）
for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
}

// ランダム順で数字ボタンを作成
numbers.forEach(num => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = num;

    circle.addEventListener("click", () => handleClick(num, circle));

    container.appendChild(circle);
});

function handleClick(num, element) {
    if (num === nextNumber) {
        // 正解
        element.classList.add("correct");
        nextNumber++;

        if (num === 30) {
            clearGame();
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    message.textContent = "追放";
    message.style.color = "red";
    message.classList.remove("hidden");
    container.classList.add("hidden");
}

function clearGame() {
    message.textContent = "ミッションコンプリート！";
    message.style.color = "green";
    message.classList.remove("hidden");
    container.classList.add("hidden");
}

