'use strict'
//HTML要素を取得

//答えを入れていく箱
const answers = [];

const question0 = document.querySelector('.question0');
const question1 = document.querySelector('.question1');
const question2 = document.querySelector('.question2');
const question3 = document.querySelector('.question3');
const question4 = document.querySelector('.question4');

let currentIndex = 0;

const questions = document.querySelectorAll('.question0, .question1, .question2, .question3, .question4');

const questionElements = document.querySelectorAll('[class^="question"]');
const barContainer = document.querySelector('.progress-bar-container');
const barFill = document.querySelector('.progress-bar-fill');
const totalQuestions = questionElements.length;

const resultTypeCoffee = document.querySelector('.result-type-name');
const resultTypeDescription = document.querySelector('.result-type-description');
const resultTypePlus = document.querySelector('.result-type-plus');
const labelCount = document.querySelector('.label-count');
const quizContainer = document.getElementById('quiz-container');
const quizBody = document.getElementById('quiz-body');
const resultArea = document.getElementById('result-area');
//スコア表
const score = {
  Brasil : 0,
  Kilimanjaro: 0,
  Colombia: 0,
  Mexico: 0,
  Mandeling:0,
  Ethiopia: 0,
  Honduras: 0,
 BlueMountain : 0,
};
//質問番号　(0~) ・選択肢・優先したい豆
const priorityRules = [
  {questionIndex: 0, answer: "ブラック", prefer: "Mandeling"},
  {questionIndex: 1, answer: "フルーティ系", prefer: "Ethiopia"},
  {questionIndex: 2, answer: "ナッツやチョコレートのような", prefer: "Mexico"},
  {questionIndex: 3, answer: "普通", prefer: "Colombia"},
  {questionIndex: 0, answer: "ミルクを入れる", prefer: "Honduras"},
  {questionIndex: 0, answer: "何でもいい", prefer: "BlueMountain"}
];

const resultData = {
Brasil: {
  name:"ブラジル",
  description:"酸味が少なく、苦みとコクが深いブラジルをお勧めします",
  plus:"ブラジルは苦みとコクからナッツ系のスイーツ、クッキーやフィナンシェによく合います"
},
Kilimanjaro: {
  name:"キリマンジャロ",
  description:"柑橘系のフルーティーな甘さが感じられる酸味とコクのバランスがいいアフリカの大地を思わせる野性味溢れるキリマンジャロをお勧めします",
  plus:"キリマンジャロは爽やかな酸味から、柑橘系やベリー系のスイーツによく合います"
},
Colombia: {
  name:"コロンビア",
    description:"ほのかなフルーティーさとナッツやチョコレートの風味がありマイルドで強い豊かなコクのコロンビアをお勧めします",
    plus:"コロンビアはチョコレートやナッツ系はもちろんスパイシーな料理、カレーやインド料理も味のコントラストを楽しめます"
},
Mexico: {
name: "メキシコ",
  description:"控えめな苦みに、バランスのいいナッツやチョコレートの甘みと酸味のメキシコをお勧めします",
  plus:"メキシコはスパイスと相性がよく、メキシコ料理のタコスやチリコンカンとも合います"
},
Mandeling: {
  name:"マンデリン",
  description:"酸味が少なく、重厚なコクと力強い苦みにハーブやシナモンなどのスパイシーな香りのマンデリンをお勧めします。" ,
  plus:"マンデリンはインドネシア料理、ナシゴレン、ミーゴレンなど一緒に楽しむと、南国気分を味わえます"
},
Ethiopia: {
  name: "エチオピア",
  description:"フルーティな酸味と柑橘系や、ジャスミンを思わせる香りが特徴でよくコーヒーの貴婦人と称されるエチオピアコーヒーがお勧めです。" ,
  plus:"エチオピアは華やかな香りから、スモークサーモンや、生ハムなどの旨味が相性がよく、柑橘系の料理にもよく合います"
},
Honduras: {
  name: "ホンジュラス",
  description:"苦味は少し抑え目で軽やかなのでミルクや砂糖などもよく合うホンジュラスがお勧めです。" ,
  plus:"ホンジュラスはハーブやを使った料理に合い脂っこい料理では、料理を引き立てながら口の中をすっきりさせてくれます"
},
BlueMountain: {
  name: "ブルーマウンテン",
  description:"苦味、酸味、甘みすべてのバランスがいいコーヒーの王様ブルーマウンテンがお勧めです。" ,
  plus:"ブルーマウンテンはチーズケーキやチョコレートなどと一緒に楽しみとお互いを引き立て合い、素朴な味わいのマフィンやパウンドケーキではブルーマウンテンの味わいえお楽しめます"
}
};

quizBody.addEventListener(
  'change',
  function(event) {
  const clickButton = event.target;
  const clickButtonName = clickButton.name;
 currentIndex = parseInt(clickButtonName.replace("q-",""));

const value = clickButton.value;
answers[currentIndex] = value; // インデックスで上書きする

  updateProgress(currentIndex);
  moveToNextQuestion(currentIndex);
  });


  function updateProgress(currentIndex) {
  const percent = ((currentIndex + 1)/ totalQuestions) * 100 ;
  barFill.style.width = percent + "%";
  labelCount.innerText =`${currentIndex + 1} / ${totalQuestions} 問目`;
}

function moveToNextQuestion (currentIndex) {
const currentQuestion = document.querySelector(`.question${currentIndex}`);
const nextQuestion = document.querySelector(`.question${currentIndex + 1}`);


currentQuestion.classList.add('fade-out');

setTimeout(() => {
  currentQuestion.classList.add('hidden');
  if(nextQuestion) {
    nextQuestion.classList.remove('hidden');
 nextQuestion.classList.add('fade-in');
 currentQuestion.classList.add('fade-out');
  } else { 
    showResult();
  }
},600);
}
function showResult() {
    resultArea.classList.remove('hidden');
    barContainer.classList.add('hidden');

  answers.forEach(answer =>{
  switch (answer) {
    case 'ブラック': score.Mandeling += 2;
                    score.Ethiopia += 2;
                    score.Colombia += 1;
                    score.Mexico += 1;
                    score.Kilimanjaro += 2;
                    score.Honduras += 1;
  break;
  case 'ミルクを入れる':score.Honduras += 1;
                       score.Brasil += 1;
                       
  break;
  case '何でもいい': score.Colombia += 1;
                    score.Brasil += 1;
                    score.BlueMountain += 1;
                    score.Mexico += 1; 
  break;
  case 'フルーティ系': score.BlueMountain += 2;
                     score.Ethiopia += 3;
                     score.Kilimanjaro += 2;
  break;
  case 'ナッツやチョコレート系': score.Mexico += 2;
                               score.Brasil += 2;
                               score.Colombia += 2;
                               score.Honduras += 3;
  break;
  case 'スモーキー系': score.Mandeling += 3;
                      score.Ethiopia += 1;
  break;
  case '強い': score.Ethiopia += 3;
               score.BlueMountain += 1;
  break;
  case '普通': score.Colombia += 1;
              score.Brasil += 1;
              score.BlueMountain += 2;
              score.Honduras += 1;
  break;
  case '少なめ': score.Mandeling += 1;
                score.Mexico += 2;
                score.Brasil += 1;
  break;
  case '深煎り':score.Mandeling += 2;
                score.Colombia += 2;
                 score.Honduras += 2;
                  score.Brasil += 1;
                  score.Mexico += 2;
              
  break;
  case '中煎り':score.Brasil += 1;
               score.BlueMountain += 1;
               score.Kilimanjaro += 1;
               score.Honduras += 1; 
  break;
  case '浅煎り': score.Ethiopia += 2;
                score.BlueMountain += 1;
                score.Kilimanjaro += 2;

  break;
  case 'フローラル・華やか': score.Ethiopia += 2;
                           score.BlueMountain+= 2;
                           score.Honduras += 1;
                           score.Kilimanjaro += 2;
  break;
  case 'ナッツ・チョコのような': score.Brasil += 1;
                              score.Colombia += 1;
                              score.Mexico += 2;
                               score.Honduras += 1;
  break;
  case 'スモーキー・ビター': score.Mandeling += 3;
                           score.Honduras += 1; 
  break;
  default:
  console.warn('未対応の回答: ', answer);
  };
});
 let max = -1;
 let bestBeans = [];
 for(const bean in score) {
  if(score[bean] > max) {
  max =score[bean];
  bestBeans = [bean];//新しい最高得点が見つかったらリセット
 } else if (score[bean] === max) {
    bestBeans.push(bean); //同じ得点なら追加
 }
 }
 let finalBean = bestBeans[0];//デフォルトは最初の同点豆
 if (bestBeans.length > 1) {
  for (const rule of priorityRules) {
    if (
      answers[rule.questionIndex] === rule.answer &&
      bestBeans.includes(rule.prefer)
    ) {
      finalBean = rule.prefer;//優先ルールに合致したら採用
      break;
    } 
  }
 }
 if (!finalBean) {
  finalBean = bestBeans[0];
 }
  resultTypeCoffee.innerText = resultData[finalBean].name; 
 resultTypeDescription.innerText = `${resultData[finalBean].description}`;
 resultTypePlus.innerText = resultData[finalBean].plus;
}   
