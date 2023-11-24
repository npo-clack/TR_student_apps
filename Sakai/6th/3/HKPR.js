let heading = document.getElementById('heading');
let degree = 0;
const p_tag = document.createElement("p");
p_tag.id = 'time';
const ready_go = document.createElement("img");
ready_go.id = 'ready_img';
ready_go.alt = 'カウントダウン';
let content_area = document.getElementById("ready_img");
let clicking = {
  clicount: 0,
  cliactive: false,
  clicounter: function(){
    if(clicking.cliactive == true){
      clicking.clicount += 1;
      const clicksound = new Audio('punch_clicksound.mp3');
      clicksound.volume = 0.5;
      clicksound.play();
    }
  }
}
let counting = {
  max: null,
  min: null,
  timax: null,
  timin: null,
  rotateHeading: function(){
    degree = degree + 10;
    heading.style.transform = 'rotateX(' + degree + 'deg)';
  },
  down: function(){
    // document.body.innerHTML += counting.max + '......<br>';
    counting.timax -= 100;
    counting.max = counting.timax / 1000;
    counting.rotateHeading();
    p_tag.innerText = counting.max;
    document.body.appendChild(p_tag);
    if(counting.timax < counting.timin){
      ready_go.src = 'gameset.png';
      content_area.appendChild(ready_go);
      clicking.cliactive = false;
      clearInterval(counting.interval1);
      alert('終了！結果を確認しよう。');
      p_tag.innerText = clicking.clicount + '回';
      document.body.appendChild(p_tag);
    }
  },
  timer: function(){
    // clearInterval(interval3);
    counting.timin = 0;
    counting.timax = maxval.value * 1000;
    counting.max = counting.timax / 1000;
    counting.min = counting.timin;
    // console.log("max" + max) // maxの値は何だろう？？？どこで定義している？
    // 数字じゃないかもしれない可能性を考えて、例外処理しているのえらい！！！
    if(!isNaN(counting.timax) && !isNaN(0)){
      counting.interval1 = setInterval(counting.down,100);
      clicking.clicount = 0;
      clicking.cliactive = true;
    }else if(isNaN(counting.timax) || isNaN(0)){
      p_tag.innerText = '数値を入力してください。';
      document.body.appendChild(p_tag);
    }
  },
  ready3: function(){
    ready_go.src = '3.png';
    content_area.appendChild(ready_go);
    const readysound = new Audio('readygosound.mp3');
    readysound.volume = 0.5;
    readysound.play();
    setTimeout(counting.ready2,1000)
  },
  ready2: function(){
    ready_go.src = '2.png';
    content_area.appendChild(ready_go);
    setTimeout(counting.ready1,1000)
  },
  ready1: function(){
    ready_go.src = '1.png';
    content_area.appendChild(ready_go);
    setTimeout(counting.readygo,1000)
  },
  readygo: function(){
    ready_go.src = 'go.png';
    content_area.appendChild(ready_go);
    setTimeout(counting.timer,1000)
  }
}
let maxval = document.getElementById('max');
// let minval = document.getElementById('min');
// let timeselected = document.getElementById('timerselect');
// timeselected.options.selected = true;
let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click',counting.ready3);
let clickButton = document.getElementById('clickButton');
clickButton.addEventListener('click',clicking.clicounter);
interval3 = setInterval(counting.rotateHeading, 100);