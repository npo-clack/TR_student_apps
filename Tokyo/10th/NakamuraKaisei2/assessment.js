function updateScore() {
    scoreEl.textContent = `得点: ${ score }`;
    // ここで localStorage にスコアを保存（後でランキング画面で読み取る）
    try {
        localStorage.setItem('playerScore', String(score));
    } catch (e) {
        console.warn('localStorage に保存できませんでした:', e);
    }
}
if (timeLeft <= 0) {
    clearInterval(timerInterval);

    // 最終スコアを保存（念のため）
    try {
        localStorage.setItem('playerScore', String(score || 0));
    } catch (e) {
        console.warn('localStorage に保存できませんでした:', e);
    }

    alert("時間切れ！ランキング画面へ移動します。");

    // ランキングページへ移動（ここが "game.html" になっているとループする）
    window.location.href = "game.html";
}
const score = parseInt(localStorage.getItem("playerScore") || "0", 10);