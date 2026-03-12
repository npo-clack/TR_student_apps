const IMG_CHAR_W=32;//キャラクター幅
const IMG_CHAR_H=32;//キャラクター高さ

//インスタンス
var pc;//プレイヤー




var tmap;	// カレントマップ
var x,y;
let walkSpeed=0.15;



////////////////////////////////////////////////////////////////////////////////
// プリロード
function preload() {
  // 主人公の位置
x=9;
y=12;







    // デフォルトマップ
  loadTiledMap("grass", "date", mapLoaded);
}

////////////////////////////////////////////////////////////////////////////////
// セットアップ
function setup() {
  let cnv = createCanvas(640,640);
  pc=new PlayerCharacter(loadImage("date/pipo-charachip021.png"));


   // キー入力のイベントリスナーを追加



  
   window.addEventListener("keydown", function (event) {
     
  

     if (event.key === "ArrowLeft") {
       pc.direction = 1;
       x-=walkSpeed;
     } else if (event.key === "ArrowRight") {
       pc.direction = 2;
       x+=walkSpeed;
     } else if (event.key === "ArrowUp") {
       pc.direction = 3;
       y-=walkSpeed;
     } else if (event.key === "ArrowDown") {
       pc.direction = 0;
       y+=walkSpeed;
     }
   
    

     

         });
         
      



}

let prevX,prevY;//直前の位置を保持する変数



////////////////////////////////////////////////////////////////////////////////
// ドロー
function draw() {



  //マップの表示
  background(tmap ? tmap.getBackgroundColor():225);
  if(tmap)tmap.draw(x,y); // カメラ位置を指定して描画する
  

// キャラクターの座標をログに表示
//console.log("Character Position: (" + x + ", " + y + ")");
// プレイヤーのタイル位置を計算
let playerTileX = Math.round(x);
let playerTileY = Math.ceil(y);
// プレイヤーのタイル位置をログに表示
console.log("Player's Tile Position: (" + playerTileX + ", " + playerTileY + ")");


//直前の位置を保持


////////////////////////////////////////////////////////
  // 壁との衝突判定

    if(tmap.getTileIndex(5, playerTileX, playerTileY) !== 0) {
    
    
    
    
// キー入力に基づいてプレイヤーの位置を更新する
if (keyIsDown(LEFT_ARROW)) {
  pc.direction = 1;
  x += walkSpeed;
} else if (keyIsDown(RIGHT_ARROW)) {
  pc.direction = 2;
  x -= walkSpeed;
} else if (keyIsDown(UP_ARROW)) {
  pc.direction = 3;
  y += walkSpeed;
} else if (keyIsDown(DOWN_ARROW)) {
  pc.direction = 0;
  y -= walkSpeed;
}


    }

  pc.drawCharacter(width/2,height/2);
}

////////////////////////////////////////////////////////////////////////////////
// マップロード
function mapLoaded(newMap) {
  tmap = newMap;
  tmap.setPositionMode("MAP");
  tmap.setDrawMode(CENTER);

}










////////////
//初期化
class PlayerCharacter{

  constructor(img,d=0){
   this.img=img;
   this.direction=d;

 }

 
 
 
 
 
 
 
 //キャラクター描画
 drawCharacter(cx,cy){
   //アニメーション
   let dx =floor(frameCount/15)%4;
   if(dx==3) dx=1; //0->1->2->1
   imageMode(CENTER);
   image(
     this.img,
     cx,cy,
     IMG_CHAR_W,IMG_CHAR_H,
     dx*IMG_CHAR_W,this.direction*IMG_CHAR_H,
     IMG_CHAR_W,IMG_CHAR_H
     );
 }}

















