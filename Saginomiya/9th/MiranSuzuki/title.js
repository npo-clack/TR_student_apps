function goTONextPage() {
  window.location.href = "3house.html";
}

// h1要素を取得
const title = document.querySelector("h1");

// h1をクリックしたらページ遷移
title.addEventListener("click", function() {
  goTONextPage();
});
