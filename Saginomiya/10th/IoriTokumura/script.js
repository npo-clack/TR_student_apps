document.addEventListener('DOMContentLoaded', () => {

  // スクロールでヘッダー縮小
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      if (window.scrollY > 40) header.classList.add('shrink');
      else header.classList.remove('shrink');
    }
  });

});

(function(){
// navigation and panels
const navBtns = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.panel');
function hideAll(){ panels.forEach(p=>p.classList.add('hidden')); }
function show(id){ hideAll(); const el = document.getElementById(id); if(el) el.classList.remove('hidden'); window.scrollTo({top:0,behavior:'smooth'}); }
navBtns.forEach(b=> b.addEventListener('click', ()=> show(b.dataset.target)));


// initial state
hideAll(); document.getElementById('home').classList.remove('hidden');

// dynamic gallery population (example placeholders)
const gallery = document.getElementById('gallery-grid');
const sample = [
  { src: 'img/emu_full.png', title: '旧メインビジュアル' },
	{ src: 'img/emu_full2.png', title: '新メインビジュアル' },
  { src: 'img/seihuku.png', title: '進級前制服' },
  { src: 'img/sihuku.png', title: '進級前私服' },
  { src: 'img/seihuku2.png', title: '進級後制服' },
	{ src: 'img/sihuku2.png', title: '進級後私服' },
  { src: 'img/yousyouki.png', title: '幼少期' },
  { src: 'img/room.png', title: 'えむの部屋' },
  { src: 'img/osusume1.png', title: 'おすすめイラスト１' },
  { src: 'img/osusume2.png', title: 'おすすめイラスト２' },
  { src: 'img/osusume3.jpg', title: 'おすすめイラスト３' },
	{ src: 'img/osusume4.jpg', title: 'おすすめイラスト４' }
];

sample.forEach(it => {
  const fig = document.createElement('figure');
  fig.className = 'card';

  const img = document.createElement('img');
  img.src = it.src;
  img.alt = it.title;

  // フォールバック: ローカルにファイルが無い場合に SVG プレースホルダを表示（外部接続不要）
  img.onerror = () => {
    img.src =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"><rect fill="%23ffb3da" width="280" height="280"/><text x="140" y="140" text-anchor="middle" dy=".3em" fill="%23fff" font-family="sans-serif" font-size="16">画像なし</text></svg>';
    img.alt = '画像が見つかりません';
  };

// クリックでライトボックスを開く
img.addEventListener('click', ()=>{
	const lightbox = document.getElementById('lightbox');
	const lbImg = document.getElementById('lightbox-img');
	lbImg.src = img.src;
	lbImg.alt = img.alt || '';
	lightbox.classList.add('open');
	lightbox.setAttribute('aria-hidden','false');
});
const cap = document.createElement('figcaption'); cap.innerText = it.title;
fig.appendChild(img); fig.appendChild(cap); gallery.appendChild(fig);
});

// Lightbox close handlers
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
if(lightbox){
	lightbox.addEventListener('click', (e)=>{
		// 画像本体クリックは無視（閉じたくない）
		if(e.target === lbImg) return;
		lightbox.classList.remove('open');
		lightbox.setAttribute('aria-hidden','true');
		lbImg.src = '';
	});
	const closeBtn = document.querySelector('.lightbox-close');
	if(closeBtn) closeBtn.addEventListener('click', ()=>{ lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; });
	// ESC で閉じる
	document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; } });
}

// イベントバナー表示
const eventGrid = document.getElementById('event-grid');

const eventList = [
  {src:'img/event1.jpg', title:'スマイルオブドリーマー', duration:'開催期間：2021.2/28—2021.3/8'},
  {src:'img/event2.png', title:'POP IN my HEART!!', duration:'開催期間：2022.1/12—2022.1/19'},
  {src:'img/event3.webp', title:'夢の途中輝く星たちへ', duration:'開催期間：2023.1/10—2023.1/19'},
  {src:'img/event4.png', title:'あたしたちのハッピーエンド', duration:'開催期間：2023.8/21—2023.8/29'},
  {src:'img/event5.png', title:'perspective for smile', duration:'開催期間：2024.5/23—2024.5/29'},
  {src:'img/event6.png', title:'Choices for the future', duration:'開催期間：2025.4/22—2025.4/28'}
];

eventList.forEach(event => {
  const card = document.createElement('div');
  card.className = 'music-card';

  const img = document.createElement('img');
  img.src = event.src;
  img.alt = event.title;

  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });

  img.onerror = () => {
    img.src =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><rect fill="%23ffb3da" width="140" height="140"/><text x="70" y="70" text-anchor="middle" dy=".3em" fill="%23fff" font-family="sans-serif" font-size="12">画像</text></svg>';
  };

  const h4 = document.createElement('h4');
  h4.innerText = event.title;

  const p = document.createElement('p');
  p.innerText = event.duration;

  card.appendChild(img);
  card.appendChild(h4);
  card.appendChild(p);

  eventGrid.appendChild(card);
});

// messages demo（削除 - music-grid で置き換え）
// const messagesEl = document.getElementById('message-cards');
// const msgs = ['わんだほーい！みんなで盛り上がろう🎪','えむちゃん大好き！💖','にぎやかにいくよー！🌈'];
// msgs.forEach(m=>{ const d=document.createElement('div'); d.className='msg'; d.innerText=m; messagesEl.appendChild(d); });


// 音楽トラック表示
const musicGrid = document.getElementById('music-grid');
const musicTracks = [
  {src:'img/music1.jpg', title:'ワンスアポンアドリーム', artist:'えむバナーイベント曲', duration:'3:59'},
  {src:'img/music2.png', title:'にっこり^^調査隊のテーマ', artist:'えむバナーイベント曲', duration:'3:26'},
  {src:'img/music3.jpg', title:'星空オーケストラ', artist:'えむバナーイベント曲', duration:'3:11'},
  {src:'img/music4.jpg', title:'キラピピ★キラピカ', artist:'えむバナーイベント曲', duration:'3:46'},
  {src:'img/music5.jpg', title:'オペラ！スペースオペラ！', artist:'えむバナーイベント曲', duration:'2:57'},
  {src:'img/music6.jpg', title:'オールセーブチャレンジ', artist:'えむバナーイベント曲', duration:'3:05'}
];
musicTracks.forEach(track=>{
  const card = document.createElement('div'); card.className='music-card';
  const img = document.createElement('img'); img.src=track.src; img.alt=track.title;
  // 音楽カード画像もクリックでライトボックス表示
  img.addEventListener('click', ()=>{
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
  img.onerror = () => {
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><rect fill="%23ffb3da" width="140" height="140"/><text x="70" y="70" text-anchor="middle" dy=".3em" fill="%23fff" font-family="sans-serif" font-size="12">画像</text></svg>';
  };
  const h4 = document.createElement('h4'); h4.innerText = track.title;
  const p = document.createElement('p'); p.innerText = `${track.duration}`;
  card.appendChild(img); card.appendChild(h4); card.appendChild(p); musicGrid.appendChild(card);
});


// Confetti / colorful particles generator for a lively feeling
const confettiRoot = document.querySelector('.confetti-root');
const colors = ['#ff77c2','#ffd166','#61dafb','#b28cff','#ffb3da'];
function spawnConfettiBurst(n=24){
for(let i=0;i<n;i++){
const el = document.createElement('div'); el.className='confetti';
el.style.background = colors[Math.floor(Math.random()*colors.length)];
el.style.left = Math.random()*100 + '%';
el.style.top = -10 + Math.random()*10 + '%';
const size = 8 + Math.random()*18; el.style.width = size + 'px'; el.style.height = (size*0.7) + 'px';
confettiRoot.appendChild(el);
// animate
const destX = (Math.random()-0.5)*window.innerWidth*0.6;
const destY = window.innerHeight*(0.6 + Math.random()*0.6);
el.animate([
{transform:`translate3d(0,0,0) rotate(${Math.random()*360}deg)`, opacity:1},
{transform:`translate3d(${destX}px,${destY}px,0) rotate(${Math.random()*1080}deg)`, opacity:0}
],{duration:3000+Math.random()*1800,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish = ()=> el.remove();
}
}
// periodic bursts for lively site
let confettiTimer = setInterval(()=> spawnConfettiBurst(18), 2200);
// spawn initial
spawnConfettiBurst(36);


// performance: stop after some time on small devices
setTimeout(()=>{ clearInterval(confettiTimer); }, 30000);


})();

// ナビボタンでセクションへスクロール
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // active クラス切り替え
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });
});
