const problemNext = document.getElementById('problemNext');
const problemBack = document.getElementById('problemBack');
const answerLeft = document.getElementById('answerLeft');
const answerRight = document.getElementById('answerRight');



let problemNum = 1 ;
let nextHiddenNum = [3,5,8,9,11,13,15,18,19,22,25,27,30,33,35,36];
let backHiddenNum = [1];



const problemBody = [
  `こんにちは!<br>まずはこのゲームのルールを確認してください。<br>「<div class=\"radius\">+</div>」を押してください。
  「&#x1F4A1;ヒント」を押すことでヒントやルールを見ることができます。
  <br>次の物語からゲームが始まります。「次の文章&#x1F449;」を押してください。`,

  `1章<br><br>
  ある山の森の中に井戸がありました。<br>
  井戸の横には一つの死体がありました。<br>
  死因は背後からの撲殺だと確認されました。<br>
  犯行現場は死体発見現場です。<br>
  井戸に使われていた石が凶器だと判明したからです。<br>
  その森の近くに旅館がありました。`,

  `死体が発見されたのはどこですか。<br>
  A:森の中　　　B:旅館の中<br>
    <button class=\"answerbuttons\"  onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`, 

  `死体を発見したのはその旅館の管理人Xでした。<br>
  森の中の井戸はその旅館のもので、管理人Xはその確認をしに来たところでした。<br>
  管理人Xが死体を発見したのは12月2日の12:00です。<br>
  旅館からその井戸までは往復で30分かかってしまいます。`,

  `死体を発見したのは誰ですか。
    <br>A:山に来たハイカー　　　B:旅館の管理人<br><button class=\"answerbuttons\" onClick=\"ProblemF()\">A</button>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">B</button>`,

  `今はその旅館は廃業していて、管理人Xが管理しているのみです。<br>
  旅館がたてられた理由はその山はブナの紅葉がきれいだからです。<br>
  観光客のためにその旅館は建てられました。<br>
  山の麓から閉業した旅館までは道がつながっています。<br>
  徒歩で麓から旅館まで1時間30分かかります。<br>
  徒歩で登って1時間の地点で道が二手にわかれます。<br>
  二手に分かれた道は旅館で再び一つに合わさります。`,

  `管理人Xが発見した死体の死亡推定時刻は11月30日の14:45~15:15です。<br>
  11月30分の15:00頃、旅館には大学生が数名いました。<br>
  大学生が集まっていた理由はその廃業した旅館で肝試しをするためです。<br>
  大学生は全員で4人でした。<br>
  4人だったため、肝試しの途中で誰かがいなくなったことはあり得ません。`,

  `麓から旅館への道はいつ二つに分かれますか。<br>
  A:徒歩で1時間地点　　　B:徒歩で30分地点<br>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `大学生たちが旅館にいたのはなぜですか。<br>
  A:肝試しをしていた　　　B:紅葉を見に来た<br>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `2章<br><br>
    大学生4人は、<br>
  ・大学生A<br>
  ・大学生B<br>
  ・大学生C<br>
  ・大学生Dです。<br>
  森の中で発見された死体は大学生Aのアルバイト先の大学生Pでした。`,
  
  `つまり、犯人はどういうことですか。<br>
  <button class=\"answerbuttons\" onclick=\"ProblemT()\">この中に犯人がいる</button>`,
  
  `
  大学生Pはキノコ採りが趣味でした。<br>
キノコ採りをし始めてまだ1カ月しかたっていないので知識はあまりありません。<br>
11月のキノコにはヒラタケがあります。
`,

`大学生Pの趣味は何ですか。<br>
A:ヒラタケ採り　　　B:キノコ採り<br>
<button class=\"answerbuttons\" onClick=\"ProblemF()\">A</button>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">B</button>`,

  `[大学生A]<br>
アルバイトは弁当屋の調理器具を洗うというものです。<br>
手がずっと濡れているから手がよく荒れてしまいます。<br>
洗い終わったらすぐに手を拭いたほうがいいと弁当屋の先輩にアドバイスしてもらいました。<br>
だから、青色のハンカチで手を拭きます。<br>
青色のハンカチは大切な人に名前を刺繍してもらったとても大切なものです。`,

`大学生Pのハンカチは何色ですか。<br>
A:わかりません　　　B:青色<br>
<button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `大学生4人は地元で話題の廃旅館へ肝試しへ行くことになりました。<br>
しかし、大学生Cは旅館への途中に道に迷いました。<br>
大学生Cが道に迷ったのは旅館に向かって山を登り始めた1時間後です。<br>
登り始めた時間は全員が確認しています。<br>
登り始めた時間は13:30だと全員が確認しました。`,

  `
15:00頃ちょうど旅館でほかの3人と合流することができました。<br>
大学生C以外の3人は一緒に旅館に向かいました。<br>
山の麓から旅館までは歩いて1時間30分で行くことができます。<br>
ちょうど1時間30分で着けたことが時計で確認できています。<br>
全員車は運転できません。
`,

`大学生4人は何時に山を登り始めたと思っていますか。<br>
A:13:00　　　B:13:30<br>
<button class=\"answerbuttons\" onClick=\"ProblemF()\">A</button>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">B</button>`,

`車を運転できるのは誰ですか。<br>
A:全員できる　　　B:全員できない<br>
<button class=\"answerbuttons\" onClick=\"ProblemF()\">A</button>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">B</button>`,    

  `[大学生D]<br>
旅館に入った後、電話がかかってきたと言って旅館の外にでました。<br>
電話は自分のの母からで、晩御飯についてでした。<br>
電話の着信時刻は15:05から15分間です。<br>
自分の母は電話が長いんです。<br>
旅館から死体発見現場までは往復30分かかるから、犯行は不可能です。
`,

  `[大学生B]<br>
肝試しに行くことになって緊張感を高めるためにスマホは全員家に置いていくことにしました。<br>
だから、大学生Dが電話がかかってきたから外へ出ると言われたときはびっくりしました。<br>
スマホは持っていないはずだったからです。<br>
でも山の中だったから圏外のはずです。<br>
時間は大学生Aの腕時計を見て確認できました。<br>
腕時計を持ってきていたのは大学生Aだけです。<br>
おばあちゃんにもらった時計だそうです。`,

`古い腕時計なら時間が狂うこともありますよね。<br>
A:あります　　　B:ありません<br>
<button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `[大学生D]<br>
道に迷うのが怖かったからスマホはこっそり持っていきました。<br>
旅館に着いて肝試しを始めたけれど怖かったから電話がかかってきたことにして外にでました。<br>
大学生Aが驚いた顔をしていて、スマホを置いていく約束をしたことを思い出しました。
`,

  `3章<br><br>
2019年11月の新聞記事<br>
今月20日午後8時ごろ、N県志村市の国道○号線で歩道に乗用車が突っ込む事故があった。<br>
そのとき歩道には同市中学2年生のCさん(14)と70代の女性が歩いており、女性は車に撥ねられて死亡した。中学生にけがはなかった。<br>
県警はこの時乗用車を運転していた職業不詳の男(41)を過失運転致死の疑いで現行犯逮捕した。
`,

`疲れたので休憩問題<br>
国道の標識の形はどちらですか。<br>
A:○　　　B:▽<br>
<button class=\"answerbuttons\" onClick=\"ProblemF()\">A</button>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">B</button>`,

  `2019年度6月の志村中学校の2年生の修学旅行は近畿方面になりました。<br>
2日目に京都府へ行きます。<br>
その時に立ち寄るお土産屋では青色のハンカチが有名です。<br>
修学旅行に来た生徒の多くはそこで青色のハンカチを買っていきます。`,

`志村中学校は何県にありますか。<br>
A:N県　　　B:X県<br>
<button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `
[ある弁当屋の防犯カメラ]2024年11月21日<br>
大学生A「ハンカチがない」<br>
一緒に探す大学生P。`,

  `大学生Aがハンカチをなくした2日後。<br>
大学生Aと大学生Pのアルバイト先の弁当屋では調理器具を手洗いでしています。<br>
洗うためにスポンジが必要です。<br>
先週、その弁当屋では大学生Pが新しいスポンジを用意しました。<br>
よくある青のスポンジです。<br>
大学生Pは店内清掃をアルバイトでしています。<br>
店内をきれいにするためにスポンジも新しくしました。`,

`大学生Pが変えたスポンジは何色ですか。<br>
A:青色　　　B:わかりません<br>
<button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `[大学生C]<br>
今月の24日だったと思います。<br>
大学生Aが「大学生Pが青色のハンカチを使っている」と言ってきました。<br>
大事なハンカチだから、「許せない、殺してもよい」とも言ってきました。<br>
祖母に名前を刺繍してもらったそうです。<br>
大学生Aの祖母は車に撥ねられて亡くなりました。<br>
大学生Aにとって青色のハンカチは祖母の形見なのです。`,

  `2020年4月の新聞記事<br>
昨年11月にN県志村市の国道○号線で歩道に乗用車が突っ込む事故があった。<br>
そのとき歩道には中学生と70代の女性が歩いていたのだが、女性が中学生を助けて犠牲となった。N県は亡くなった女性に感謝状を授与した。<br>
助けてもらった中学生は、「一生をかけてこの恩を返したい」と語った。`,

`2020年4月の新聞記事は何年何月の新聞のことを言っていますか。<br>
A:2019年6月　　　B:2019年11月<br>
<button class=\"answerbuttons\" onClick=\"ProblemF()\">A</button>
    <button class=\"answerbuttons\" onclick=\"ProblemT()\">B</button>`,

`4章
[大学生　]<br>
「一生をかけてこの恩を返したい」と語った。<br>
大学生Aは大学生Pの殺害を頼みました。<br>
断ることができませんでした。<br>
どうしたらいいだろう?`,

`車に撥ねられた女性と助けられた中学生は家族ですか。<br>
A:家族ではない...　　　B:祖母、孫の関係<br>
<button class=\"answerbuttons\" onclick=\"ProblemT()\">A</button>
    <button class=\"answerbuttons\" onClick=\"ProblemF()\">B</button>`,

  `物語はこれで終わりです。推理して犯人を突き止めてください。
  <br><button class=\"answerbuttons\" onClick=\"lastAnswer()\" >犯人を決める</button>`
]



problemNext.addEventListener('click', () => {
  if(problemNum >= 36){return false;}
  problemNum = problemNum + 1 ;
  const problemTitleElement = document.getElementById(`problem-title`);
  problemTitleElement.innerHTML = `物語${problemNum}`;

  const problemBodyElement = document.getElementById(`problem-body`);
  problemBodyElement.innerHTML = problemBody[problemNum - 1];

  problemBack.style.display=`inline-block`;

  updateDisplay();
  upgradeDisplay();
});

problemBack.addEventListener('click', () => {
  if(problemNum <= 1){return false;}
  problemNum = problemNum - 1 ;
  const problemTitle = document.getElementById(`problem-title`);
  problemTitle.innerHTML = `物語${problemNum}`;

  const problemBodyElement = document.getElementById(`problem-body`);
  problemBodyElement.innerHTML = problemBody[problemNum - 1];

  updateDisplay();
  upgradeDisplay();
});

function updateDisplay(){
  if (nextHiddenNum.indexOf(problemNum) >= 0) {
    problemNext.style.visibility= `hidden`;
}else{
  problemNext.style.visibility= `visible`;
}
}

function upgradeDisplay(){
  if(backHiddenNum.indexOf(problemNum)  >= 0){
    problemBack.style.display= `none`;
  }
}

function ProblemT() {
  problemNext.style.visibility=`visible`;
}

updateDisplay();
upgradeDisplay();



function ProblemF() {
  window.location.reload();
  alert(`誤った判断をしたため物語が再読み込みされます...
    ナゾ解きゲームが初めからになります。`);
}



const AnswerButton = document.getElementById('AnswerButton');
    function lastAnswer(){
      AnswerButton.style.display = `flex`;
    }



const map = document.getElementById('map');
const imageContainer = document.getElementById('imageContainer');
const mapClose = document.getElementById('mapClose');
    map.addEventListener(`click`,()=>{
      imageContainer.style.display = `block`;
    })
    mapClose.addEventListener(`click`,()=>{
      imageContainer.style.display = `none`;
    })



const memoButton = document.getElementById('memoButton');
const memoContainer = document.getElementById('memoContainer');
const memoBody = document.getElementById('memoBody');
const memoClose = document.getElementById('memoClose');
    memoButton.addEventListener(`click`,()=>{
      memoContainer.style.display = `grid`;
    })
    memoButton.addEventListener(`click`,()=>{
      memoBody.style.display = `block`;
    })
    memoClose.addEventListener(`click`,()=>{
      memoContainer.style.display = `none`;
    })
    memoClose.addEventListener(`click`,()=>{
      memoBody.style.display = `none`;
    })



const hint = document.getElementById('hint');
const hintContainer = document.getElementById('hintContainer');
const hintBody = document.getElementById('hintBody');
const hintClose = document.getElementById('hintClose');
    hint.addEventListener(`click`,()=>{
      hintContainer.style.display = `grid`;
    })
    hint.addEventListener(`click`,()=>{
      hintBody.style.display = `block`;
    })
    hintClose.addEventListener(`click`,()=>{
      hintContainer.style.display = `none`;
    })
    hintClose.addEventListener(`click`,()=>{
      hintBody.style.display = `none`;
    })



function Top() {
  window.scrollTo({top: 0, behavior: 'smooth'
  });
}


function Bottom() {
  window.scrollTo(0, document.body.scrollHeight
  );
}

function plus(){
const map = document.getElementById(`map`);
const memoButton = document.getElementById(`memoButton`);
const hint = document.getElementById(`hint`);  
if (map.style.display === 'none') {
  map.style.display = 'flex';
} else {
  map.style.display = 'none';
}
if (memoButton.style.display === 'none') {
  memoButton.style.display = 'flex';
} else {
  memoButton.style.display = 'none';
}
if (hint.style.display === 'none') {
  hint.style.display = 'flex';
} else {
  hint.style.display = 'none';
}
}



function plusA(){
  const mapNextButton = document.getElementById('mapNextButton');
  const hintNextButton = document.getElementById('hintNextButton');
  const textButton = document.getElementById(`textButton`);
  const checkButton = document.getElementById(`checkButton`);
  if (textButton.style.display === 'none') {
    textButton.style.display = 'flex';
  } else {
    textButton.style.display = 'none';
    }
  if (checkButton.style.display === 'none') {
    checkButton.style.display = 'flex';
  } else {
    checkButton.style.display = 'none';
    }
  if (mapNextButton.style.display === 'none') {
    mapNextButton.style.display = 'flex';
  } else {
    mapNextButton.style.display = 'none';
    }
  if (hintNextButton.style.display === 'none') {
    hintNextButton.style.display = 'flex';
  } else {
    hintNextButton.style.display = 'none';
    }  
  }



function Result(){
  window.open("index2.html");
}



function Texts(){
  const textBody = document.getElementById(`textBody`);
    if (textBody.style.display === 'none') {
      textBody.style.display = 'block';
    } else {
      textBody.style.display = 'none';
    }
  }

function check(){
const checkBody = document.getElementById(`checkBody`);
  if (checkBody.style.display === 'none') {
    checkBody.style.display = 'flex';
  } else {
    checkBody.style.display = 'none';
  }
}




function mapNext(){
  const imageContainerNext = document.getElementById('imageContainerNext');
  imageContainerNext.style.display= `block`;
}   
function mapCloseNext(){
  const imageContainerNext = document.getElementById('imageContainerNext');
  imageContainerNext.style.display=`none`;
}



function hintNext(){
  const hintContainerNext = document.getElementById('hintContainerNext');
  const hintBodyNext = document.getElementById('hintBodyNext');
  hintContainerNext.style.display=`block`;
  hintBodyNext.style.display=`block`;
}
function hintCloseNext(){
  const hintContainerNext = document.getElementById('hintContainerNext');
  const hintBodyNext = document.getElementById('hintBodyNext');
  hintContainerNext.style.display=`none`
  hintBodyNext.style.display=`none`;
}



function Omikuji() {
  let fortune = ["特大吉","大吉","大吉","中吉","中吉","中吉","小吉","小吉","小吉","小吉","吉","吉","吉","吉","吉","凶","凶","凶","凶","大凶",]
  let random = Math.floor(Math.random() * fortune.length);
  document.getElementById("omikujiResult").innerHTML = fortune[random];
}