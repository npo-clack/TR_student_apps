 /*
 * Tetris v0.7.5
 *  Created by Shuichi Takeda at 2021-05-06
 */
/* ------- 開発履歴
    v0.7.5  JavaScriptのES2015(ES6) で追加された記述形式に変更。ブロックの色、CSS見直し
    v0.7        画面中央にゲームを配置。変数名等の見直し。関数の見直し
    v0.6.1.1    ラインが揃ったら消える処理追加（点滅して消えるエフェクト）
            ブロックが消えたら上のブロックから詰める処理追加
    v0.6.1  処理を一から作り直し（余計な部分が多いため。シンプルにした）
    v0.6        スペースキーを押すと、ブロックが回転する（ブロックが壁にめり込んでしまう）
    v0.5        テトリスのブロックがランダムに落ちてきて、積み重なる
*/
/*
 * 定数
 */
// ステージ
const BLOCK_SIZE = 24;      // 1ブロックのサイズ
const BLOCK_RAWS = 22;  // ステージの高さ（20ライン分をステージとして使用し、上下1ラインはあたり判定とブロックコピー用に使用）
const BLOCK_COLS = 12;  // ステージの幅
const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS;   // キャンバスの幅
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_RAWS;  // キャンバスの高さ
// ゲームの状態
const GAME = 1;         // ゲーム中
const GAMEOVER = 0;     // ゲームオーバー時
const EFFECT = 2;           // ブロックを消すときのエフェクトモード
const TIMEUP=3;
// ブロックの状態
const NON_BLOCK = 0;        // ブロックが存在しない
const NORMAL_BLOCK = 1; // 通常のブロック（動かせる）
const LOCK_BLOCK = 2;       // ロックした（動かせない）ブロック
const CLEAR_BLOCK = 3;  // 消去するブロック（1ライン揃ったとき）
const WALL = 9;         // 壁
// エフェクト
const EFFECT_ANIMATION = 2; // エフェクト時のちかちかする回数
// 色
const BACK_COLOR = "#ddd";              // 背景色
const GAMEOVER_COLOR = "palevioletred"; // ゲームオーバー時のブロックの色
const BLOCK_COLOR = "steelblue";            // 操作ブロックの色
const LOCK_COLOR = "lightslategray";        // ロックしたブロックの色
const WALL_COLOR = "#666";              // 壁の色
const ERROR_COLOR = "tomato";           // エラーブロックの色
const EFFECT_COLOR1 = "whitesmoke";     // エフェクト時の色1
const EFFECT_COLOR2 = "#000";           // エフェクト時の色2
// ゲーム要素
const NEXTLEVEL = 10;                   // 次のレベルまでの消去ライン数
const startTime=performance.now();

const endTime=performance.now();
/*
 * グローバル変数
 */
let counter=180000;
let canvas = null;                      // キャンバス取得
let g = null;                           // コンテキスト取得
let stage = new Array(BLOCK_COLS);  // ゲームのステージ枠（壁の情報のみ、変化しない）
let field = new Array(BLOCK_COLS);      // ゲーム中のステージ枠とブロック表示用（変化する）
let bs;                             // ブロックサイズ
let speed;                          // 落下速度
let frame;                          // ゲームフレーム番号
let block = new Array();                // 落ちてくるブロックの種類（７種類）
let oBlock = new Array();               // 操作中のブロック
let blockType;                      // ブロックの種類番号
let x, y;                               // ブロックの現在位置
let sx, sy;                         // ブロックの元位置
let mode;                           // ゲームの状態  GAME/GAMEOVER/EFFECT
let timer1;                         // ゲームループ用のタイマー
let timer2;
let FPS;                                // 描画書き換え速度
let clearLine;                          // 消去したライン数
// エフェクト時（色の反転/エフェクトスピード/エフェクト回数）
let effectState = {flipFlop: 0, speed: 0, count: 0};
const musica=new Audio('rocman.wav');
const musicb=new Audio('mario.wav');
/*
 * 初期化
 */

function init(){
    clearTimeout(timer1);
    FPS = 30;
    clearLine = 0;
    // キャンバスの設定
    canvas = document.getElementById("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    g = canvas.getContext("2d");
    // エフェクト設定
    effectState.flipFlop = 0;
    effectState.speed = 4;
    effectState.count = 0;
    // ブロックの設定
    bs = BLOCK_SIZE;
    // ブロックを設定
    block =  [[ [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]],
                 
            [   [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]],
 
            [   [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]],
 
            [   [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]],
 
            [   [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]],
 
            [   [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]],
 
            [   [0, 0, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]]
            ];
    // ステージを設定
    stage = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // ←表示しない
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];  // ←表示しない
}
/*
 * ステージ設定
 */
function setStage(){
    // 表示するための配列
    for(let i=0; i<BLOCK_RAWS; i++){
        field[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    // 操作ブロックための配列
    oBlock = [  [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];
    // ステージデータをコピーする
    for(i=0; i<BLOCK_RAWS; i++){
    for(j=0; j<BLOCK_COLS; j++){
            field[i][j] = stage[i][j];
        }
    }
}
/*
 * ゲーム開始処理
 */
function newGame(){
    setStage();
    mode = GAME;
    frame = 1;
    speed = 30;
    clearTimeout(timer1);
    createBlock();
    mainLoop();
}
/*
 * 新しいブロックを作成
 */
function createBlock(){
    if(mode == EFFECT){ return;}
    x = sx = Math.floor(BLOCK_COLS / 3);
    y = sy = 0;
    blockType = Math.floor(Math.random()*7);
    // ブロックをコピー
    for(i=0; i<4; i++){
        for(j=0; j<4; j++){
            oBlock[i][j] = block[blockType][i][j];
        }
    }
    if(hitCheck()){
        mode = GAMEOVER;
        console.log("GAMEOVER!");
    }
    putBlock();
}
/*
 * ブロックをロック（動かせないように）する
 */
function lockBlock(){
    if(mode == EFFECT){return;}
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(oBlock[i][j]) field[i+y][j+x] = LOCK_BLOCK;
        }
    }
}
/*
 * ブロックをステージにセットする
 */
function putBlock(){
    if(mode == EFFECT){return;}
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(oBlock[i][j]){
            field[i+y][j+x] = oBlock[i][j];
        }
        }
    }
}
/*
 * ブロックを消去する
 */
function clearBlock(){
    if(mode == EFFECT) return;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(oBlock[i][j]) {field[i+y][j+x] = NON_BLOCK;}
        }
    }
}
/*
 * ブロックの回転処理
 */
function rotateBlock(){
    if(mode == EFFECT){return;}
    clearBlock();
    // 回転ブロック退避の配列
    let tBlock = [  [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];
    // ブロックを退避
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            tBlock[i][j] = oBlock[i][j];
        }
    }
    // ブロックを回転
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            oBlock[i][j] = tBlock[3-j][i];
        }
      }
    if(hitCheck()){
        // 元に戻す
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                oBlock[i][j] = tBlock[i][j];
            }
        }
    }
    putBlock();
    return 0;
}
/*
 * ブロックの当たり判定処理（移動できるか？落下できるか？）
 */
function hitCheck(){
    if(mode == EFFECT){return;}
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(field[i+y][j+x] && oBlock[i][j])     return 1;
        }
    }
    return 0;
}
/*
 * ラインが揃ったかチェックする
 */
function lineCheck(){
    if(mode == EFFECT){return;}
    let count;
    let lineCount = 0;          // 何ライン揃ったか？
    for(i=1; i<BLOCK_RAWS-2; i++){
        count = 0;  // 1ライン上に揃ったブロックの数
        for(j=0; j<BLOCK_COLS; j++){     // 右端からチェック
            if(field[i][j]) count++;
            else break;
        }
        if(count >= BLOCK_COLS){     // 1ライン揃った！
            lineCount++;
            clearLine++;
            for(j=1; j<BLOCK_COLS-1; j++){field[i][j] = CLEAR_BLOCK;}     // 消去ブロックにする
        }
    }
    return lineCount;       // 消去ライン数を返す（現在、この戻り値は未使用）
}
/*
 * そろったラインを消去する
 */
function deleteLine(){
    if(mode == EFFECT){
        return;
    }
    for(let i=BLOCK_RAWS-1; i>=1; i--){      // 下のラインから消去する
        for(let j=1; j<BLOCK_COLS-1; j++){   // 右端からチェック
            if(field[i][j] == CLEAR_BLOCK){
                field[i][j] = field[i-1][j];            // 一段落とす
                for(let above=i-1; above>=1; above--){   //  そこからまた上を一段ずつおとしてい/
                field[above][j] = field[above-1][j];}
                i++;        // 落としたラインもまた、消去ラインだったときの対処
            }
        }
    }
}
/*
 * ゲーム画面クリア
 */
function clearWindow(){
    g.fillStyle = BACK_COLOR;
    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
};
/*
 * 描画処理
 */
function draw(){
    clearWindow();
    for(let i=0; i<BLOCK_RAWS; i++){
        for(let j=0; j<BLOCK_COLS; j++){
            switch(field[i][j]){
                case NON_BLOCK:     // なにもない
                    g.fillStyle = BACK_COLOR;
                    break;
                case NORMAL_BLOCK:      // ブロック
                    g.fillStyle = BLOCK_COLOR;
                    break;
                case LOCK_BLOCK:        // ブロック（ロック）
                    g.fillStyle = LOCK_COLOR;
                    break;
                case CLEAR_BLOCK:       // 消去ブロック
                    g.fillStyle = BLOCK_COLOR;
                    break;
                case WALL:      // 壁
                    g.fillStyle = WALL_COLOR;
                    break;
                default:        // 重なったときの色
                    g.fillStyle = ERROR_COLOR;
            }
            g.fillRect(j*bs, i*bs, bs-1, bs-1);    // 1引いているのはブロック同士の隙間を入れるため
        }
    }
  } 
/*
 * ラインを消去するときのエフェクト
 */
function effect(){
    musica.currentTime=0;
    musica.play();
    let colors = [ EFFECT_COLOR1, EFFECT_COLOR2 ];
    g.fillStyle = colors[effectState.flipFlop];
    for(let i=0; i<BLOCK_RAWS; i++){
        for(let j=0; j<BLOCK_COLS; j++){
            if(field[i][j] == CLEAR_BLOCK){     // 消去ブロックならエフェクト表示
                g.fillRect(j*bs, i*bs, bs-1, bs-1);
            }
        }
    }
    effectState.flipFlop = 1 - effectState.flipFlop;    // エフェクト色を交互に切り替え
    if(effectState.count > EFFECT_ANIMATION){
        mode = GAME;
        effectState.count = 0;
        effectState.flipFlop = 0;
        deleteLine();
       createBlock();
    }
    effectState.count++;
}
/*
 * ゲームオーバー処理
 */
function gameOver(){
    musicb.currentTime=0;
    musicb.play();
    for(let i=0; i<BLOCK_RAWS; i++){
        for(let j=0; j<BLOCK_COLS; j++){
            if(field[i][j] && field[i][j] != WALL){ // ブロックのみ色を変える
                g.fillStyle = GAMEOVER_COLOR;
                g.fillRect(j*bs, i*bs, bs-1, bs-1);
            }
        }
    }
}
/*
 * ゲームメイン
 */
function mainLoop(){
    if(mode == GAME){
        sx = x; sy = y;     // 元の位置を保存
        if(frame % speed == 0){ // ブロックが落下する間隔
            clearBlock();
            y++;
            if(hitCheck()){
                y = sy;
                lockBlock();
                if(lineCheck() > 0){
                    mode = EFFECT;
                }
                createBlock();
            }
            putBlock();
        }
        draw();
    }
    else if(mode == GAMEOVER){
        gameOver();
        return 0;
    }
    else if(mode == EFFECT){
        if(frame % effectState.speed == 0){
            effect();
        }
    }
    else if(mode==TIMEUP){
            gameclear();
            return 0;
    }
    frame++;
    // 落下スピードアップ
    if(clearLine >= NEXTLEVEL){
        clearLine = 0;
        speed--;
        console.log("speedUP! : " + speed);
    }
    if(speed < 1)speed = 1;
    timer1 = setTimeout(mainLoop, 1000/FPS);
    timer2 = setInterval(exeCount, 1000);
}
    /*
 * 操作
 */
function keyDownFunc(e){
    if(mode == EFFECT){
        return;
    }
    if(mode == GAME){
        clearBlock();
        sx = x; sy = y;
        if(e.keyCode == 32){
            rotateBlock();
        }
        else if(e.keyCode == 37){
            x--;
        }
        else if(e.keyCode == 39){
            x++;
        }
        else if(e.keyCode == 40){
            y++;
        }
        if(hitCheck()){
            x = sx; y = sy;
        }
        putBlock();
    }
    else if(mode == GAMEOVER){
        if(e.keyCode == 13){
            newGame();
        }
    }
    else if(mode==TIMEUP){
        if(e.keyCode == 32){
            counter=180000;
            newGame();
        }
    }
}
/*
 * 起動処理
 */
window.addEventListener("load", function(){
    // 初期化
    init();
    // キーボードイベント設定
    window.addEventListener("keydown", keyDownFunc, false);
    // ゲーム開始
    newGame();
});
function exeCount(){
    counter--;
    if(counter==0){
        mode=TIMEUP;
    }
}
function gameclear(){
    // document.write('消去ライン数＝'+clearLine);
   document.getElementById('DeleatLine').innerText='消去ライン数＝'+clearLine;
}