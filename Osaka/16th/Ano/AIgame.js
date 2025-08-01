const numberDisplay = document.getElementById("numberDisplay");
const digits = [
  document.getElementById("digit1"),
  document.getElementById("digit2"),
  document.getElementById("digit3"),
  document.getElementById("digit4"),
  document.getElementById("digit5")
];
const userInput = document.getElementById("userInput");
const color1 =document.getElementById("color1");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");
document.body.append("答える色と暗記番号はblue　１, brown　２, yellow　３, orange　４, purple　５, aqua　６です。");
document.body.append("答え方　数字-色の形式で続けて入力してください。　解答例 9-orange1-yellow")
let randomNumber = "";
let kotae ="";

function getRandomColor() {
  const colors = ["blue", "brown", "yellow", "orange", "purple", "aqua"];
  return colors[Math.floor(Math.random() * colors.length)];
  
}

function startGame() {
  randomNumber = "";
  for (let i = 0; i < 5; i++) {
    
    const digit = Math.floor(Math.random() * 10);
    const color = getRandomColor();

    digits[i].textContent = digit;
    digits[i].style.color = color;


    randomNumber += `${digit}-${color}`; 
  }

  userInput.value = "";
  result.textContent = "";
  userInput.style.display = "none";
  submitBtn.style.display = "none";

  // 10秒後に非表示
  setTimeout(() => {
    digits.forEach((d) => (d.textContent = ""));
    userInput.style.display = "inline";
    submitBtn.style.display = "inline";
    userInput.focus();
  },10000);
}

submitBtn.addEventListener("click", () => {
  const answer = userInput.value;
  if (answer === randomNumber) {
    result.textContent = "正解！🎉";
    result.style.color = "green";
  } else {
    result.textContent = `不正解！正解は ${randomNumber} でした`;
    result.style.color = "red";
  }

  // 2秒後にリスタート
  setTimeout(startGame, 2000);
});

// 最初の起動
startGame();