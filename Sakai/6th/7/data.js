//data.js スプライトデータとか

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