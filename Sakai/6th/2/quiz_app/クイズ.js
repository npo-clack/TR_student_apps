const quizData = [
  {
    title: "日本の首都は？",
    choices: [
      { ip: 1, value: "大阪" },
      { ip: 2, value: "京都" },
      { ip: 3, value: "東京" },
      { ip: 4, value: "名古屋" },
    ],
    correctId: 3,
  },
  {

  }
];

const quizSentence =
  document.getElementById('quiz_sentence');
const quizAnswerSelect =
  document.getElementById('quiz_answer_select');
const quizSendButton =
  document.getElementById('quiz_send_button');
const quizResult =
  document.getElementById('quiz_result');

const useQuizData = quizData[0];

//選択肢
for (const choice of useQuizData.choices) {
  quizAnswerSelect.innerHTML += `<input
  id="${choice.ip}" class="radio-inline__input"
  type="radio" name="answer" value="${choice.ip}"><label
  class="radio-inline__label"
  for="${choice.ip}">${choice.value}</label>`
}

//問題文
quizSentence.innerHTML = `<p>${useQuizData.title}</p>`;
// 1.ボタン押下時
quizSendButton.onclick = ev => {
  for (const element of
    quizAnswerSelect.querySelectorAll("input")) {
    if (element.checked) {
      const result = element.id ==
        useQuizData.correctId;
      const str = result ? "正解です" : "不正解です";
      quizResult.innerHTML = `<p>${str}</p>`;
    }
  }
};