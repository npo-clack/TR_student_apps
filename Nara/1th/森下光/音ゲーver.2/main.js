let audio = new Audio('path/to/song.mp3'); // 音楽ファイルのパスを指定
audio.play(); // 再生

// 音楽と同期したノート生成
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    if (Math.abs(currentTime - note.time) < 0.1) {
        createNoteAt(note.lane, note.time);
    }
});

// 音楽要素
const music = document.getElementById("gameMusic");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};
const notes = [];
let score = 0;
let songEnded = false;
let gameStarted = false;
let noteSpeed = 5;

// ノートデータ（例: JSON形式で外部ファイルから読み込むことも可能）
const noteData = [
    { lane: 0, time: 1.0 },
    { lane: 1, time: 2.5 },
    { lane: 2, time: 4.0 },
    { lane: 3, time: 5.5 },
    { lane: 2, time: 8.0 },
    { lane: 3, time: 8.0 } // 同時押しの例
];

// レーンとキーの対応
const lanes = [200, 300, 400, 500];
const laneKeys = {
    200: 'd', // レーン1
    300: 'f', // レーン2
    400: 'j', // レーン3
    500: 'k'  // レーン4
};

// ノート作成関数
function createNoteAt(lane, time) {
    notes.push({ 
        x: lanes[lane], 
        y: -20, 
        width: 50, 
        height: 20, 
        time 
    });
}

// ノーツ描画
function drawNotes() {
    notes.forEach(note => {
        ctx.fillStyle = "red";
        ctx.fillRect(note.x, note.y, note.width, note.height);
    });
}

// レーン描画
function drawLanes() {
    ctx.fillStyle = "green";
    lanes.forEach(lane => {
        ctx.fillRect(lane, canvas.height - 60, 50, 20);
    });
}

// ノーツ更新
function updateNotes(elapsedTime) {
    for (let i = notes.length - 1; i >= 0; i--) {
        const note = notes[i];

        // ノートの位置更新
        const timeDiff = elapsedTime - note.time;
        note.y = timeDiff * noteSpeed * 100; // 音楽時間に基づく移動

        // ノートが画面外に出た場合
        if (note.y > canvas.height) {
            notes.splice(i, 1); // ノートを削除
        }

        // ヒット判定
        if (
            keys[laneKeys[note.x]] && // 指定されたキーが押されている
            note.y > canvas.height - 80 && 
            note.y < canvas.height - 40
        ) {
            score += 10;
            notes.splice(i, 1); // ノートを削除
        }
    }
}

// ゲームオーバー画面表示
function showGameOver() {
    const gameOverDiv = document.createElement("div");
    gameOverDiv.className = "game-over";
    gameOverDiv.innerHTML = `Game Over!<br>Final Score: ${score}`;
    document.body.appendChild(gameOverDiv);
}

// ゲームループ
function gameLoop() {
    const elapsedTime = music.currentTime; // 音楽再生時間を基準に同期

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLanes();
    drawNotes();

    updateNotes(elapsedTime);

    // スコア更新
    document.getElementById("score").textContent = score;

    if (!songEnded) {
        requestAnimationFrame(gameLoop);
    }
}

// ノーツデータをロード
function loadNotes() {
    noteData.forEach(note => {
        createNoteAt(note.lane, note.time);
    });
}

// ゲーム開始
function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    noteSpeed = parseInt(document.getElementById("speed").value, 10);
    loadNotes();

    music.play();

    // 曲の終了を検出
    music.addEventListener("ended", () => {
        songEnded = true;
        showGameOver();
    });

    gameLoop();
}

// キーイベント
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);
