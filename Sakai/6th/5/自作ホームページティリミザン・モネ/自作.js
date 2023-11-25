const swiper = new Swiper(".swiper", {
  loop: true, // ループ
  speed: 800, // 少しゆっくり(デフォルトは300)
  mousewheel: true, // マウスホイールでスライド
  direction: "vertical", // 縦方向
  autoplay: { // 自動再生
    delay: 1000, // 1秒後に次のスライド
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
  },
  // ページネーション
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // クリック可能にする
  },
  // 前後の矢印
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});