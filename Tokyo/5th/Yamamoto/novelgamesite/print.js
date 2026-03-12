//print.js
var sentenceIndex = 0;

// 物語の進行を制御する関数
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var interval=setInterval(function (){
      myText.render(text=sentences[sentenceIndex]);
      if (text= sentences[sentenceIndex].length){
        clearInterval(interval);
      }
      sentenceIndex++;
    },0);

    if (sentenceIndex > sentences.length - 1) {
      alert("終了です");
      location.reload();
  }
}

// ページの読み込み完了時のイベントリスナーを設定
window.addEventListener('load', function() {
  taitorubg.render();
});


//画像表示のインターバル
var interval2 =setInterval(function(){
},1000);


//物語の進行に応じて画像の表示を行う関数
function image(){

  if (sentences[sentenceIndex] === "") {
    clearInterval(interval2)
    horrorbg.render();
  } else if (sentenceIndex >= 1 && sentenceIndex <= 26){
    clearInterval(interval2)
    horrorbg.render();
    messageBox.render();
  } else if (sentenceIndex >= 27 && sentenceIndex <= 38){
    clearInterval(interval2)
    kotoribakobg.render();
    messageBox.render();
  } else if (sentenceIndex >= 39 && sentenceIndex <= 95){
    clearInterval(interval2)
    kotoribakobgbld.render();
    messageBox.render();
  } else if (sentenceIndex >= 96 && sentenceIndex <= 111){
    clearInterval(interval2)
    horrorbg.render();
    messageBox.render();
  }else if (sentenceIndex >= 112 && sentenceIndex <= 255){
    clearInterval(interval2)
    kotoribakobglst.render();
    messageBox.render();
  } else {
   clearInterval(interval2)
   messageBox.render();
  }
}

//クリックされたとき関数を実行
canvas.addEventListener("click", function(){
  update(); 
  image();
  play();
});


//物語を自動で進行させるCanvas
var AutoUpdate = document.getElementById("AutoCanvas");
var ctx2 = AutoCanvas.getContext("2d");
// myCanvasの右上にAutoCanvasを表示するためのスタイル設定
AutoCanvas.style.position = "absolute";
AutoCanvas.style.top = "10px";
AutoCanvas.style.left = "696px";

ctx2.fillStyle = "#fff";
ctx2.font = "20px serif";
ctx2.textAlign = "left";

ctx2.fillText("Auto", AutoCanvas.width / 2, AutoCanvas.height / 2); // "Auto" を描画


function Auto() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var interval=setInterval(function (){
    myText.render(text=sentences[sentenceIndex]);
    if (text= sentences[sentenceIndex].length){
      clearInterval(interval);
      setInterval(update, 3000);
      setInterval(image, 3000);
      setInterval(play,0);
      
      // クリックイベントリスナーを削除する
      AutoUpdate.removeEventListener("click", autoClickHandler);
    }
    sentenceIndex++;
  },0);

  if (sentenceIndex > sentences.length - 1) {
    alert("終了です");
    location.reload();
}
}

//クリックされたとき関数を実行
function autoClickHandler() {
  Auto();
  image();
  play();
}

// クリックイベントリスナーを追加
AutoUpdate.addEventListener("click", autoClickHandler);
