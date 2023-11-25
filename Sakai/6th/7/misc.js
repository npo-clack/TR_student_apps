//misc.js その他いろいろ、共通関数

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

    vcon.fillStyle = rand(0, 2) != 0 ? "#66f" : "#aef";
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

//キャラクターのベースクラス
class CharaBase {
  constructor(snum, x, y, vx, vy) {
    this.sn = snum;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.kill = false;
    this.count = 0;
  }

  update() {

    this.count++;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > FIELD_W << 8
      || this.y < 0 || this.y > FIELD_H << 8) this.kill = true;
  }

  draw() {
    drawSprite(this.sn, this.x, this.y)
  }
}

//爆発のクラス
  class Expl extends CharaBase
  {
    
  draw()
  {
    this.sn = 16 + (this.count>>2);
    if( this.sn==27 )
    {
      this.kill = true;
      return;
    }
    super.draw();
  }
  }

//キーボードが押されたとき
document.onkeydown = function (e) {
  key[e.keyCode] = true;
}

//キーボードが離されたとき
document.onkeyup = function (e) {
  key[e.keyCode] = false;
}

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

//当たり判定
function checkHit(x1,y1,r1, x2,y2,r2)
{

//円同士の当たり判定
let a = (x2-x1)>>8;
  let b = (y2-y1)>>8;
  let r = r1+r2;
  
  return r*r >= a*a + b*b ;

  //矩形同士の当たり判定
/*
let left1=x1>>8;
let right1=left1+w1;
let top1=y1>>8;
let bottom1=top1+h1;

let left2=x2>>8;
let right2=left2+w2;
let top2=y2>>8;
let bottom2=top2+h2;

return(left1<=right2 &&
      right1>=left2 &&
        top1<=bottom2 &&
    bottom1>=top2);
*/

  return true
}