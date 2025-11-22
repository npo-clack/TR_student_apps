assessment.html
function update(dt) {
    if (gameover) return;

    scrollX += scrollSpeed * (dt / 16);

    // ...（アクティブな雪玉の移動・入力処理）

    // 強制右移動の位置判定
    if (active.x < scrollX + active.radius) {
        // 雪だるまが強制スクロールに遅れたらゲームオーバー
        gameover = true;
        alert("ゲームオーバー！右に進めなかった！");
        // 必要に応じてリロードやリセット
        // window.location.reload();
        return;
    }
    // （雪玉のX制限もscrollX基準に変更）

    // --- 障害物処理 ---
    updateObstacles(dt);

    // 障害物の当たり判定
    for (let ob of obstacles) {
        if (!ob.hit &&
            Math.abs((active.x - ob.x)) < active.radius + ob.radius &&
            Math.abs((active.y - ob.y)) < active.radius + ob.radius) {
            ob.hit = true;
            active.baseRadius = Math.max(8, active.baseRadius - 8); // 雪だるまを小さく
            // 大きさが最低以下ならゲームオーバー等
            if (active.baseRadius <= 9) {
                gameover = true;
                alert("ゲームオーバー！雪だるまが小さくなりすぎた！");
                return;
            }
        }
    }
}