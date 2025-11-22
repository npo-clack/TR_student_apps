// --- グローバルで使う変数 ---
// ここではプログラム全体で使うデータを置きます。グローバル変数を使うと
// 「どこからでも値を参照できる」利点がありますが、たくさん増えると
// バグの原因になることがあります（大きいプログラムではモジュール化が推奨）。

// currentQuestions: シャッフルして出題する問題のリスト
// 例: [{question, correct, wrong}, ...]
let currentQuestions = [];

// currentQuestionIndex: 今表示している問題の番号（0始まり）
// なぜ0始まりか：JavaScript の配列は 0 から始まるため、配列のインデックスと合わせると扱いやすいです。
let currentQuestionIndex = 0;

// score: 正解数を数えるための変数
let score = 0;

// currentQuizType: 'prefecture'（都道府県）か 'capital'（世界の首都）のどちらかを保持
// これにより同じ関数を使って2種類の問題を切り替えられます。
let currentQuizType = null;

// userAnswers: ユーザーの選択履歴を保存する配列
// 格納例: { question: '〜？', selected: '選んだ答え', correct: '正解' }
// なぜ保存するか：結果表示で「どの問題をどう答えたか」を見せるために必要です。
let userAnswers = [];

// 出題数の上限について
// 以前はファイル内で MAX_QUESTIONS を定義して上限を設けていましたが、
// ユーザーがスタート画面で「全問」を選べるように、固定の上限は撤廃しました。
// （必要ならこの場所に上限を戻せます）

// startQuiz(type)
// クイズを始めるときに呼ぶ関数です。
// type に 'prefecture'（都道府県）か 'capital'（世界の首都）を渡してください。
// startQuiz(type)
// クイズ開始時に呼ばれる関数。
// - 引数: type = 'prefecture' または 'capital'
// - 役割: 問題データを読み込み、シャッフルして出題数分を準備し、画面を切り替える
// なぜシャッフルするか：毎回同じ問題順だと学習効果が下がるためランダムに出題します。
// 代替案：サーバーで問題を管理して出題する（より大規模な運用向け）。
function startQuiz(type) {
    // 使う問題データを取得（questions.js の quizData を参照）
    const allQuestions = quizData[type] || [];

    // 出題数はトップで定義した MAX_QUESTIONS を使う（ファイル全体で一元管理するため）
    // データ数が少ない場合はデータ数までに制限します。

    // どの種類のクイズかを記録
    currentQuizType = type;

    // 問題プールを選ぶ（type によって prefectureData か capitalData を使う）
    const pool = (type === 'prefecture') ? [...prefectureData] : [...capitalData];

    // スタート画面の選択（#question-count）からユーザーが選んだ出題数を取得します。
    // ユーザーが「全問(all)」を選んだ場合はプール長まで。数値を選んだ場合はその数値まで。
    // ユーザー選択（wanted）はデフォルトでプール全体とします。
    //（UIで数値を選べばその数、'all' を選べば pool.length）
    let wanted = pool.length;
    const sel = document.getElementById('question-count');
    if (sel) {
        const v = sel.value;
        if (v === 'all') {
            wanted = pool.length;
        } else {
            const n = parseInt(v, 10);
            if (!isNaN(n) && n > 0) wanted = n;
        }
    }
    // 出題数はユーザー指定（wanted）とプール長の最小値にします
    const total = Math.min(wanted, pool.length);

    // ここでランダムに total 問を選ぶ処理を行う
    currentQuestions = pickRandomQuestions(pool, total);

    // 状態を初期化
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = []; // 前の結果を消す

    // 結果画面に表示する総問題数を更新（結果画面を開いたときに使う）
    const totalElem = document.getElementById('total-questions');
    if (totalElem) totalElem.textContent = currentQuestions.length;

    // 画面を開始画面からクイズ画面に切り替える
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // 最初の問題を表示する
    showQuestion();
}

// showQuestion()
// 現在の問題を画面に表示します。
// showQuestion()
// 現在の問題（currentQuestionIndex）を画面に表示します。
// なぜ安全チェックが必要か：配列外アクセスは JS でエラーになるので、存在確認をしています。
// 代替案：問題リストの長さを監視してボタンを無効にする UI 方式もあります。
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];

    if (!question) {
        // 想定外の状況（問題が無い）では結果画面へ
        showResult();
        return;
    }

    // ユーザー向けは1始まりで表示
    document.getElementById('question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('question').textContent = question.question;

    // 選択肢を作る関数を使って5択を取得し、さらに順番をシャッフルして表示する
    const shuffledChoices = shuffleArray(buildChoices(question, currentQuizType));

    // 各選択肢をボタンにして表示（addEventListener を使う安全な実装）
    // 以前は inline onclick を使っていましたが、振る舞いと構造を分離するため
    // addEventListener へ置き換えています。これにより escapeForOnclick は不要になります。
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    shuffledChoices.forEach(choice => {
        const btn = document.createElement('button');
        btn.type = 'button';
        // textContent を使うことで HTML 挿入ではなくテキストとして安全に挿入します
        btn.textContent = choice;
        btn.addEventListener('click', function () {
            checkAnswer(choice);
        });
        choicesContainer.appendChild(btn);
    });
}

// 指定された問題とタイプから5つの選択肢（1正解 + 4誤答）を作成する
// buildChoices(question, type)
// 1つの問題とクイズの種類から、選択肢（5つ）を作って返す関数です。
// 戻り値: ['正解', '誤答1', '誤答2', '誤答3', '誤答4'] のような配列
// buildChoices(question, type)
// 1つの問題とクイズの種類から、5つ（正解1 + 誤答4）の選択肢を作って返します。
// なぜこの関数を分けるか：選択肢作成はロジックが固まっているため、表示ロジックと分けて
// テストや拡張をしやすくするためです。
// 代替案：サーバー側で選択肢を作成して返す（クライアントは表示だけ）
function buildChoices(question, type) {
    const correct = question.correct;

    // まず、ほかの問題に入っている正解や誤答をプールに集める
    let pool = [];
    if (type === 'prefecture') {
        // 都道府県問題の都市を集める
        quizData.prefecture.forEach(q => {
            pool.push(q.correct);
            (q.wrong || []).forEach(w => pool.push(w));
        });
        // 正解そのものは候補から外す（重複を避けるため）
        pool = pool.filter(item => item && item !== correct);
    } else {
        // 世界の首都のプール
        quizData.capital.forEach(q => {
            pool.push(q.correct);
            (q.wrong || []).forEach(w => pool.push(w));
        });
        // 問題の国名が含まれる選択肢は避ける（例: "日本の首都" -> "日本市"のような誤答を避ける）
        const countryName = String(question.question).split('の')[0];
        pool = pool.filter(item => item && item !== correct && !item.includes(countryName));
    }

    // 一意化してシャッフル（同じ候補が重複しないようにする）
    pool = Array.from(new Set(pool));
    pool = shuffleArray(pool);

    // 必要な誤答数
    const need = 4;
    let wrongs = pool.slice(0, need);

    // 足りないときは元の wrong 配列から補う
    if (wrongs.length < need) {
        const fallback = (question.wrong || []).filter(w => w !== correct);
        for (let i = 0; wrongs.length < need && i < fallback.length; i++) {
            if (!wrongs.includes(fallback[i])) wrongs.push(fallback[i]);
        }
    }

    // 都道府県問題では、ユーザーの要望どおり「県名＋市」の偽名を1つ入れる
    // なぜ偽名を入れるか：問題文に都道府県名があると正解が見破られやすいため。
    if (type === 'prefecture') {
        const prefectureName = String(question.question).split('の')[0];
        const base = prefectureName.replace(/都$|道$|府$|県$/, '');
        const fakeCandidates = [base + '市']; // ここは必ず「市」で終わる偽名にします

        // fakeCandidates から一つ選び、重複しないように wrongs に入れる
        let fake = null;
        for (let i = 0; i < fakeCandidates.length; i++) {
            const c = fakeCandidates[i];
            if (c && c !== correct && !wrongs.includes(c)) {
                fake = c;
                break;
            }
        }

        if (fake) {
            if (wrongs.length >= need) {
                const idx = Math.floor(Math.random() * need);
                wrongs[idx] = fake; // ランダムに一つ置き換える
            } else {
                wrongs.push(fake);
            }
        }

        // まだ足りない場合は元の誤答で補う
        if (wrongs.length < need) {
            const fallback = (question.wrong || []).filter(w => w !== correct && !wrongs.includes(w));
            for (let i = 0; wrongs.length < need && i < fallback.length; i++) wrongs.push(fallback[i]);
        }
    }

    // 最後に正解を先頭にして返す（呼び出し元でさらにシャッフルして表示します）
    const choices = [correct, ...wrongs].slice(0, 1 + need);
    return choices;
}

// 回答をチェックする関数
// checkAnswer(answer)
// ユーザーが選択肢をクリックしたときに呼ばれる関数です。
// 引数 answer はユーザーが選んだ文字列（選択肢）です。
// checkAnswer(answer)
// ユーザーが選択肢を押したときに呼ばれる処理です。
// - answer: クリックされた選択肢の文字列
// なぜ履歴を残すか：後で結果一覧で「あなたの答え / 正解」を表示するためです。
function checkAnswer(answer) {
    const current = currentQuestions[currentQuestionIndex];
    if (!current) {
        // 安全対策: 問題がない状態で呼ばれたら結果へ
        showResult();
        return;
    }

    // 正解ならスコアを増やす
    const correct = current.correct;
    if (answer === correct) {
        score++;
    }

    // 回答履歴に記録する（後で結果画面に表示するため）
    // ここで保存しておくと、ユーザーがどこを間違えたか振り返れます。
    userAnswers.push({ question: current.question, selected: answer, correct: correct });

    // 次の問題へ移る
    currentQuestionIndex++;

    // 全問終了かどうか（問題数は currentQuestions.length を基準にする）
    if (currentQuestionIndex >= currentQuestions.length) {
        showResult();
    } else {
        showQuestion();
    }
}

// 結果を表示する関数
// showResult()
// クイズ終了時に呼ばれて、結果画面を表示します。
// 作りとしては、まずクイズ画面を隠して結果画面を表示し、
// 保存しておいた userAnswers を使って詳細な正誤をリスト表示します。
// 代替案：結果はサーバーへ送って保存し、別ページで結果を表示する設計も可能です。
function showResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').textContent = score;

    // 正答率 (パーセント) を計算して表示する
        const total = currentQuestions.length || parseInt(document.getElementById('total-questions').textContent, 10) || 0;
        const percentElem = document.getElementById('percentage');
        if (percentElem) {
            const pctRaw = total > 0 ? (score / total) * 100 : 0;
            // 小数1桁で表示
            const pctText = pctRaw.toFixed(1);
            percentElem.textContent = `(正答率: ${pctText}%)`;

            // 既存の判定クラスを消す
            percentElem.classList.remove('pct-good', 'pct-mid', 'pct-bad', 'pct-animate', 'pop');

            // 閾値に応じてクラスを追加
            if (pctRaw >= 80) {
                percentElem.classList.add('pct-good');
            } else if (pctRaw >= 60) {
                percentElem.classList.add('pct-mid');
            } else {
                percentElem.classList.add('pct-bad');
            }

            // アニメーションをトリガー（クラス付けて短時間のポップを行う）
            // 一度削除して reflow を起こし、再付与することで常にアニメーションする
            percentElem.classList.add('pct-animate');
            // 軽いポップ効果も追加
            // force reflow
            void percentElem.offsetWidth;
            percentElem.classList.add('pop');
            // 300ms後に pop を外す（見た目を戻す）
            setTimeout(() => {
                percentElem.classList.remove('pop');
                // pct-animate は効果が終わったら残しておいても問題ないが、念のため消す
                percentElem.classList.remove('pct-animate');
            }, 420);
        }

    // 詳細な結果（各問題の選択と正解）を表示する
    const container = document.getElementById('detailed-results');
    if (container) {
        container.innerHTML = '';
        userAnswers.forEach((item, idx) => {
            const qnum = idx + 1;
            const isCorrect = item.selected === item.correct;
            const div = document.createElement('div');
            // 正誤によって行にクラスを付ける（視覚的な区別のため）
            div.className = 'result-item ' + (isCorrect ? 'correct' : 'wrong');
            div.innerHTML = `
                <div class="result-row">
                    <div class="qnum"><span class="mark ${isCorrect ? 'ok' : 'ng'}">${isCorrect ? '◯' : '✕'}</span> ${qnum}.</div>
                    <div class="qtext">${escapeHtml(item.question)}</div>
                    <div class="ans">あなた: <span class="user ${isCorrect ? 'ok' : 'ng'}">${escapeHtml(item.selected)}</span></div>
                    <div class="correct">正解: <span>${escapeHtml(item.correct)}</span></div>
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// クイズをリセットする関数
function resetQuiz() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    // 内部状態をクリア
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    // 結果表示をクリア
    const container = document.getElementById('detailed-results');
    if (container) container.innerHTML = '';
        const percentElem = document.getElementById('percentage');
        if (percentElem) {
            percentElem.textContent = '(正答率: 0.0%)';
            percentElem.classList.remove('pct-good', 'pct-mid', 'pct-bad', 'pct-animate', 'pop');
        }
}

// 配列をシャッフルする関数（Fisher–Yates）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// pickRandomQuestions(arr, n)
// 配列からランダムに n 個の要素を取り出して返す小さなヘルパーです。
// 元の配列を変更しない（非破壊）ためにスプレッドでコピーしてからシャッフルします。
function pickRandomQuestions(arr, n) {
    return shuffleArray([...arr]).slice(0, n);
}

// onclick に埋め込むテキストの簡易エスケープ
// シングルクォートをエスケープして JS の文字列リテラル内で安全にする
// NOTE: inline onclick を使わない実装に変更したため、escapeForOnclick は削除しました。

// HTMLを安全にする簡易関数（XSS対策のためにエスケープ）
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}