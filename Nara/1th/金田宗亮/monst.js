let  = document.getElementById("chara");
let  = document.getElementById("boss");


function butotnClick2() {
  let charaTop = 450;
  let bossBOTTOM = 200;
  function moveGoku() {
    if (charaTop >= bossBOTTOM) {
      chara.style.top = charaTop + "px";
      charaTop -= 40;
    } else {
      alert("撃破");
    }
  }
  setInterval(moveGoku,70 );

}

let button = document.getElementById('moveButton');
let changeButton = document.getElementById("changeButton");
button.addEventListener('click', butotnClick2);


let charaImages = ["images/chara.png", "images/change.png"];
let currentcharaImage = 0;

changeButton.addEventListener("click", function() {
    currentcharaImage = (currentcharaImage + 1) % charaImages.length;
    chara.src = charaImages[currentcharaImage];
});


// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
button.addEventListener('click', butotnClick2);
