// ================================
// ゲーム：マウス追従＆キャラ表示
// ================================

// キャラクター管理クラス
/*
class Character {
  constructor() {
    // キャラクターの位置（x, y）
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    
    // マウスカーソルの位置
    this.targetX = this.x;
    this.targetY = this.y;
    
    // 追従速度（0.1 = ゆっくり、0.3 = 速い）
    this.speed = 0.15;
    
    // キャラクターのサイズ
    this.width = 40;
    this.height = 50;
    
    // キャラクターを表示するHTML要素
    this.element = null;
    
    // アニメーション関連
    this.animationFrame = 0;  // 現在のアニメーションフレーム（0, 1, 2...）
    this.animationSpeed = 0.1;  // アニメーション速度（0～1の間で変化する速度）
    this.isMoving = false;  // 移動中かどうか
    
    // 初期化
    this.init();
  }
  
  // 初期化：キャラクターのHTML要素を作成・配置
  init() {
    // div要素を作成
    this.element = document.createElement('div');
    this.element.className = 'game-character';
    this.element.id = 'character';
    
    // ページに追加
    document.body.appendChild(this.element);
    
    // 初期位置を反映
    this.updatePosition();
  }
  
  // マウスカーソル位置を更新
  updateMousePosition(event) {
    // イベント引数から マウスの座標を取得
    this.targetX = event.clientX;
    this.targetY = event.clientY;
  }
  
  // キャラクターの位置を更新（マウスに徐々に近づく）
  update() {
    // 現在位置とターゲット位置の距離を計算
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 距離が5ピクセル以上なら移動中と判定
    this.isMoving = distance > 5;
    
    // 現在位置からターゲット位置へ徐々に移動
    this.x += (this.targetX - this.x) * this.speed;
    this.y += (this.targetY - this.y) * this.speed;
    
    // アニメーション更新
    if (this.isMoving) {
      // 移動中：アニメーションフレームを進める
      this.animationFrame += this.animationSpeed;
      // フレームを0～1の間でループさせる
      if (this.animationFrame >= 1) {
        this.animationFrame = 0;
      }
    } else {
      // 停止中：アニメーションをリセット
      this.animationFrame = 0;
    }
    
    // 画面上の描画位置を反映
    this.updatePosition();
  }
  
  // キャラクターのSVGを描画
  drawCharacter() {
    // アニメーション値（0～1）を使って足の位置を計算
    // sin波を使うことで滑らかに振動させる
    const legOffset = Math.sin(this.animationFrame * Math.PI) * 3;
    
    // 移動中の時のY位置の上下動（歩いてる感）
    const bobOffset = this.isMoving ? Math.cos(this.animationFrame * Math.PI * 2) * 1.5 : 0;
    
    return `
      <svg width="40" height="50" viewBox="0 0 40 50" style="overflow: visible;">
        <!-- 頭 -->
        <circle cx="20" cy="10" r="6" fill="#333" stroke="#333" stroke-width="2"/>
        <!-- 体 -->
        <line x1="20" y1="16" x2="20" y2="30" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        <!-- 左腕 -->
        <line x1="20" y1="20" x2="10" y2="25" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        <!-- 右腕 -->
        <line x1="20" y1="20" x2="30" y2="25" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        <!-- 左足：歩行アニメーション対応 -->
        <line x1="20" y1="30" x2="${14 - legOffset}" y2="42" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        <!-- 右足：歩行アニメーション対応（左足と反対） -->
        <line x1="20" y1="30" x2="${26 + legOffset}" y2="42" stroke="#333" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }
  
  // HTML要素の位置を更新
  updatePosition() {
    // left（左からの距離）と top（上からの距離）で配置
    // キャラの中心がカーソル位置になるよう、-20 で調整
    this.element.style.left = (this.x - this.width / 2) + 'px';
    this.element.style.top = (this.y - this.height / 2) + 'px';
    
    // SVGを更新（アニメーション反映）
    this.element.innerHTML = this.drawCharacter();
  }
}

// ================================
// ゲーム管理クラス
// ================================

class Game {
  constructor() {
    // キャラクターのインスタンス作成
    this.character = new Character();
    
    // ゲーム実行フラグ
    this.isRunning = true;
    
    // 初期化
    this.init();
  }
  
  // 初期化
  init() {
    // マウス移動イベントをリッスン
    // マウスが動いたら character.updateMousePosition() を呼び出す
    document.addEventListener('mousemove', (event) => {
      this.character.updateMousePosition(event);
    });
    
    // ゲームループ開始
    this.start();
  }
  
  // ゲームループ（毎フレーム実行）
  start() {
    // requestAnimationFrame：ブラウザの描画タイミングに合わせて関数を実行
    // 1秒間に約60回実行される
    const loop = () => {
      if (this.isRunning) {
        // キャラクター位置を更新
        this.character.update();
      }
      
      // 次のフレームをリクエスト
      requestAnimationFrame(loop);
    };
    
    // ループ開始
    loop();
  }
  
  // ゲーム停止
  stop() {
    this.isRunning = false;
  }
}

// ================================
// ゲーム起動
// ================================

// ページが完全に読み込まれたら実行
window.addEventListener('load', () => {
  // グローバル変数でゲームを管理
  window.gameInstance = new Game();
  
  console.log('✓ ゲーム起動完了');
});*/
