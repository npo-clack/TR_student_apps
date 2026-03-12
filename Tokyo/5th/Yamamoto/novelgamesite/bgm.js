//bgm.js

//bgm
var horror = new Audio();
horror.src = "bgm/horror22.mp3";
horror.volume = 0.5;
horror.loop = true; 

var kotoribako = new Audio();
kotoribako.src = "bgm/horror1_f.mp3";
kotoribako.volume = 1;
kotoribako.datastarttime = 0;
kotoribako.dataendtime = 72;
kotoribako.loop = true;

var hoshi  = new Audio();
hoshi.src = "bgm/hoshi.wav";
hoshi.volume = 1;
hoshi.loop = true;

//物語の進行に応じbgmを変更する関数
function play() {
  // BGN再生関数
  function playBGM(bgm) {
    bgm.play().catch(function(error) {
      // エラー処理
      console.error("BGMの再生に失敗しました:", error);
    });

    // BGMが終了したときに再生をリセット
    bgm.addEventListener("ended", function() {
      bgm.currentTime = 0;
      bgm.play();
    }, false);
  }
  
  // BGM停止関数
  function stopBGM(bgm) {
    bgm.pause(); // 再生を停止
    bgm.currentTime = 0; // 再生位置をリセット
  }


  if (sentenceIndex >= 0 && sentenceIndex <= 29) {
    playBGM(horror);
  } 
  if (sentenceIndex >= 30 && sentenceIndex <= 96) {
    stopBGM(horror);
    playBGM(kotoribako,);
  } else if (sentenceIndex >= 96 && sentenceIndex <= 112) {
    stopBGM(kotoribako);
  } else if (sentenceIndex >= 113 && sentenceIndex <= 255) {
    playBGM(hoshi);
  } else {
    stopBGM(hoshi);
  }
};


