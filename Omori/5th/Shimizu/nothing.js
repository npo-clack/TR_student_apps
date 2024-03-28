for(let i = 0; i < maxQuestions; i++)
{
  if (i === 0)
  {
    function RandomInt()
    {
      min = Math.ceil(0);
      max = Math.floor(questions.length);
      return Math.floor(Math.random() * (max - min) + min);
    }
    lastQuestionNumber = questions[RandomInt()];
    randomQuestion[i] = questions[RandomInt()];
  }
  if (i > 0)
  {
    function RandomInt()
    {
      min = Math.ceil(0);
      max = Math.floor(questions.length);
      return Math.floor(Math.random() * (max - min) + min);
    }
    if (questions[RandomInt()] === lastQuestion)
    {
      i - 1;
    }
    else
    {
      lastQuestionNumber = questions[RandomInt()];
      randomQuestion[i] = questions[RandomInt()];
    }
  }
}
console.log(randomQuestion);