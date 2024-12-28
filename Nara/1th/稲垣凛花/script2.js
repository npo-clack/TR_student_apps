// 初期ステータス
let hunger = 100;
let energy = 100;
let happiness = 100;

let inventory = {
  food: 0,
  toy: 0,
};

// ローカルストレージからデータを読み込む(次回読み込み時に復元)
function loadGame() {
  const savedData = JSON.parse(localStorage.getItem('gameState'));
  if (savedData) {
    hunger = savedData.hunger;
    energy = savedData.energy;
    happiness = savedData.happiness;
    inventory = savedData.inventory;
  }
}

// ステータスをローカルストレージに保存
function saveGame() {
  const gameState = {
    hunger,
    energy,
    happiness,
    inventory,
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

// ステータス更新
function updateStats() {
  document.getElementById('hunger').innerText = hunger;
  document.getElementById('energy').innerText = energy;
  document.getElementById('happiness').innerText = happiness;

  if (hunger <= 0 || energy <= 0 || happiness <= 0) {
    alert('ゲームオーバー！');
    resetGame();
  }

  saveGame(); // ステータスを更新するたびに保存
}

// アイテム使用(餌やおもちゃによるステータスの変化)
function useItem(item) {
  if (inventory[item] > 0) {
    if (item === 'food') {
      hunger = Math.min(hunger + 30, 100);
      happiness = Math.min(happiness + 10, 100);
      document.getElementById('character-image').src = "images/character-eating.png";
    } else if (item === 'toy') {
      happiness = Math.min(happiness + 30, 100);
      energy = Math.max(energy - 10, 0);
      document.getElementById('character-image').src = "images/character-playing.png";
    }

    inventory[item]--;
    setTimeout(() => {
      document.getElementById('character-image').src = "images/character-normal.png";
    }, 1000);
  } else {
    alert(`${item === 'food' ? '餌' : 'おもちゃ'}が足りません！`);
  }

  updateStats();
}

// 寝かせる
function sleep() {
  energy = Math.min(energy + 30, 100);
  hunger = Math.max(hunger - 10, 0);
  document.getElementById('character-image').src = "images/character-sleeping.png";

  setTimeout(() => {
    document.getElementById('character-image').src = "images/character-normal.png";
  }, 1000);

  updateStats();
}

// アイテム追加
function addItem(item) {
  inventory[item]++;
  alert(`${item === 'food' ? '餌' : 'おもちゃ'}を追加しました！`);
  saveGame(); // アイテム追加時にも保存
}

// ゲームリセット
function resetGame() {
  hunger = 100;
  energy = 100;
  happiness = 100;
  inventory.food = 0;
  inventory.toy = 0;
  updateStats();
  saveGame(); // リセット時にも保存
}

// 自動でステータスを減らす(時間経過)
setInterval(() => {
  hunger = Math.max(hunger - 1, 0);
  energy = Math.max(energy - 1, 0);
  happiness = Math.max(happiness - 1, 0);
  updateStats();
}, 10000);

// ページ読み込み時にデータを読み込む
window.onload = () => {
  loadGame();
  updateStats();
};
