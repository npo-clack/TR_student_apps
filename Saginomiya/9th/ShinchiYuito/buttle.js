const USER_INIT_HP = 10; // ユーザの初期HP
const ENEMY_INIT_HP = 10; // 敵の初期HP
const USER_NAME = "あなた"; // プレイヤー名
const ENEMY_NAME = "村人"; // 敵の名前

// HTMLの要素を定義
const containerElement = document.getElementById("container");
const statusElement = document.getElementById("panel_status");
const userHpElement = document.getElementById("user_hp");
const commandElement = document.getElementById("panel_command");
const monsterElement = document.getElementById("monster");
const messageElement = document.getElementById("panel_message");

console.log(containerElement);
console.log(statusElement);
console.log(userHpElement);
console.log(commandElement);
console.log(monsterElement);
console.log(messageElement);

// 体力を格納する変数
let userHp = USER_INIT_HP; // 現在のユーザのHP
let enemyHp = ENEMY_INIT_HP; // 現在の敵のHP

// 「たたかう」ボタン押下時の処理
const handleAttack = () => {
  changeText(["「たたかう」が押された。","攻撃をします"]);

  // 1~10のランダムな数値を発生させる「敵」
  const power = Math.floor(Math.random() * 10) + 1;
  enemyHp -= power; // モンスターの体力を下げる
  if(enemyHp < 0) enemyHp = 0; // マイナス値の場合は0にする

  //メッセージを挿入
  changeText([USER_NAME + "の こうげき！",ENEMY_NAME + "に" + power + "ポイントのダメージを与えた！"]);
  
  // 敵の体力が0以下になった
  if(enemyHp === 0) {
    changeText([ENEMY_NAME + "を 止めた！"]);
    commandElement.style.display = "none"; // コマンドを非表示
    monsterElement.style.display = "none"; // モンスターを非表示
    return;
  }

  enemyAttack()

};

const changeText = (arrayMessage) => {
  arrayMessage.forEach((str) => {
    messageElement.innerHTML += str + "<br>";
  });
};

// 敵の攻撃
const enemyAttack = () => {
  // 1~10のランダムな数値を発生させる「敵」
  const power = Math.floor(Math.random() * 10) + 1;

  userHp -= power; // ユーザの体力を下げる
  if (userHp < 0) userHp = 0; // マイナス値の場合は0にする

  // メッセージを挿入
  changeText([ENEMY_NAME + "の こうげき！" + USER_NAME  + "に" + power + "ポイントのダメージを受けた！"]);
  userHpElement.innerHTML = userHp; // span中のHPに反映

  // ユーザの体力が0になったら終了
  if (userHp === 0) {
    changeText([USER_NAME + "は ちからつきた..."]);
    commandElement.style.display = "none";
  }
}