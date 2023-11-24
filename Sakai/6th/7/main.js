//デバッグのフラグ
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//ゲームスピード（ms)
const GAME_SPEED = 1000 / 60;

//画面のサイズ
const SCREEN_W = 180;
const SCREEN_H = 320;

//キャンバスサイズ
const CANVAS_W = SCREEN_W * 2
const CANVAS_H = SCREEN_H * 2

//フィールドサイズ
const FIELD_W = SCREEN_W * 2
const FIELD_H = SCREEN_H * 2

//星の数
const STAR_MAX = 300;

//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W
can.height = CANVAS_H

//フィールド（仮想画面）
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W
vcan.height = FIELD_H

//カメラの座標　
let camera_x = 0;
let camera_y = 0;

//星の実体
let star = [];

//キーボードの状態
let key = [];

//キーボードが押されたとき
document.onkeydown = function (e) {
  key[e.keyCode] = true;
}

//キーボードが離されたとき
document.onkeyup = function (e) {
  key[e.keyCode] = false;
}

//キャラクターのベースデザイン
class CharaBase {
  constructor(snum, x, y, vx, vy) {
    this.sn = 32;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.kill = false
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > FIELD_W << 8
      || this.y < 0 || this.y > FIELD_H << 8) this.kill = true;
  }

  draw() {
    drawSprite(this.sn, this.x, this.y)
  }
}

//敵クラス
class Teki extends CharaBase {
  constructor(snum, x, y, vx, vy) {
    super(snum, x, y, vx, vy);
  }
  update() {
    super.update();
  }
  draw() {
    super.draw();
  }
}

let teki = [
  new Teki(39, 200 << 8, 200 << 8, 0, 0)
]

//弾クラス
class Tama extends CharaBase {
  constructor(x, y, vx, vy) {
    super(5, x, y, vx, vy);
  }
  update() {
    super.update();
  }
  draw() {
    super.draw();
  }
}
let tama = [];

//自機クラス
class Jiki {
  constructor() {
    this.x = (FIELD_W / 2) << 8;
    this.y = (FIELD_H / 2) << 8;
    this.speed = 512;
    this.anime = 0;
    this.reload = 0;
    this.relo2 = 0;
  }

  //自機の移動
  update() {
    if (key[32] && this.reload == 0) {
      tama.push(new Tama(this.x + (4 << 8), this.y, 0, -2000));
      tama.push(new Tama(this.x - (4 << 8), this.y, 0, -2000));
      tama.push(new Tama(this.x + (8 << 8), this.y, 80, -2000));
      tama.push(new Tama(this.x - (8 << 8), this.y, -80, -2000));
      this.reload = 4;
      if (++this.relo2 == 4) {
        this.reload = 20;
        this.relo2 = 0
      }
      if (!key[32]) this.reload = this.relo2 = 0;
    }
    if (this.reload > 0) this.reload--;
    if (key[37] && this.x > this.speed) {
      this.x -= this.speed;
      if (this.anime > -8) this.anime--;
    }
    else if (key[39] && this.x <= (FIELD_W << 8) - this.speed) {
      this.x += this.speed;
      if (this.anime < 8) this.anime++;
    }
    else {
      if (this.anime > 0) this.anime--;
      if (this.anime < 0) this.anime++;
    }

    if (key[38] && this.y > this.speed)
      this.y -= this.speed;

    if (key[40] && this.y <= (FIELD_H << 8) - this.speed)
      this.y += this.speed;
  }

  //描画
  draw() {
    drawSprite(2 + (this.anime >> 2), this.x, this.y);
  }
}
let jiki = new Jiki();

//ファイルを読み込み
let spriteImage = new Image()
spriteImage.src = "sprite.png";

//スプライトクラス
class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

//スプライト
let sprite = [
  new Sprite(0, 0, 22, 42),//0.自機　左2
  new Sprite(23, 0, 33, 42),//1.自機　左1
  new Sprite(57, 0, 43, 42),//2.自機　正面
  new Sprite(101, 0, 33, 42),//3.自機　右1
  new Sprite(135, 0, 21, 42),//4.自機　右2

  new Sprite(0, 50, 3, 5),//5.弾1
  new Sprite(4, 50, 5, 5),//6.弾2

  new Sprite(3, 42, 16, 5),// 7.噴射 左 2
  new Sprite(29, 42, 21, 5),// 8.噴射 左 1
  new Sprite(69, 42, 19, 5),// 9.噴射 正面
  new Sprite(108, 42, 21, 5),//10.噴射 右 1
  new Sprite(138, 42, 16, 5),//11.噴射 右 2

  new Sprite(11, 50, 7, 7),//12.敵弾1-1
  new Sprite(19, 50, 7, 7),//13.敵弾1-2
  new Sprite(32, 49, 8, 8),//14.敵弾2-1
  new Sprite(42, 47, 12, 12),//15.敵弾2-2

  new Sprite(5, 351, 9, 9),//16.爆発1
  new Sprite(21, 346, 20, 20),//17.爆発2
  new Sprite(46, 343, 29, 27),//18.爆発3
  new Sprite(80, 343, 33, 30),//19.爆発4
  new Sprite(117, 340, 36, 33),//20.爆発5
  new Sprite(153, 340, 37, 33),//21.爆発6
  new Sprite(191, 341, 25, 31),//22.爆発7
  new Sprite(216, 349, 19, 16),//23.爆発8
  new Sprite(241, 350, 15, 14),//24.爆発9
  new Sprite(259, 350, 14, 13),//25.爆発10
  new Sprite(276, 351, 13, 12),//26.爆発11

  new Sprite(6, 373, 9, 9),//27.ヒット1
  new Sprite(19, 371, 16, 15),//28.ヒット2
  new Sprite(38, 373, 11, 12),//29.ヒット3
  new Sprite(54, 372, 17, 17),//30.ヒット4
  new Sprite(75, 374, 13, 14),//31.ヒット5

  new Sprite(4, 62, 24, 27),//32.黄色1
  new Sprite(36, 62, 24, 27),//33.黄色2
  new Sprite(68, 62, 24, 27),//34.黄色3
  new Sprite(100, 62, 24, 27),//35.黄色4
  new Sprite(133, 62, 24, 27),//36.黄色5
  new Sprite(161, 62, 24, 27),//37.黄色6

  new Sprite(206, 58, 69, 73),//38.黄色(中)

  new Sprite(337, 0, 139, 147),//39.黄色(大)
];

//スプライトを描画する
function drawSprite(snum, x, y) {
  let sx = sprite[snum].x;
  let sy = sprite[snum].y;
  let sw = sprite[snum].w;
  let sh = sprite[snum].h;

  let px = (x >> 8) - sw / 2;
  let py = (y >> 8) - sh / 2;

  if (px + sw < camera_x || px >= camera_x + SCREEN_W
    || py + sh < camera_y || py >= camera_y + SCREEN_H) return;


  vcon.drawImage(spriteImage, sx, sy, sw, sh, px, py, sw, sh);
}

//整数のランダムを作る
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//星クラス
class Star {
  constructor() {
    this.x = rand(0, FIELD_W) << 8;
    this.y = rand(0, FIELD_H) << 8;
    this.vx = 0;
    this.vy = rand(30, 200);
    this.sz = rand(1, 2);
  }

  draw() {
    let x = this.x >> 8;
    let y = this.y >> 8;

    if (x < camera_x || x >= camera_x + SCREEN_W
      || y < camera_y || y >= camera_y + SCREEN_H) return;

    vcon.fillStyle = rand(0, 2) != 0 ? "#66f" : "#8af";
    vcon.fillRect(x, y, this.sz, this.sz);

  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > FIELD_H << 8) {
      this.y = 0;
      this.x = rand(0, FIELD_W) << 8;
    }
  }

}

//ゲーム初期化
function gameInit() {
  for (let i = 0; i < STAR_MAX; i++)star[i] = new Star();
  setInterval(gameLoop, GAME_SPEED);
}

//オブジェクトをアップデート
function updateObj(obj) {
  for (let i = obj.length - 1; i >= 0; i--) {
    obj[i].update();
    if (obj[i].kill) obj.splice(i, 1);
  }
}

//オブジェクトを描画
function drawObj(obj) {
  for (let i = 0; i < obj.length; i++)obj[i].draw();
}

//移動の処理
function updateAll() {
  updateObj(star);
  updateObj(tama);
  updateObj(teki);
  jiki.update();
}

//描画の処理
function drawAll() {
  //描画の処理
  vcon.fillStyle = "black";
  vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);

  drawObj(star);
  drawObj(tama);
  drawObj(teki);
  jiki.draw();

  //自機の範囲 0 ~ FIELD_W
  //カメラの範囲 0 ~ (FIELD_W-SCREEN_W)

  camera_x = (jiki.x >> 8) / FIELD_W * (FIELD_W - SCREEN_W);
  camera_y = (jiki.y >> 8) / FIELD_H * (FIELD_H - SCREEN_H);

  //仮想画面から実際のキャンバスにコピー

  con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H
    , 0, 0, CANVAS_W, CANVAS_H);
}

//情報の処理
function putInfo() {
  if (DEBUG) {
    drawCount++;
    if (lastTime + 1000 <= Date.now()) {
      fps = drawCount;
      drawCount = 0;
      lastTime = Date.now();
    }

    con.font = "20px 'Impact' ";
    con.fillStyle = "white";
    con.fillText("FPS:" + fps, 20, 20);
    con.fillText("Tama:" + tama.length, 20, 40);
    con.fillText("Teki:" + teki.length, 20, 60);
  }
}

//ゲームループ
function gameLoop() {
  updateAll();
  drawAll();
  putInfo();
}
//移動の処理

updateObj(star);
updateObj(tama);
updateObj(teki);
jiki.update();

//オンロードでゲーム開始
window.onload = function () {
  gameInit();
}