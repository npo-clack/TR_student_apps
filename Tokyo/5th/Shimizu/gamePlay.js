//'use strict';
const nextQuestionButton = document.getElementById('nextQuestion');
const currentQNum = document.getElementById('currentQNum');
const viewDifficulty = document.getElementById('difficulty');
const rePlay = document.getElementById('rePlay');
const answer = document.getElementById('answer');

const selectMenu = document.getElementById('selectMenu');
const gamePlayMenu = document.getElementById('gamePlayMenu');
const resultMenu = document.getElementById('resultMenu');

const finishBut = document.getElementById('finishButton');

const getDifficulty = localStorage.getItem('setDifficulty');
let difficulty = getDifficulty;
//console.log(localStorage.getItem('setDifficulty'));


//--------------画面表示--------------
function SelectMenuNone()//selectMenuOff
{
  selectMenu.style.display = 'none';
}

function SelectMenuView()//selectMenuON
{
  selectMenu.style.display = 'block';
}

function GamePlayMenuNone()//gamePlayMenuOff
{
  gamePlayMenu.style.display = 'none';
}

function GamePlayMenuView()//gamePlayON
{
  gamePlayMenu.style.display = 'block';
  selectDifficulty();
}

function ResultMenuNone()//resultMenuOff
{
  resultMenu.style.display = 'none';
}

function ResultMenuView()//resultMenuON
{
  resultMenu.style.display = 'block';
}

function SOffGOn()
{
  SelectMenuNone();
  GamePlayMenuView();
}


//-----------------セレクトボタンのプログラム-----------------
const easyButton = document.getElementById('easyButton');
const normalButton = document.getElementById('normalButton');
const hardButton = document.getElementById('hardButton');
const eternalButton = document.getElementById('eternalButton');

easyButton.addEventListener('click',function()
{
  difficulty = "Easy";
  SOffGOn();
});

normalButton.addEventListener('click',function()
{
  difficulty = "Normal";
  SOffGOn();
});

hardButton.addEventListener('click',function()
{
  difficulty = "Hard";
  SOffGOn();
});

eternalButton.addEventListener('click',function()
{
  difficulty = "Eternal";
  SOffGOn();
});


//--------------問題作成、表示関係--------------
const easyQuestions = 
[
  'A','B','C','D','E','F','G'
];
const easyQAudio =
[
  'sounds/A.mp3', 'sounds/B.mp3', 'sounds/C.mp3', 'sounds/D.mp3', 'sounds/E.mp3', 'sounds/F.mp3', 'sounds/G.mp3',
];

const hardQuestions = 
[
  'A','A#','B','C','C#','D','D#','E','F','F#','G','G#'
];
const hardQAudio =
[
  'sounds/A.mp3', 'sounds/A2.mp3', 'sounds/B.mp3', 'sounds/C.mp3', 'sounds/C2.mp3', 'sounds/D.mp3', 'sounds/D2.mp3', 'sounds/E.mp3', 'sounds/F.mp3', 'sounds/F2.mp3', 'sounds/G.mp3', 'sounds/G2.mp3'
];

const eternalQuestions =
[
  'A','A#','B','C','C#','D','D#','E','F','F#','G','G#','hiA','hiA#','hiB','hiC','hiC#','hiD','hiD#','hiE','hiF','hiF#','hiG','hiG#'
];
const eternalQAudio =
[
  'sounds/A.mp3', 'sounds/A2.mp3', 'sounds/B.mp3', 'sounds/C.mp3', 'sounds/C2.mp3', 'sounds/D.mp3', 'sounds/D2.mp3', 'sounds/E.mp3', 'sounds/F.mp3', 'sounds/F2.mp3', 'sounds/G.mp3', 'sounds/G2.mp3',
  'sounds/hiA.mp3', 'sounds/hiA2.mp3', 'sounds/hiB.mp3', 'sounds/hiC.mp3', 'sounds/hiC2.mp3', 'sounds/hiD.mp3', 'sounds/hiD2.mp3', 'sounds/hiE.mp3', 'sounds/hiF.mp3', 'sounds/hiF2.mp3', 'sounds/hiG.mp3', 'sounds/hiG2.mp3'
];

const jpName = ['ラ', 'シ', 'ド', 'レ', 'ミ', 'ﾌｧ', 'ソ'];

let questions = easyQuestions;
let randomQuestion = [];

let AudioItems = easyQAudio;
let AudioList = [];
let PlayList = [];
PlayList = new Audio();

let currentQuestionNum = 0;
let maxQuestions = 5;

let i = 0;
let lastRandom = [];

let resultData = [];

let maxSoundNum;

let inputKeys = "";

//--------------easy,normal,hardの問題作成--------------
function gameSystem()
{
  let random;
  for (let i = 0; i < maxQuestions; i++)
  {
    console.log('前回の出題 ' + lastRandom);
    function RandomInt()
    {
      min = Math.ceil(0);
      max = Math.floor(questions.length);
      random = Math.floor(Math.random() * (max - min) + min);
      if (random === lastRandom[0] || random === lastRandom[1] || random === lastRandom[2] || random === lastRandom[3] || random === lastRandom[4]) //前回の問題と被ったら
      {
        console.log('エラー ' + lastRandom,random + ' ' + questions[random]);
        RandomInt();
      }
      else (random != lastRandom) //前回の問題と被らなかったら
      {
        console.log('正常 ' + questions[random]);
        lastRandom[i] = random;
        return random;
      }
    }
    randomQuestion[i] = questions[RandomInt()];

    AudioList[i] = AudioItems[random];
    PlayList[i] = new Audio();
    PlayList[i].autoplay = false;
    PlayList[i].src = AudioList[i];
    PlayList[i].load();

    console.log('問' + (i + 1) + ' ' + randomQuestion[i]);
    console.log('------------------------------------');
  }
  console.log(randomQuestion);
  viewQuestion();
}

//--------------easy,normal,hardの問題数表示--------------
function viewQuestion()
{
  if (currentQuestionNum < maxQuestions)
  {
    randomQuestion[currentQuestionNum];
    console.log('view ' + randomQuestion[currentQuestionNum]);
  }
  else //存在しない6問目を表示しない&ページ移動
  {
    currentQuestionNum -= 1;
    Result();
    console.log('------------------------------------');
  }
  currentQNum.innerText = '第' + (currentQuestionNum + 1) + '問';
  console.log((currentQuestionNum + 1) + ' 問目 ' + randomQuestion[currentQuestionNum])
}


//--------------eternalの問題作成、問題数表示--------------
function eternalGameSystem()
{
  let random;
  console.log('-------------------------------------');
  console.log('前回の出題 ' + lastRandom[(i - 1)], + lastRandom[(i - 2)], + lastRandom[(i - 3)]);
  function RandomInt()
  {
    min = Math.ceil(0);
    max = Math.floor(questions.length);
    random = Math.floor(Math.random() * (max - min) + min);
    if (random === lastRandom[(i - 1)] || random === lastRandom[(i - 2)] || random === lastRandom[(i - 3)]) //前回の問題と被ったら
    {
      console.log('エラー ' + lastRandom[(i - 1)], + lastRandom[(i - 2)], + lastRandom[(i - 3)] + ' / 今回の抽選結果 : ' + random, questions[random]);
      RandomInt();
    }
    else (random != lastRandom) //前回の問題と被らなかったら
    {
      console.log('正常 ' + questions[random] + ' ' + random);
      lastRandom[i] = random;
      return random;
    }
  }
  randomQuestion[i] = questions[RandomInt()];

  AudioList[i] = AudioItems[random];
  console.log(AudioList);
  PlayList[i] = new Audio();
  PlayList[i].autoplay = false;
  PlayList[i].src = AudioList[i];
  PlayList[i].load();

  console.log('問' + (i + 1) + ' ' + randomQuestion[i]);
  console.log('-------------------------------------');

  currentQuestionNum = i;
  i += 1;
  currentQNum.innerText = i + ' 問目';
}

function eteResult()
{
  //Result(); //仮
  GamePlayMenuNone();
  ResultMenuView();
  resultText.innerText = currentQuestionNum + '問連続正解' 
}

finishBut.addEventListener('click', function()
{
  eteResult();
});


//--------------問題音源の再生・停止--------------
function playSounds()
{
  //console.log(PlayList[currentQuestionNum]);
  PlayList[currentQuestionNum].currentTime = 0;
  PlayList[currentQuestionNum].play();
}

function pauseSounds()
{
  //console.log(PlayList[currentQuestionNum]);
  PlayList[currentQuestionNum].pause();
}

rePlay.addEventListener('click', function()
{
  playSounds();
});


//--------------難易度選択後の処理--------------
function selectDifficulty()
{
  i = 0;
  console.log('-------------------------------------');
  console.log(difficulty);
  viewDifficulty.innerText = '現在の難易度 : ' + difficulty;
  if (difficulty === 'Eternal')
  {
    questions = eternalQuestions;
    AudioItems = eternalQAudio;
    finishBut.style.visibility = 'visible';
    eternalGameSystem();
  }
  else
  {
    if (difficulty === 'Easy')
    {
      maxQuestions = 3;
      questions = easyQuestions;
      AudioItems = easyQAudio;
      gameSystem();
    }

    else if (difficulty === 'Normal')
    {
      maxQuestions = 5;
      questions = easyQuestions;
      AudioItems = easyQAudio;
      gameSystem();
    }

    else if (difficulty === 'Hard')
    {
      maxQuestions = 5;
      questions = hardQuestions;
      AudioItems = hardQAudio;
      gameSystem();
    }
    else
    {
      console.log('難易度選択にエラーが発生しています。');
    }
  }
}

/*
viewDifficulty.innerText = '現在の難易度 : ' + difficulty;
if (difficulty === 'Easy' || difficulty === 'Normal' || difficulty === 'Hard' || difficulty === 'Eternal')
{
  selectDifficulty();
  SOffGOn();
}
*/


//--------------次の問題への移行--------------
function nextQ()
{
  pauseSounds();
  currentQuestionNum++;
  if (difficulty === 'Eternal')
  {
    eternalGameSystem();
  }
  else
  {
    viewQuestion();
  }
}

nextQuestionButton.addEventListener('click', function()
{
  if (answer.innerText.length > 0)
  {
    if (difficulty === 'Eternal')
    {
      if (answer.innerText === "回答を入力してください")
      {
        return;
      }
      else if (inputKeys === randomQuestion[currentQuestionNum])
      {
        resultData[currentQuestionNum, currentQuestionNum] = [1, inputKeys];
      }
      else
      {
        resultData[currentQuestionNum, currentQuestionNum] = [0, inputKeys];
        eteResult();
      }
    }
    else
    {
      if (answer.innerText === "回答を入力してください")
      {
        return;
      }
      else if (inputKeys === randomQuestion[currentQuestionNum])
      {
        resultData[currentQuestionNum, currentQuestionNum] = [1, inputKeys];
      }
      else
      {
        resultData[currentQuestionNum, currentQuestionNum] = [0, inputKeys];
      }
    }

    answer.innerText = '';
    inputKeys = '';
    nextQ();
  }
  else
  {
    answer.innerText = "回答を入力してください";
  }
  return;
});


//--------------リザルト画面--------------
const resultText = document.getElementById('result');
const otherDiff = document.getElementById('otherDifficulty');
otherDiff.addEventListener('click', function()//他の難易度を遊ぶ
{
  location.href = 'gamePlay.html';
});

function Result()//結果のまとめ
{
  GamePlayMenuNone();
  ResultMenuView();

  let yourAnswer = [];
  let CorrAns = 0;
  let CorrAnsRate;

  let resultSheet = '';

  console.log('Result : ' + resultData);

  for (let i = 0; i < resultData.length; i++)
  {
    CorrAns += resultData[i][0];
    if (resultData[i][0] === 1)
    {
      resultData[i][0] = '　正解';
    }
    if (resultData[i][0] === 0)
    {
      resultData[i][0] = '不正解';
    }
    yourAnswer[i] = resultData[i][1];
  }
  CorrAnsRate = ((CorrAns / resultData.length) * 100).toFixed(1);
  console.log('正答率' + CorrAnsRate);

  function resultInnerText()
  {
    resultSheet = '正誤,回答,解答\n';
    for(let i = 0; i < resultData.length; i++)
    {
      resultSheet = resultSheet + resultData[i][0] + ",";
      resultSheet = resultSheet + resultData[i][1] + ',';
      resultSheet = resultSheet + randomQuestion[i] + '\n';
    }
    resultSheet = resultSheet + '正答率 : ' + CorrAnsRate + '%'; 
    return resultSheet;
  }
  
  resultText.innerText = resultInnerText();
}


//--------------キーボード入力-------------
let inputKey;
function inputKeyCount(event)
{
  inputKey = "";

  if(event.key)
  {
    inputKey = event.key;
  }
  else
  {
    inputKey = event.target.innerText;
  }

  if (inputKey != "Enter" && inputKey != "Delete" && inputKey != "Backspace" && inputKey.length >= 2)
  {
    return;
  }
  else
  {
    if (inputKey == "Enter")
    {
      if (answer.innerText.length > 0)
      {
        if (difficulty === 'Eternal')
        {
          if (answer.innerText === "回答を入力してください")
          {
            return;
          }
          else if (inputKeys === randomQuestion[currentQuestionNum])
          {
            resultData[currentQuestionNum, currentQuestionNum] = [1, inputKeys];
          }
          else
          {
            resultData[currentQuestionNum, currentQuestionNum] = [0, inputKeys];
            eteResult();
          }
        }
        else
        {
          if (answer.innerText === "回答を入力してください")
          {
            return;
          }
          else if (inputKeys === randomQuestion[currentQuestionNum])
          {
            resultData[currentQuestionNum, currentQuestionNum] = [1, inputKeys];
          }
          else
          {
            resultData[currentQuestionNum, currentQuestionNum] = [0, inputKeys];
          }
        }
  
        answer.innerText = '';
        inputKeys = '';
        nextQ();
      }
      else
      {
        answer.innerText = "回答を入力してください";
      }
      return;
    }
  
    if (["Backspace","Delete"].includes(inputKey))
    {
      if (answer.innerText === "")
      {
        return;
      }
      if (answer.innerText === "回答を入力してください")
      {
        answer.innerText = "";
      }
      else if (answer.innerText === "hi")
      {
        answer.innerText = "";
        inputKeys = '';
      }
      else
      {
        let deleteLast = inputKeys.substring(0, inputKeys.length - 1);
        inputKeys = deleteLast;
        answer.innerText = inputKeys;
      }
      return;
    }
  }

  if (!Number.isNaN(Number(inputKey)))
  {
    return;
  }

  inputKey = inputKey.toUpperCase();

  //A~G以外のキー入力の反映を遮断する
  if (['A','B','C','D','E','F','G'].includes(inputKey))
  {
    if (inputKeys.length <= 1)
    {
      inputKeys = inputKey;
      answer.innerText = inputKeys;
      console.log(1);
    }
    else if (inputKeys.length >= 2)
    {
      console.log(2);
      if (inputKeys.indexOf('#') == 3 && inputKeys.indexOf('hi') == 0)
      {
        inputKeys = inputKey;
        handleSharpBut();
        handleHiBut();
      }
      else if (inputKeys.indexOf('#') == 1)
      {
        inputKeys = inputKey;
        handleSharpBut();
      }
      else if (inputKeys.indexOf('hi') == 0)
      {
        console.log(3)
        inputKeys = inputKey;
        handleHiBut();
      }
    }
    /*
    inputKeys = inputKeys + inputKey;
    */
    answer.innerText = inputKeys;
  }
}

document.onkeydown = inputKeyCount;

function handleHiBut()//hi~~のボタン
{
  if (inputKeys.length > 0)
  {
    if (inputKeys.indexOf('hi') != -1)
    {
      let deleteHi = inputKeys.substring(2, inputKeys.length);
      inputKeys = deleteHi;
    }
    else
    {
      inputKeys = 'hi' + inputKeys;
    }
    answer.innerText = inputKeys;
  }
}

function handleSharpBut()//~~#のボタン
{
  if (inputKeys.length > 0)
  {
    if (inputKeys.indexOf('#') != -1)
    {
      let deleteHi = inputKeys.substring(0, inputKeys.length - 1);
      inputKeys = deleteHi;
    }
    else
    {
      let lastChar = inputKeys.slice(-1);
      if (lastChar == 'A' || lastChar == 'C' || lastChar == 'D' || lastChar == 'F' || lastChar == 'G')
      {
        inputKeys = inputKeys + '#';
      }
      else
      {
        return;
      }
    }
    answer.innerText = inputKeys;
  }
}

/*
//同時押しによる半音、オクターブ上げの処理
let pushShift = false; // hi
let pushSpace = false; // #
let pushInputKey = false;

document.addEventListener('keydown', (event) =>
{
  if (event.key == "Shift")
  {
    pushShift = true;
    console.log('onShift');
  }
  else if (event.key == "Space")
  {
    pushSpace = true;
    console.log('onSpace');
  }
  else
  {
    console.log(10)
    pushInputKey = true;
  }
});

document.addEventListener('keyup', (event) =>
{
  if (event.key == "Shift")
  {
    pushShift = false;
    console.log('offShift');
  }
  else if (event.key == "Space")
  {
    pushSpace = false;
    console.log('offSpace');
  }
  else
  {
    pushInputKey = false;
  }
});

if (pushShift == true && pushInputKey == true)
{
  console.log(20);
  inputKeys = inputKey;
  handleSharpBut();
}

/*
document.addEventListener('keydown', keydownEvent,false);
function keydownEvent(event)
{
  if(event.spaceKey)
  {
    if(event.code === "keyA" || event.code === "keyC" || event.code === "keyD"  || event.code === "keyF"  || event.code === "keyG")
    {
      inputKeyCount(event.code);
      handleSharpBut();
    }
  }
}
*/

//--------------鍵盤作成--------------
function create()
{
  const whiteKeyboard = document.getElementById("whiteKeyboard");
  const deleteKeyboard = document.getElementById("delKey")
  let aCharCode = 'A'.charCodeAt();
  let i = 0;

  const hiButton = document.createElement("button");
  hiButton.innerText = "hi";
  hiButton.onclick = handleHiBut;
  whiteKeyboard.appendChild(hiButton);

  for (let j = aCharCode; j < aCharCode + 7; j++)
  {
    const letter = String.fromCharCode(j);
    let inText = jpName[i] + '\n' + letter;
    //console.log('日本名' + jpName[i]);
    const childButton = document.createElement("button");
    childButton.innerText = letter;
    childButton.onclick = inputKeyCount;
    whiteKeyboard.appendChild(childButton);
    i++;
  }

  const sharpButton = document.createElement("button");
  sharpButton.innerText = "#";
  sharpButton.onclick = handleSharpBut;
  whiteKeyboard.appendChild(sharpButton);
  
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.onclick = inputKeyCount;
  deleteKeyboard.appendChild(deleteButton);
}


//--------------開始時の動作--------------
SelectMenuView();
finishBut.style.visibility = 'hidden';
create();