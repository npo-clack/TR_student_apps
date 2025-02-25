//グローバル変数と定数

const BUTTONS_TOP = 400; // 各レーンのボタン上部のY座標
const BUTTONS_HEIGHT = 50; // 各レーンのボタンの高さ

const LANE_WIDTH = 70; // レーンの幅
const LANE_LEFTS = [10, 100, 190, 280]; // 各レーンの左側のX座標
const BLOCK_HEIGHT = 50; // 落ちてくるブロックの当たり判定のある部分の高さ

// 落ちてくるブロックの当たり判定のある部分のY座標の最小値と最大値
const HIT_Y_MIN = BUTTONS_TOP - BLOCK_HEIGHT;
const HIT_Y_MAX = BUTTONS_TOP + BUTTONS_HEIGHT;

// canvasの幅と高さ
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 540;

// 開始ボタンと各レーン（0番～3番）のボタンの要素
const $start = document.getElementById('start');
const $zero = document.getElementById('zero');
const $one = document.getElementById('one');
const $two = document.getElementById('two');
const $three = document.getElementById('three');

// canvas要素とコンテキスト
const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');

// BGM
const bgm = new Audio('bgm.mp3');

// 落ちてくるブロックの配列
let blocks = [];

// ヒット、ミス、見逃しの文字を表示するレーンの配列
const hitLaneNumbers = [];
const missLaneNumbers = [];
const throughLaneNumbers = [];

let isPlaying = false; // 現在プレイ中か？
let speed = 1; // 落下速度
let hitCount = 0; // 成功数
let missCount = 0; // ミス数
let throughCount = 0; // 見逃し数

// 各レーンのボタンをキャンバスの下に配置する処理
function setPositionButtons() {
    const buttons = [$zero, $one, $two, $three];

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.position = "absolute";
        buttons[i].style.left = (LANE_LEFTS[i] - 10) + "px";  // X位置を調整
        buttons[i].style.bottom = "-60px";  // キャンバスの下に配置
        buttons[i].style.width = LANE_WIDTH + "px";
        buttons[i].style.height = BUTTONS_HEIGHT + "px";
    }
}
//描画処理
//canvasをクリアする処理を示します。
function clearCanvas(){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
}

//各レーンを描画する処理を示します。
function drawLanes(){
    ctx.strokeStyle = '#ccc';
    for(let i =0; i < LANE_LEFTS.length; i++)
        ctx.strokeRect(LANE_LEFTS[i], 0, LANE_WIDTH, $canvas.height);
}

//ヒットしたとき該当レーンに’HIT’と表示する処理を示します。
function drawHit(laneNum){
    ctx.fillStyle = '#0ff';
    ctx.font = '20px bold ＭＳ ゴシック';
    const textWidth = ctx.measureText('GOOD').width;
    ctx.fillText('GOOD', LANE_LEFTS[laneNum] + (LANE_WIDTH - textWidth) / 2, HIT_Y_MAX + 10);
}

//見逃したときにしたとき該当レーンに’Miss’と表示する処理を示します。
function drawThrough(laneNum){
    ctx.fillStyle = '#ff0';
    ctx.font = '20px bold ＭＳ ゴシック';
    const textWidth = ctx.measureText('MISS').width;
    ctx.fillText('MISS', LANE_LEFTS[laneNum] + (LANE_WIDTH - textWidth) / 2, HIT_Y_MAX + 30);
}

//間違えてタップしたとき該当レーンに’Miss’と表示する処理を示します。
function drawMiss(laneNum){
    ctx.fillStyle = '#f0f';
    ctx.font = '20px bold ＭＳ ゴシック';
    const textWidth = ctx.measureText('BAD').width;
    ctx.fillText('BAD', LANE_LEFTS[laneNum] + (LANE_WIDTH - textWidth) / 2, HIT_Y_MAX + 50);
}

//ヒット時の処理を示します
function onHit(laneNum){
    hitCount++;
    hitLaneNumbers.push(laneNum);
    setTimeout(() => {
        hitLaneNumbers.shift();
    }, 500);
}

//ミス時の処理を示します
function onMiss(laneNum){
    missCount++;
    missLaneNumbers.push(laneNum);
    setTimeout(() => {
        missLaneNumbers.shift();
    }, 500);
}

//見逃し時の処理を示します。
function onThrough(laneNum){
    throughCount++;

    throughLaneNumbers.push(laneNum);
    setTimeout(() => {
        throughLaneNumbers.shift();
    }, 500);
}

////////////////////////////////////////////////////////////////////////////////
//2/8日に追加
// キーボードのキーを押したときの処理
document.addEventListener('keydown', (event) => {
    if (!isPlaying) return; // ゲームが開始していない場合は何もしない

    // キーとレーン番号の対応表を作成
    let keyLaneMap = {
        'v': 0, // Aキー → レーン0（左）
        'b': 1, // Sキー → レーン1
        'n': 2, // Dキー → レーン2
        'm': 3  // Fキー → レーン3（右）
    };

    // 押されたキーに対応するレーン番号を取得
    let laneNum = keyLaneMap[event.key.toLowerCase()];

    // キーが `A`, `S`, `D`, `F` のいずれかでない場合は何もしない
    if (laneNum === undefined) return;

    // そのレーンにヒットの対象となるブロックがあるかを判定
    const hits = blocks.filter(rect => 
        !rect.IsHit && // まだヒットしていないブロック
        rect.X == LANE_LEFTS[laneNum] && // 押されたキーのレーンにあるブロック
        HIT_Y_MIN < rect.Y && rect.Y < HIT_Y_MAX // ヒット判定の範囲内
    );

    if (hits.length > 0) {
        // ブロックが当たり判定内にある場合はヒット処理を実行
        hits[0].IsHit = true; // 二重判定を防ぐためのフラグをセット
        onHit(laneNum); // ヒット時の処理を呼び出し
    } else {
        // 当たり判定内にブロックがない場合はミス処理を実行
        onMiss(laneNum);
    }
});
////////////////////////////////////////////////////////////////////////////////

//Blockクラスの定義
class Block{
    constructor(laneNum, delay){
        this.LaneNumber = laneNum;
        this.X = LANE_LEFTS[laneNum];
        this.Y = - 80 * delay;
        this.Width = LANE_WIDTH;
        this.Height = BLOCK_HEIGHT;

        // ヒットと見逃しを二重に評価しないためのフラグ
        this.IsHit = false;
        this.IsThrough = false;
    }

    Update(){
        // ヒットされていないのにHIT_Y_MAXより下に落ちてきたら見逃しと判断する
        if(!this.IsHit && !this.IsThrough && this.Y > HIT_Y_MAX){
            this.IsThrough = true;
            onThrough(this.LaneNumber);
        }
        this.Y += speed;
    }

    Draw(){
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.X, this.Y + 20, this.Width, this.Height - 40);
        //ctx.fillRect(this.X, this.Y, this.Width, this.Height);でもよいがブロックが厚くなりすぎるので・・・
    }
}


//ページが読み込まれたときの処理
//ページが読み込まれたときの処理を示します
window.onload = () => {
    $canvas.width = CANVAS_WIDTH;
    $canvas.height = CANVAS_HEIGHT;

    clearCanvas();
    drawLanes();

    $start.addEventListener('click', (ev) => {
        ev.preventDefault();
        gameStart();
    });

    setPositionButtons(); // 後述
    addEventListeners(); // 後述
    // Enterキーでゲーム開始
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space" && !isPlaying) {
            gameStart();
        }
    });
}

//各レーンのボタンを適切な位置に移動させる処理を示します。
function setPositionButtons(){
    const buttons = [$zero, $one, $two, $three];
    for(let i = 0; i < buttons.length; i++){
        buttons[i].style.left = LANE_LEFTS[i] + 'px';
        buttons[i].style.top = BUTTONS_TOP + 'px';
        buttons[i].style.width = LANE_WIDTH + 'px';
        buttons[i].style.height = BUTTONS_HEIGHT + 'px';
    }
}

//STARTボタンがクリックされたらgameStart関数を呼びだしてゲームを開始します。
function addEventListeners(){
    $start.addEventListener('click', (ev) => {
        ev.preventDefault();
        gameStart();
    });

    // PCスマホ両方に対応させる（clickイベントだと反応が遅くなるので'mousedown', 'touchstart'を使う）
    const buttons = [$zero, $one, $two, $three];
    const events = ['mousedown', 'touchstart'];

    for(let i = 0; i < LANE_LEFTS.length; i++){
        for(let k = 0; k < events.length; k++){
            buttons[i].addEventListener(events[k], (ev) => {
                ev.preventDefault();

                if(!isPlaying)
                    return;

                // タップしたときにそのレーンにヒットの対象になるブロックは存在するか調べる。
                const hits = blocks.filter(rect => !rect.IsHit && rect.X == LANE_LEFTS[i] && HIT_Y_MIN < rect.Y && rect.Y < HIT_Y_MAX);
                if(hits.length > 0){
                    hits[0].IsHit = true; // 二重に評価しないためのフラグをセット
                    onHit(i);
                }
                else
                    onMiss(i);
            });
        }
    }
}
// ヒット時の処理（ノーツを押したときに消えるようにする）
function onHit(laneNum) {
    hitCount++;

    // 押されたレーンにあるブロックを探す
    blocks = blocks.filter(block => {
        if (block.LaneNumber === laneNum && HIT_Y_MIN < block.Y && block.Y < HIT_Y_MAX) {
            return false; // 条件に合うブロックは削除
        }
        return true; // それ以外のブロックは残す
    });

    hitLaneNumbers.push(laneNum);
    setTimeout(() => {
        hitLaneNumbers.shift();
    }, 500);
}

//更新処理
//タイマー処理の部分を示します
setInterval(() => {
    if(!isPlaying)
        return;

    if(speed < 5)
        speed += 0.005;

    clearCanvas();
    drawLanes();

    blocks.forEach(block => block.Update());
    blocks.forEach(block => block.Draw());

    hitLaneNumbers.forEach(num => drawHit(num));
    throughLaneNumbers.forEach(num => drawThrough(num));
    missLaneNumbers.forEach(num => drawMiss(num));

    // canvas上部にスコアを表示
    ctx.font = '20px bold ＭＳ ゴシック';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.fillText(`GOOD  ${hitCount}    MISS  ${throughCount + missCount}`, 10, 10);
}, 1000 / 60);


//ゲーム開始時の処理
function gameStart(){
    blocks.length = 0;

    // 上から落ちてくるブロックをランダムに生成する
    // だんだん間隔を詰める
    for(let i=0; i < 40; i += 2)
        blocks.push(new Block(Math.floor(Math.random() * 4), i));
    for(let i=40; i < 70; i += 1.5)
        blocks.push(new Block(Math.floor(Math.random() * 4), i));
    for(let i=70; i < 10000; i ++)
        blocks.push(new Block(Math.floor(Math.random() * 4), i));

    // スコアをリセット
    hitCount = 0;
    missCount = 0;
    throughCount = 0;

    speed = 9;
    isPlaying = true;

    // BGMを鳴らす
    bgm.currentTime = 0;
    bgm.play();

    // 開始ボタンを非表示に
    $start.style.display = 'none';

    // BGMの終了近くになったら以降は新しいブロックを落とさないようにする
    // blocksからY座標が-10以下のものと取り除く（ついでに必要ないCANVAS_HEIGHT以上のものの取り除く）
    setTimeout(() => {
        blocks = blocks.filter(rect => rect.Y > -10 && rect.Y < CANVAS_HEIGHT);
    }, 1000 * 100);

    // BGMが終了したタイミングで更新処理を停止してドラムロールを鳴らして結果を表示する
    setTimeout(async() => {
        isPlaying = false;

        bgm.pause();
        await playDrumroll(); // 後述

        const resultText = `Hit: ${hitCount}\n見逃し: ${throughCount}\nMiss: ${missCount}`;
        showResult(resultText); // 後述
    }, 1000 * 103);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2月2日に変更した
//終了時の処理
// 結果を表示する処理
function showResult(resultText) {
    const arr = resultText.split('\n');
    if (arr.length < 3) return;
    ctx.fillStyle = '#ff0';
    ctx.font = '20px bold ＭＳ ゴシック';
    const textWidth1 = ctx.measureText('結果').width;
    const x1 = (CANVAS_WIDTH - textWidth1) / 2;
    ctx.fillStyle = '#fff';
    ctx.fillText('結果', x1, 160);
    const textWidth = ctx.measureText(arr[1]).width;
    const x = (CANVAS_WIDTH - textWidth) / 2;
    ctx.fillStyle = '#0ff';
    ctx.fillText(arr[0], x, 200);
    ctx.fillStyle = '#ff0';
    ctx.fillText(arr[1], x, 230);
    ctx.fillStyle = '#f0f';
    ctx.fillText(arr[2], x, 260);
    $start.style.display = 'block';
    // 3秒後にスコアを確認し、○○以上なら story2.html に遷移
    setTimeout(() => {
        //下の数が変えて何ヒットでクリアできるようにする
        if (hitCount > 200) {
            window.location.href = "story_end.html";
        } else{
            window.location.href="story_badend.html";
        }
        //結果が出てから3秒(3000ミリ秒)後に画面が変わるようになっているけど、これが早ければ下の数字を変える
    }, 3000); // 3秒後に遷移
}
// ゲーム終了時の処理
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//2/8に一部変更
// ゲーム終了時の処理
setTimeout(async () => {
    isPlaying = false; // ゲームを終了

    bgm.pause(); // BGMを停止

    blocks = []; // ブロックを全て削除（レーンにブロックが残らないようにする）

    clearCanvas(); // 画面をリセット
    drawLanes(); // レーンを再描画（ブロックなし）

    // スコア表示用のテキストを作成
    const resultText = `GOOD: ${hitCount}\nMISS: ${throughCount}\nBAD: ${missCount}`;

    showResult(resultText); // スコアを表示
}, 112000);  // 112秒後にゲーム終了
/////////////////////////////////////////////////////////////////////////////////////////////////////////
