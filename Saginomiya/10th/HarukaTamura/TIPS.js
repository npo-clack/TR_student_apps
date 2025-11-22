

 // ページ読み込み後に実行
document.addEventListener("DOMContentLoaded", function () {

    // すべてのアイコンブロック（tip-item）を取得
    const items = document.querySelectorAll(".tip-item");

    // それぞれのアイコンに処理をつける
    items.forEach(function (item) {

        // アイコン画像
        const icon = item.querySelector(".tip-icon");

        // 吹き出しのTIPS
        const tip = item.querySelector(".tip-box");

        // マウスがのった時にTIPSを表示
        icon.addEventListener("mouseenter", function () {
            tip.classList.add("show");
        });

        // 離れたら消える
        icon.addEventListener("mouseleave", function () {
            tip.classList.remove("show");
        });
    });
});