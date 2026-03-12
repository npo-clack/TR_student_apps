// サイドバーの目次をクリックしたら右のコンテンツを切り替えるシンプルなスクリプト
// 高校生でも読みやすいようにコメントを入れています

// 目次のリンクを全部取得
const navLinks = document.querySelectorAll('.sidebar nav a');
// スライド群とスライド要素を取得
const slidesContainer = document.querySelector('.content .slides');
const pages = document.querySelectorAll('.content .slides .page');

// 現在表示中のスライド番号
let currentIndex = 0;

// 指定したページIDを表示する関数（横にスライドさせる）
function showPage(pageId){
  // ページのインデックスを取得
  const ids = Array.from(pages).map(p => p.id);
  const index = ids.indexOf(pageId);
  if(index === -1) return;
  currentIndex = index;
  // 単一ページ表示モード: クリック時は対象ページだけ表示して他は非表示にする
  const contentEl = document.querySelector('.content');
  const viewportHeight = Math.round(contentEl.clientHeight);
  // 短いページは見栄えのため最小高さを viewport に合わせる
  pages.forEach(p => { p.style.minHeight = viewportHeight + 'px'; });
  // 他ページを非表示にして、選択ページのみ表示する
  pages.forEach(p => {
    if(p.id === pageId){
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
  // 選択ページの内部スクロールを先頭に戻す
  if(pages[index]) pages[index].scrollTop = 0;
  // 外側の .content を先頭に合わせる
  contentEl.scrollTop = 0;
}

// リサイズ時に現在のスライド位置を再計算して適用
window.addEventListener('resize', function(){
  // 画面サイズが変わったら共通の処理に委譲
  updateSizes();
});

// ページ高さやスクロール位置を揃えるヘルパー
function updateSizes(){
  const contentEl = document.querySelector('.content');
  if(!contentEl) return;
  const viewportHeight = Math.round(contentEl.clientHeight);
  // 各ページの最小高さを更新（短いページを見栄えよくする）
  pages.forEach(p => { p.style.minHeight = viewportHeight + 'px'; });
  // 現在選択中のページがあればその位置へスクロール
  const targetOffset = pages[currentIndex] ? pages[currentIndex].offsetTop : 0;
  contentEl.scrollTop = targetOffset;
}

// 画像スロットに画像があれば .has-img を付けてオーバーレイを非表示にする
function markImageSlots(){
  const slots = document.querySelectorAll('.page .image-slot');
  slots.forEach(slot => {
    const img = slot.querySelector('img');
    if(img){
      slot.classList.add('has-img');
    } else {
      slot.classList.remove('has-img');
    }
  });
}

// 目次のリンクにクリックイベントをつける
navLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault(); // リンクのデフォルト動作（ページ移動）を止める
    // どのページを表示するか data-page 属性から取得する
    const pageId = this.getAttribute('data-page');
    if(!pageId) return;
    // ページを表示（スライド移動）
    showPage(pageId);
    // active クラスを移す（選択中の目次を強調するため）
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    // URL のハッシュも更新するとブックマークしやすい
    history.replaceState(null, '', '#' + pageId);
    // 表示したページの内部スクロール位置を先頭に戻す
    if(pages[currentIndex]) pages[currentIndex].scrollTop = 0;
    // 画像スロットの状態を更新（画像があればラベルを消す）
    markImageSlots();
  });
});

// ページ読み込み時に、もし URL にハッシュがあればそのページを表示する
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#','');
  if(hash){
    const link = document.querySelector('.sidebar nav a[data-page="' + hash + '"]');
    if(link){
      link.classList.add('active');
      // サイズを揃えてから表示
      updateSizes();
      showPage(hash);
      // 画像スロットに画像があるかスキャンしてクラスを付与
      markImageSlots();
      return;
    }
  }
  // デフォルトは page1 を表示
  if(pages.length){ updateSizes(); showPage(pages[0].id); }
  // 初回ロード時に画像スロットの状態を反映
  markImageSlots();
});

// もし編集などで DOM が動的に変わる場合に備え、簡易な MutationObserver を作る
if(window.MutationObserver && slidesContainer){
  const mo = new MutationObserver(() => {
    // 変化が起きたら画像スロットを再評価
    markImageSlots();
  });
  mo.observe(slidesContainer, { childList: true, subtree: true });
}
