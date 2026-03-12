//キーボードの入力状態を記録する配列の定義
let input_key_buffer=new Array();

//キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
window.addEventListener("keydown",handlekeydown);
function handlekeydown(e){
  e.preventDefault();
  input_key_buffer[e.keyCode]=true;
}

window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = false;
}

//canvas要素の取得
const canvas=document.getElementById("maincanvas")
const ctx=canvas.getContext("2d");

//画像を表示する座標の定義＆初期化
let x=0;
let y=0;

// //上下方向の速度
let vy=0;
// //ジャンプしたか否かのフラグ値
let isJump=false;

//ブロック要素の定義
let blocks=[
  {x:0,y:966,w:171,h:570},
  {x:171,y:1356,w:319,h:692}
]

//ロード中に処理が実行されるようにする
window.addEventListener("load",update);

//画面を更新する関数を定義
function update(){
//画面全体をクリア
ctx.clearRect(0,0,2048,1536);

//更新後の座標
let updatedX=x;
let updatedY=y;

//上下方向の速度
let vy=0;
//ジャンプしたか否かのフラグ値
let isJump=false;

//入力値の確認と反映
if(input_key_buffer[37]){
  //左が押されていればx座標を1減らす
  updatedX=x-2;
  console.log(updatedX)
}
if(input_key_buffer[38]){
  console.log('上が押されてるよ')
  console.log(isJump,isOnBlock(),updatedY)
  //上が押されていればジャンプ
  if(!isJump&&isOnBlock()){
  vy=-12;
  isJump=true;
  console.log('ブロックの上に載ってるよ')
   }
}
if(input_key_buffer[39]){
  //右が押されていればx座標を1増やす
  updatedX=x+2;
  console.log(updatedX)


}

// ジャンプ中でない場合にvyをリセット
if(!isJump){
  vy=0;
}

//ジャンプ中である場合のみ落下するように調整する
if(isJump){
  //上下方向は速度分を足す
  console.log(updatedY)
  updatedY=y+vy;
  console.log('aaaaa')
  console.log(updatedY)
  console.log(vy)

  //落下速度はだんだん大きくなる
  vy=vy+0.5;
  console.log('足された後の'+ vy)
}

// //主人公の画像下部が地面の上部より下となったタイミングでブロックの上にいるか否かの判断
// if(y+32>900){
//    updatedY=932-32;
// }


  //全てのブロックに対して繰り返し処理をする
  for(const block of blocks){
    if(
      (x+32<block.x||x>=block.x+block.w)&&
      (updatedX+32<block.x||x>=block.x+block.w)
    ){
      //ブロックの上にいない場合には何もしない
      continue;
    }
    //ブロックの上にいる場合にはジャンプを解除し、y座標をブロックの上にいるように見せる
    updatedY=block.y;
    isJump=false;
    break;
  }

//地面の画像を描画
let groundImage=new Image();
groundImage.src="image/panebigame_back.png";
ctx.drawImage(groundImage,0,0,2048,1536);

//主人公の画像を表示
let image=new Image();
image.src="image/dot_panebi.png";
ctx.drawImage(image,updatedX,updatedY,46,32);

//再描画
window.requestAnimationFrame(update);

// xとyを更新後の座標に更新
x = updatedX;
y = updatedY;

function isOnBlock() {
  for (const block of blocks) {
    if (
      ((x + 46 >= block.x && x < block.x + block.w) || (updatedX + 32 >= block.x && updatedX < block.x + block.w)) && // 横方向の接触判定
      (y + 32 >= block.y && y + vy < block.y && updatedY + 32 >= block.y) // 縦方向の接触判定
    ) {
      return true;
    }
  }
  return false;
}
}
