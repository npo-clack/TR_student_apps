  let random;
  let lastRandom = [];
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
    console.log('問' + (i + 1) + ' ' + randomQuestion[i]);
  }
  console.log(randomQuestion);