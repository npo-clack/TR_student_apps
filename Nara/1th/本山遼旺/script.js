const imageContainer = document.getElementById('image-container1');
const slides = document.querySelectorAll('.slide1');
const prevButton = document.getElementById('prev1');
const nextButton = document.getElementById('next1');

let currentIndex = 0;

function updateSlider() {
    const offset = -currentIndex * 283; // 300px is the width of the slider
    imageContainer.style.transform = `translateX(${offset}px)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

// ランダムに表示するテキストのリスト
const texts = [
    "やる気がないときゃぁ魚でも食え！",
    "ありがたき幸せ！",
    "今日のニュースは見たかな？",
    "人生楽しめよ！",
    "hahaha！",
    "姉のこと、忘れるなよ。",
    "お菓子とか食う？",
    "時間がたつってのは早いよな。はぁ...",
    "お前の人生だから、お前のことはお前のさじ加減が全てだぜ！"
  ];
  
  // ランダムなテキストを選ぶ関数
  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  }
  
  // ページが読み込まれたときに実行
  window.onload = function () {
    const randomTextElement = document.getElementById("random-text");
    randomTextElement.textContent = getRandomText();
  };