

let playerHP = 100;
let playerCoins = 100; // 初期コイン

function updatePlayerHPUI() {
  document.getElementById("playerHP").textContent = playerHP;
}
function checkGameState() {
  const char = characters[currentCharacter];
  if (char.affection >= 100) {
    disableActions();
    document.getElementById("proposeBtn").style.display = "inline-block"; 
  } else if (playerHP <= 0) {
    resultDisplay.textContent += `\n💀 プレイヤーのHPが0になりました。ゲームオーバーです。`;
    disableActions();
  } else if (char.affection <= 0) {
    // 好感度0はHP減少で処理済みなのでここは特に何もしないかも
  }
}

let hasDoping = false;

document.getElementById("coinDisplay").textContent = playerCoins;

document.getElementById("buyHeal").addEventListener("click", () => {
  if (playerCoins >= 20) {
    playerHP += 30;
    if (playerHP > 100) playerHP = 100;
    playerCoins -= 20;
    updatePlayerHPUI();
    updateCoinDisplay();
    resultDisplay.textContent = "🧪 回復薬を使ってHPが30回復した！";
  } else {
    resultDisplay.textContent = "💰 コインが足りません！";
  }
});

//ショップ機能
document.getElementById("buyDoping").addEventListener("click", () => {
  if (playerCoins >= 50) {
    hasDoping = true;
    playerCoins -= 50;
    updateCoinDisplay();
    resultDisplay.textContent = "💥 ドーピング薬を使った！次のプレゼント効果が2倍になる！";
  } else {
    resultDisplay.textContent = "💰 コインが足りません！";
  }
});

function updateCoinDisplay() {
  document.getElementById("coinDisplay").textContent = playerCoins;
}

//ドーピング効果
function giveGift(item) {
  const char = characters[currentCharacter];
  char.items--;

  let affectionGain = item.affection;

  // ドーピング効果があれば2倍にする
  if (hasDoping) {
    affectionGain *= 2;
    hasDoping = false; // 1回だけ有効
  }

  char.affection += affectionGain;

  if (char.affection > 100) char.affection = 100;
  if (char.affection < 0) char.affection = 0;

  if (affectionGain < 0) char.life--;

  char.currentImage = item.img;
  characterImage.src = item.img;

  if (char.affection === 0) {
    playerHP -= 50;
    if (playerHP < 0) playerHP = 0;
    resultDisplay.textContent = `${item.name}を渡しました。\n${item.quote}\n\n好感度が0になりました！あなたのHPが50減少。現在のHP: ${playerHP}`;
  } else {
    resultDisplay.textContent = `${item.name}を渡しました。\n${item.quote}`;
    if (hasDoping) resultDisplay.textContent += "\n（ドーピング効果で好感度が2倍！）";
  }

  checkGameState();
  updateCharacterUI();
  updatePlayerHPUI();
}


const characters = {
  ayano: {
    name: "あやの",
    description: "元気でかわいくて、アイドル活動が大好きなキャラクター。",
    image: "ayano_default.jpg",
    currentImage: "ayano_default.jpg",
    background: "bg_ayano.jpg",
    affection: 50,
    items: 0,
    life: 3
  },
  top: {
    name: "T.O.P",
    description: "カリスマ的な存在感を持ち、芸術と音楽を愛する俳優。",
    image: "top_default.jpg",
    currentImage: "top_default.jpg",
    background: "bg_top.jpg",
    affection: 50,
    items: 0,
    life: 3
  },
  toki: {
    name: "常田大希",
    description: "革新的な音楽センスと独特の世界観を持つマルチアーティスト。",
    image: "toki_default.jpg",
    currentImage: "toki_default.jpg",
    background: "bg_toki.jpg",
    affection: 50,
    items: 0,
    life: 3
  },
  boris: {
    name: "ボリス・ジョンソン",
    description: "英国の元首相で、独特なキャラクターとユーモアが魅力。",
    image: "boris_default.jpg",
    currentImage: "boris_default.jpg",
    background: "bg_boris.jpg",
    affection: 50,
    items: 0,
    life: 3
  },
  meii: {
    name: "永野芽衣",
    description: "透明感ある笑顔と演技力が魅力の人気女優。",
    image: "meii_default.jpg",
    currentImage: "meii_default.jpg",
    background: "bg_meii.jpg",
    affection: 50,
    items: 0,
    life: 3
  },
  kimu: {
  name: "木村拓哉",
  description: "国民的スター、どんな役でもこなすカリスマ俳優。",
  image: "kimu_default.jpg",
  currentImage: "kimu_default.jpg",
  background: "bg_kimu.jpg",
  affection: 50,
  items: 0,
  life: 3
},
suzu: {
  name: "広瀬すず",
  description: "明るくて元気、笑顔がまぶしい人気女優。",
  image: "suzu_default.jpg",
  currentImage: "suzu_default.jpg",
  background: "bg_suzu.jpg",
  affection: 50,
  items: 0,
  life: 3
},
kaya: {
  name: "清原かや",
  description: "静かで芯が強く、表現力豊かな演技が魅力の若手女優。",
  image: "kaya_default.jpg",
  currentImage: "kaya_default.jpg",
  background: "bg_kaya.jpg",
  affection: 50,
  items: 0,
  life: 3
},
ryouhei: {
  name: "鈴木亮平",
  description: "芯が強く、表現力豊かな演技が魅力の俳優。",
  image: "ryouhei_default.jpg",
  currentImage: "ryouhei_default.jpg",
  background: "bg_ryouhei.jpg",
  affection: 50,
  items: 0,
  life: 3
},
gongyoo: {
  name: "コン・ユ",
  description: "ダンディで優しさあふれる俳優。ミステリアスで知的な魅力が人気。",
  image: "gongyoo_default.jpg",
  currentImage: "gongyoo_default.jpg",
  background: "bg_gongyoo.jpg",
  affection: 50,
  items: 0,
  life: 3
},
ohinasama: {
  name: "長浜広奈（おひな様）",
  description: "今日好き出演のおひな様。明るく元気でみんなの人気者。",
  image: "ohinasama_default.jpg",
  currentImage: "ohinasama_default.jpg",
  background: "bg_ohinasama.jpg",
  affection: 50,
  items: 0,
  life: 3
},
wonyoung: {
  name: "ウォニョン（Wonyoung）",
  description: "爽やかでキュートな人気アイドル。みんなの憧れ！",
  image: "wonyoung_default.jpg",
  currentImage: "wonyoung_default.jpg",
  background: "bg_wonyoung.jpg",
  affection: 50,
  items: 0,
  life: 3
}
};

const itemOptions = {
  ayano: [
    { name: "ケーキ", affection: 15, img: "ayano_happy.jpg", quote: "わーい！美味しそう〜！" },
    { name: "本", affection: 10, img: "ayano_think.jpg", quote: "むずかしいけど…いいね！" },
    { name: "ジャンクフード", affection: -20, img: "ayano_angry.jpg", quote: "そんなの食べたくない〜！" }
  ],
  top: [
    { name: "ワイン", affection: 20, img: "top_smile.jpg", quote: "美味しい！" },
    { name: "アートブック", affection: 15, img: "top_nod.jpg", quote: "興味深いね。" },
    { name: "騒がしいパーティのチケット", affection: -25, img: "top_annoyed.jpg", quote: "舐めてるのか？" }
  ],
  toki: [
    { name: "レコード", affection: 20, img: "toki_smile.jpg", quote: "これ、たまらない音だね。" },
    { name: "音楽機材", affection: 15, img: "toki_nod.jpg", quote: "いい感じのサウンドが作れそうだ。" },
    { name: "カフェラテ", affection: -10, img: "toki_neutral.jpg", quote: "ありがとう。でもカフェラテはちょっと…" }
  ],
  boris: [
    { name: "新聞", affection: 15, img: "boris_reading.jpg", quote: "ニュースは大事だね。" },
    { name: "紅茶", affection: 20, img: "boris_tea.jpg", quote: "やっぱり英国の味だ。" },
    { name: "スーツ", affection: -10, img: "boris_angry.jpg", quote: "そんな格好はいやだな…" }
  ],
  meii: [
    { name: "花束", affection: 20, img: "meii_happy.jpg", quote: "ありがとう！とっても嬉しい！" },
    { name: "台本", affection: 15, img: "meii_think.jpg", quote: "しっかり練習するね。" },
    { name: "辛い食べ物", affection: -15, img: "meii_angry.jpg", quote: "辛すぎて苦手かも…" }
  ],
  kimu: [
  { name: "サングラス", affection: 15, img: "kimu_cool.jpg", quote: "これ、似合ってるかな？" },
  { name: "バイク雑誌", affection: 10, img: "kimu_nod.jpg", quote: "お、いいねぇ。" },
  { name: "アイドルグッズ", affection: -20, img: "kimu_confused.jpg", quote: "うーん…これはちょっと…" }
],
suzu: [
  { name: "イチゴのケーキ", affection: 20, img: "suzu_happy.jpg", quote: "わぁ、だいすき！" },
  { name: "映画の脚本", affection: 15, img: "suzu_think.jpg", quote: "これ…面白そうだね。" },
  { name: "虫の図鑑", affection: -20, img: "suzu_disgust.jpg", quote: "ひぇ…ムリムリムリ…" }
],
kaya: [
  { name: "花束", affection: 20, img: "kaya_happy.jpg", quote: "ありがとうございます…すごく綺麗です。" },
  { name: "詩集", affection: 15, img: "kaya_think.jpg", quote: "この言葉、心に響きます…" },
  { name: "派手なアクセサリー", affection: -15, img: "kaya_shy.jpg", quote: "ちょっと、派手すぎるかも…" }
],
ryouhei: [
  { name: "花束", affection: 20, img: "ryouhei_smile.jpg", quote: "ありがとうございます" },
  { name: "詩集", affection: 15, img: "ryouhei_nod.jpg", quote: "いい感じ" },
  { name: "ゴミ袋", affection: -15, img: "ryouhei_angry.jpg", quote: "臭いです" }
],
gongyoo: [
  { name: "高級コーヒー", affection: 20, img: "gongyoo_happy.jpg", quote: "この香り…癒されるよ。" },
  { name: "脚本集", affection: 15, img: "gongyoo_think.jpg", quote: "いい役のヒントになりそうだね。" },
  { name: "辛すぎる料理", affection: -15, img: "gongyoo_angry.jpg", quote: "ちょっと…これは強烈すぎる…" }
],
ohinasama: [
  { name: "おひな様の手作りお菓子", affection: 25, img: "ohinasama_sweets.jpg", quote: "ありがとう！めっちゃ嬉しい♪" },
  { name: "ライブチケット", affection: 10, img: "ohinasama_live.jpg", quote: "行こ行こ！楽しみだね〜！" },
  { name: "渋い本", affection: -15, img: "ohinasama_shock.jpg", quote: "うーん、私にはちょっと堅いかも…" }
],
wonyoung: [
  { name: "花束", affection: 30, img: "wonyoung_flower.jpg", quote: "わぁ、ありがとう！とっても嬉しい！" },
  { name: "ライブDVD", affection: 15, img: "wonyoung_dvd.jpg", quote: "一緒に見ようね♪" },
  { name: "変な雑貨", affection: -10, img: "wonyoung_strange.jpg", quote: "えっ、これ何？笑" }
]
};

let currentCharacter = "ayano";
let tapCount = 0;
let tapTimer;

// DOM取得
const affectionDisplay = document.getElementById("affection");
const itemsDisplay = document.getElementById("items");
const resultDisplay = document.getElementById("result");
const itemMenu = document.getElementById("itemMenu");
const characterImage = document.getElementById("characterImage");

// 初期化
updateCharacterUI();
updateItemMenu();

// キャラ切り替え
function switchCharacter(charId) {
  currentCharacter = charId;
  resultDisplay.textContent = "";
  itemMenu.style.display = "none";
  enableActions();
  updateCharacterUI();
  updateItemMenu();

  // エンディング＆プロポーズ画面は非表示に戻す
  document.getElementById("endingScreen").style.display = "none";
  document.getElementById("proposalResultScreen").style.display = "none";
  document.querySelector(".game-container").style.display = "block";
  document.getElementById("proposeBtn").style.display = "none";
}

// UI更新
function updateCharacterUI() {
  const char = characters[currentCharacter];

  document.body.classList.remove("theme-ayano", "theme-top", "theme-toki", "theme-boris", "theme-meii");
  document.body.classList.add(`theme-${currentCharacter}`);

  document.body.style.backgroundImage = `url(${char.background})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";

  document.getElementById("characterName").textContent = char.name;
  document.getElementById("characterDescription").textContent = char.description;
  characterImage.src = char.currentImage || char.image;
  affectionDisplay.textContent = char.affection;
  itemsDisplay.textContent = char.items;
}

// アイテムメニュー更新
function updateItemMenu() {
  const options = itemOptions[currentCharacter];
  for (let i = 0; i < options.length; i++) {
    const btn = document.getElementById(`item${i + 1}`);
    btn.textContent = options[i].name;
    btn.replaceWith(btn.cloneNode(true));
    const newBtn = document.getElementById(`item${i + 1}`);
    newBtn.addEventListener("click", () => {
      giveGift(options[i]);
    });
  }
}

// アイテム収集
document.getElementById("collectBtn").addEventListener("click", () => {
  characters[currentCharacter].items++;
  updateCharacterUI();
  resultDisplay.textContent = "アイテムを手に入れました！";
});
// ミニゲームのボタンにイベントを追加
document.getElementById("startMiniGameBtn").addEventListener("click", () => {
  startMiniGame();
});

// ミニゲームの開始
function startMiniGame() {
  console.log('a')
  const gameMessage = document.getElementById("gameMessage");
  gameMessage.textContent = "より速くボタンを押してアイテムを集めよう！";

  // タイミングを合わせる目標タイミング（ランダムで決まる）
  const targetTime = Math.floor(Math.random() * 5) + 1;  // 1秒から5秒の間でランダム

  let countdown = targetTime;

  // カウントダウンを開始
  const countdownInterval = setInterval(() => {
    gameMessage.textContent = `タイミング: ${countdown}秒...`;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      gameMessage.textContent = "失敗！タイミングが遅すぎた！";
      // 失敗した場合はボタンを元に戻し、アイテム収集ボタンは非表示にする
      document.getElementById("collectBtn").style.display = "none";
    }
  }, 1000);

  // プレイヤーがボタンを押す
  document.getElementById("collectBtn").style.display = "block";
  document.getElementById("collectBtn").onclick = () => {
    clearInterval(countdownInterval);
    if (Math.abs(targetTime - countdown) <= 1) {
      // タイミングが合っていれば成功
      characters[currentCharacter].items++;
      updateCharacterUI();
      gameMessage.textContent = `成功！アイテムをゲット！タイミングがバッチリ！`;
    } else {
      // タイミングが合わなければ失敗
      gameMessage.textContent = "失敗！タイミングがズレていた。";
      document.getElementById("collectBtn").style.display = "none";
    }
  };
}

// アイテム渡す
document.getElementById("giveGiftBtn").addEventListener("click", () => {
  if (characters[currentCharacter].items > 0) {
    itemMenu.style.display = "block";
  } else {
    resultDisplay.textContent = "アイテムが足りません。";
  }
});

// プレゼント処理
function giveGift(item) {
  const char = characters[currentCharacter];
  char.items--;
  char.affection += item.affection;

  if (char.affection > 100) char.affection = 100;
  if (char.affection < 0) char.affection = 0;

  if (item.affection < 0) char.life--;

  char.currentImage = item.img;
  characterImage.src = item.img;

  // 好感度が0以下になったらHP減少
  if (char.affection === 0) {
    playerHP -= 50;
    if (playerHP < 0) playerHP = 0;
    resultDisplay.textContent = `${item.name}を渡しました。\n${item.quote}\n\n好感度が0になりました！あなたのHPが50減少。現在のHP: ${playerHP}`;
  } else {
    resultDisplay.textContent = `${item.name}を渡しました。\n${item.quote}`;
  }

  checkGameState();
  updateCharacterUI();
  updatePlayerHPUI(); // HP表示更新
}


// エンディング表示
function showEnding() {
  const char = characters[currentCharacter];

  document.getElementById("endingVideoContainer").style.display = "block";

  document.getElementById("endingTitle").textContent = `${char.name}との絆、完成！`;
  document.getElementById("endingMessage").textContent = `${char.name}の動画はこちら！`;

  const videoURLs = {
    ayano: "https://www.youtube.com/embed/YSNQfgYrAZI?autoplay=1",
    top: "https://www.youtube.com/embed/-A_sbHGwhhc?autoplay=1",
    toki: "https://www.youtube.com/embed/C47K1TX9PAA?autoplay=1",
    boris: "https://www.youtube.com/embed/_C4ewjNkJ5Q?autoplay=1",
    meii: "https://www.youtube.com/embed/KOJG3MIwaeU?autoplay=1",
    kimu: "https://www.youtube.com/embed/J3C4xF7UriY?autoplay=1",
    suzu: "https://www.youtube.com/embed/_RNBBfU9_Eg?autoplay=1",
    kaya: "https://www.youtube.com/embed/QC-URLk3mb0?autoplay=1",
    ryouhei: "https://www.youtube.com/embed/apjsBT9llvo?autoplay=1",
    gongyoo: "https://www.youtube.com/embed/ys0rDKOysj0?autoplay=1",
    ohinasama: "https://www.youtube.com/embed/CASWmcseyhU?autoplay=1",
    wonyoung: "https://www.youtube.com/embed/BiTEQGmPRfQ?list=RDBiTEQGmPRfQ&start_radio=1&autoplay=1"
  };

  document.getElementById("endingVideo").src = videoURLs[currentCharacter];
}

// ボタン有効・無効切り替え
function disableActions() {
  document.getElementById("collectBtn").disabled = true;
  document.getElementById("giveGiftBtn").disabled = true;
  itemMenu.style.display = "none";
}
function enableActions() {
  document.getElementById("collectBtn").disabled = false;
  document.getElementById("giveGiftBtn").disabled = false;
}

// プロポーズボタンクリック処理
document.getElementById("proposeBtn").addEventListener("click", () => {
  const char = characters[currentCharacter];
  document.getElementById("proposeBtn").style.display = "none";

  // プロポーズ成功確率50%
  const isSuccess = Math.random() < 0.5;

  // ゲーム画面を隠し、エンディング画面表示
  document.querySelector(".game-container").style.display = "none";
  const ending = document.getElementById("endingScreen");
  ending.style.display = "block";

  if (isSuccess) {
    document.getElementById("endingVideoContainer").style.display = "block";
    document.getElementById("endingTitle").textContent = "💍 プロポーズ成功！";
    document.getElementById("endingMessage").textContent = `${char.name}は優しくうなずいた…`;

    // 少し待ってから動画表示
    setTimeout(() => {
      showEnding();
      showProposalResult(true);
    }, 1500);

  } else {
    document.getElementById("endingVideoContainer").style.display = "none";
    document.getElementById("endingTitle").textContent = "🥀 プロポーズ失敗…";
    document.getElementById("endingMessage").textContent = `${char.name}は静かに首を横に振った…`;
    showProposalResult(false);
  }
});
function showProposalResult(success) {
  const resultScreen = document.getElementById('proposalResultScreen');
  const resultTitle = document.getElementById('proposalResultTitle');
  const resultMessage = document.getElementById('proposalResultMessage');
  const resultImage = document.getElementById('proposalResultImage');
  const tweetButton = document.getElementById('tweetButton');

  // 表示内容を変更
  if (success) {
    resultTitle.textContent = "💍 プロポーズ成功！";
    resultMessage.textContent = "おめでとう！あなたの気持ちは伝わり、友達になれた！";
    resultImage.src = "img/propose_success.jpg";
  } else {
    resultTitle.textContent = "💔 プロポーズ失敗...";
    resultMessage.textContent = "残念ながら気持ちは届きませんでした。でも、またチャンスがあるかも。";
    resultImage.src = "img/propose_fail.jpg";
  }

  // ここでツイートボタンのリンクをセット
  setTweetButton(success);

  // 結果画面を表示する場合はここでdisplayを切り替える（必要なら）
  resultScreen.style.display = "block";
}
function setTweetButton(success) {
  const charName = characters[currentCharacter].name; // 今の推しの名前取得
  let resultTitle = success ? "💍 プロポーズ成功！" : "💔 プロポーズ失敗...";
  let resultMessage = success
    ? "おめでとう！推しへの気持ちは伝わり、友達になれました！"
    : "残念ながら気持ちは届きませんでした。でも、またチャンスがあるかも？";

  // ツイート内容を作成
  const tweetText = encodeURIComponent(resultTitle + " " + resultMessage + " #推し活RPG");
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  // hrefをセット
  const tweetButton = document.getElementById('tweetButton');
  tweetButton.href = tweetUrl;
  tweetButton.style.display = 'inline-block';
}

// 例：プロポーズ結果を表示したタイミングでセット
// successは真偽値（成功か失敗か）
setTweetButton(true); // or false
