/* 4レーンアーケード風 — script.js
   - 曲はJS配列に Base64 (dataURI) で追加可能（無制限）
   - 選択して Load → Space で開始
   - 判定: PERFECT/GREAT/GOOD/BAD/MISS
   - ロングノーツ(始点->ホールド->終点)
   - 終了時に結果表示（スコア/判定内訳）
*/

/* --------------------
   Songs 配列（ここに曲をどんどん追加）
   使用法:
     songs.push({title:"曲名", bpm:120, src:"data:audio/mpeg;base64,..."})
   もしくは UI の「Add Song」に Base64 を貼って追加できます。
   ※ 実際の MP3 Base64 は容量が大きいので、ここでは空のプレースホルダにしてあります。
*/
const songs = [
  // サンプル（置き換えてください）
  { id: '', title: 'Radiated', bpm: 150, src: 'c:\Users\micro\Music\base64\ElementD_-Chordinatez_-Mees-van-den-Berg-Radiate-_feat.-Mees-Van-Den-Berg_-_NCS-Release_-_1_.mp3 (1).b64' },
  { id: 'sample2', title: 'sunrise', bpm: 80, src: '' }
];

/* --------------------
   DOM
*/
const songSelect = document.getElementById('songSelect');
const loadSelected = document.getElementById('loadSelected');
const dataPaste = document.getElementById('dataPaste');
const addSongBtn = document.getElementById('addSong');
const songTitleInput = document.getElementById('songTitle');
const songBpmInput = document.getElementById('songBpm');

const audio = document.getElementById('audio');
const lanes = document.querySelectorAll('.lane');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const judgeDisplay = document.getElementById('judgeDisplay');
const songInfo = document.getElementById('songInfo');
const timeDisplay = document.getElementById('timeDisplay');

const resultModal = document.getElementById('resultModal');
const finalScore = document.getElementById('finalScore');
const finalStats = document.getElementById('finalStats');
const closeResult = document.getElementById('closeResult');

/* --------------------
   ゲーム状態
*/
let currentSong = null; // {id,title,bpm,src}
let notes = []; // 譜面配列: {time, lane, type: 'tap'|'long', endTime? , spawned?, hit?, hold?}
let running = false;
let score = 0;
let combo = 0;
let stats = {perfect:0,great:0,good:0,bad:0,miss:0,holdsuccess:0,holdfail:0};
let travelTime = 2.0; // ノート落下にかかる時間（秒） — 曲BPMで調整可能
let hitWindow = { perfect:0.06, great:0.12, good:0.20, bad:0.35 }; // 秒

/* キーとレーンのマップ */
const keyToLane = { KeyD:0, KeyF:1, KeyJ:2, KeyK:3 };
const laneToKey = ['D','F','J','K'];

/* ロード UI 初期化 */
function populateSongList(){
  songSelect.innerHTML = '';
  songs.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${s.title} ${s.bpm ? '— ' + s.bpm + ' BPM' : ''}`;
    songSelect.appendChild(opt);
  });
}
populateSongList();

/* Add Song (Base64を貼って追加) */
addSongBtn.addEventListener('click', ()=>{
  const data = dataPaste.value.trim();
  if(!data){ alert('Base64のDataURIを貼ってください'); return; }
  const title = songTitleInput.value.trim() || `Song ${songs.length+1}`;
  const bpm = parseFloat(songBpmInput.value) || 120;
  songs.push({ id: 's' + Date.now(), title, bpm, src: data });
  populateSongList();
  dataPaste.value = '';
  songTitleInput.value = '';
  songBpmInput.value = '';
  alert('曲を追加しました。曲を選んで Load を押してください。');
});

/* Load selected song into audio and prepare chart */
loadSelected.addEventListener('click', ()=>{
  const idx = Number(songSelect.value);
  const s = songs[idx];
  if(!s){ alert('曲を選んでください'); return; }
  if(!s.src){ alert('この曲は src が空です。Base64 を追加してください（Add Song）'); return; }
  loadSong(s);
});

/* 直接曲をロードする関数 */
function loadSong(s){
  currentSong = s;
  audio.src = s.src;
  audio.load();
  songInfo.textContent = `Loading: ${s.title}`;
  audio.onloadedmetadata = ()=>{
    songInfo.textContent = `${s.title} — ${formatTime(audio.duration)} (${s.bpm} BPM)`;
    // BPM に合わせて travelTime を調整（BPMが早いとノートが速く落ちる）
    travelTime = Math.max(0.9, 120 / (s.bpm || 120) * 2.0); // 経験則の調整
    prepareChartForSong(s);
  };
  audio.onerror = (e)=>{
    alert('音声の読み込みに失敗しました。DataURIが正しいか確認してください。');
    console.error(e);
  };
}

/* --------------------
   譜面生成（自動）：曲の BPM を使ってノーツとロングノーツを作る
   - type 'tap' (単発)
   - type 'long' (始点/endTime)
*/
function prepareChartForSong(s){
  const dur = audio.duration || 30;
  const bpm = s.bpm || 120;
  const beatSec = 60 / bpm;

  notes = [];
  // 単純に小節単位でノートを置く + ランダムでロングノーツを混ぜる
  for(let t = beatSec; t < dur - 1.0; t += beatSec){
    // 1拍ごとにノーツが出る確率
    if(Math.random() < 0.7){
      const lane = Math.floor(Math.random()*4);
      // ロングノーツを一定確率で作る（BPMに合わせて長さを調整）
      if(Math.random() < 0.16){
        // ロングの長さは 1〜4拍分
        const lenBeats = 1 + Math.floor(Math.random()*4);
        const end = Math.min(dur-0.5, t + lenBeats * beatSec + (Math.random()*0.3));
        notes.push({time: t, lane, type:'long', endTime: end, spawned:false, hit:false, hold:false});
      }else{
        notes.push({time: t, lane, type:'tap', spawned:false, hit:false});
      }
    }
  }

  // ソート
  notes.sort((a,b)=>a.time - b.time);

  // リセット状態
  running = false;
  score = 0; combo = 0;
  stats = {perfect:0,great:0,good:0,bad:0,miss:0,holdsuccess:0,holdfail:0};
  updateHUD();
  clearAllNotesFromDOM();
  songInfo.textContent = `${s.title} — ${notes.length} notes (BPM ${bpm})`;
}

/* DOM 上のノートをクリア */
function clearAllNotesFromDOM(){
  document.querySelectorAll('.note').forEach(n=>n.remove());
}

/* --------------------
   ゲームループ：Audio 時間を基準に spawn / 判定 / 終了
*/
let rafId = null;
function startSong(){
  if(!currentSong || !audio.src){
    alert('先に曲を Load してください');
    return;
  }
  // 再生許可のためにユーザー操作で呼ばれること前提（Spaceで呼ぶ）
  audio.currentTime = 0;
  audio.play().catch(err=>{
    console.warn('play failed:', err);
    alert('ブラウザの再生制限が働くことがあります。画面をクリックしてから再度 Space を押してください。');
  });
  running = true;
  score = 0; combo = 0;
  stats = {perfect:0,great:0,good:0,bad:0,miss:0,holdsuccess:0,holdfail:0};
  updateHUD();
  lastNow = 0;
  rafId = requestAnimationFrame(gameLoop);
}

/* spawn と自動ミス判定等 */
let lastNow = 0;
function gameLoop(){
  if(!running) return;
  const now = audio.currentTime;

  // spawn
  notes.forEach(n=>{
    if(n.spawned) return;
    if(now >= n.time - travelTime){
      spawnNoteDOM(n);
      n.spawned = true;
    }
  });

  // 自動ミス: タップノートがヒット判定を過ぎた場合
  notes.forEach(n=>{
    if(n.hit) return;
    if(n.type === 'tap' && n.spawned){
      if(now - n.time > hitWindow.bad){
        markMiss(n);
      }
    }
    // ロングの終端に到達しているのにホールドが不十分なら fail
    if(n.type === 'long' && n.spawned && now > n.endTime + 0.15 && !n.hit){
      // 既に hold が false -> failed
      if(!n.hold){
        stats.holdfail++;
        markMiss(n);
      }else{
        // hold 成功
        n.hit = true;
        stats.holdsuccess++;
        // ノーツはすでに削除済み by tail timer
      }
    }
  });

  // time display
  timeDisplay.textContent = `${formatTime(now)} / ${formatTime(audio.duration || 0)}`;

  // 終了判定
  if(audio.ended){
    running = false;
    cancelAnimationFrame(rafId);
    showResult();
    return;
  }

  lastNow = now;
  rafId = requestAnimationFrame(gameLoop);
}

/* spawn DOM element for note */
function spawnNoteDOM(n){
  const laneEl = document.querySelector(`.lane[data-lane='${n.lane}']`);
  if(!laneEl) return;
  if(n.type === 'tap'){
    const el = document.createElement('div');
    el.className = 'note tap';
    el.style.top = '-12%'; // 初期位置は上（CSSアニメで落とす）
    el.textContent = '';
    // 落下アニメーション：duration = travelTime 秒
    el.style.animation = `fall ${travelTime}s linear forwards`;
    laneEl.appendChild(el);
    n._el = el;
    // safety remove after travelTime+1s
    setTimeout(()=>{ el.remove(); n._el = null; }, (travelTime+1.2)*1000);
  }else if(n.type === 'long'){
    // 長いバーを spawn: we'll create a container that animates top->bottom
    const head = document.createElement('div');
    head.className = 'note long';
    // body will be stretched via JS to visually represent length until endTime
    const body = document.createElement('div'); body.className = 'body';
    const headPart = document.createElement('div'); headPart.className = 'head'; headPart.textContent = '';
    head.appendChild(headPart);
    head.appendChild(body);
    laneEl.appendChild(head);
    n._el = head;
    // animate top->bottom by translating via keyframes like tap
    head.style.animation = `fall ${travelTime}s linear forwards`;
    // compute visual length: map time length to px later when arrives at hitline.
    // We'll remove after travelTime + (endTime-time) + small buffer
    const removeDelay = (travelTime + (n.endTime - n.time) + 1.5) * 1000;
    setTimeout(()=>{ head.remove(); n._el = null; }, removeDelay);
  }
}

/* --------------------
   判定処理：キー押下 / 離す
   - タップは単発で判定
   - ロングは始点で hold を開始、終点で hold を評価
*/
window.addEventListener('keydown', (e)=>{
  // prevent space default to avoid page scroll
  if(e.code === 'Space'){ e.preventDefault(); if(!running) startSong(); return; }
  if(!running) return;
  if(keyToLane[e.code] === undefined) return;
  const lane = keyToLane[e.code];
  handlePress(lane);
});
window.addEventListener('keyup', (e)=>{
  if(!running) return;
  if(keyToLane[e.code] === undefined) return;
  const lane = keyToLane[e.code];
  handleRelease(lane);
});

/* handlePress: find nearest note on lane and judge */
function handlePress(lane){
  const now = audio.currentTime;
  // find nearest unhit note in lane
  // prefer long head if within travel window
  const laneNotes = notes.filter(n => n.lane === lane && !n.hit);
  if(laneNotes.length === 0) return;
  // find best candidate by smallest |time - now|
  let best = null, bestDiff = Infinity;
  laneNotes.forEach(n => {
    const d = Math.abs(n.time - now);
    if(d < bestDiff){ bestDiff = d; best = n; }
  });
  if(!best) return;

  if(best.type === 'tap'){
    // 判定
    if(bestDiff <= hitWindow.perfect){
      markHit(best, 'perfect');
    }else if(bestDiff <= hitWindow.great){
      markHit(best, 'great');
    }else if(bestDiff <= hitWindow.good){
      markHit(best, 'good');
    }else if(bestDiff <= hitWindow.bad){
      markHit(best, 'bad');
    }else{
      // 空打ちペナルティ
      combo = 0; updateHUD();
      flashJudge('MISS', 'miss');
      stats.miss++;
    }
  }else if(best.type === 'long'){
    // 長押し開始: if press near head within grip window, start hold
    const allowable = Math.max(hitWindow.great, 0.25); // 長押し始点は少し広め
    if(bestDiff <= allowable){
      // mark hold started
      best.hold = true;
      // visually mark as held (optional)
      if(best._el) best._el.classList.add('held');
      flashJudge('HOLD', 'good');
    }else{
      // too early/late: treat as miss
      combo = 0; updateHUD();
      flashJudge('MISS','miss');
      stats.miss++;
    }
  }
}

/* handleRelease: for long notes, when released before endTime -> fail; if released after endTime it's fine */
function handleRelease(lane){
  const now = audio.currentTime;
  const laneNotes = notes.filter(n => n.lane === lane && n.type === 'long' && !n.hit && n.spawned);
  if(laneNotes.length === 0) return;
  // find the long note which time <= now <= endTime+buffer OR nearest endTime
  let candidate = null;
  laneNotes.forEach(n=>{
    if(n.hold) candidate = n;
  });
  if(!candidate){
    // nothing held — ignore
    return;
  }
  // if release occurs before endTime - tolerant window => fail
  if(now + 0.05 < candidate.endTime){
    // released early -> fail
    candidate.hold = false;
    candidate.hit = true;
    stats.holdfail++;
    combo = 0; updateHUD();
    flashJudge('HOLD BREAK', 'bad');
  }else{
    // success
    candidate.hit = true;
    stats.holdsuccess++;
    // reward points proportional to length
    const lengthSec = Math.max(0.1, candidate.endTime - candidate.time);
    const gained = Math.round(200 * Math.min(3, lengthSec));
    score += gained;
    combo += 1;
    updateHUD();
    flashJudge('HOLD OK +' + gained, 'great');
  }
}

/* markHit / markMiss */
function markHit(n, rank){
  if(n.hit) return;
  n.hit = true;
  // scoring per rank
  let gained = 0;
  switch(rank){
    case 'perfect': gained = 1000; stats.perfect++; break;
    case 'great': gained = 700; stats.great++; break;
    case 'good': gained = 300; stats.good++; break;
    case 'bad': gained = 100; stats.bad++; break;
  }
  score += gained + Math.round(combo * 2);
  combo += 1;
  updateHUD();
  flashJudge(rank.toUpperCase(), rank);
}

function markMiss(n){
  if(n.hit) return;
  n.hit = true;
  combo = 0;
  updateHUD();
  flashJudge('MISS', 'miss');
  stats.miss++;
}

/* judge display helper */
let judgeTimer = null;
function flashJudge(text, cls){
  judgeDisplay.textContent = text;
  judgeDisplay.className = 'judge ' + (cls || '');
  if(judgeTimer) clearTimeout(judgeTimer);
  judgeTimer = setTimeout(()=>{ judgeDisplay.textContent = '---'; judgeDisplay.className = 'judge'; }, 700);
}

/* HUD 更新 */
function updateHUD(){
  scoreEl.textContent = `Score: ${score}`;
  comboEl.textContent = `Combo: ${combo}`;
}

/* showResult modal */
function showResult(){
  finalScore.textContent = `Score: ${score}`;
  finalStats.innerHTML = `
    <div>PERFECT: ${stats.perfect} / GREAT: ${stats.great} / GOOD: ${stats.good} / BAD: ${stats.bad} / MISS: ${stats.miss}</div>
    <div>HOLD success: ${stats.holdsuccess} / hold fail: ${stats.holdfail}</div>
  `;
  resultModal.classList.remove('hidden');
}

/* close modal */
closeResult.addEventListener('click', ()=>{
  resultModal.classList.add('hidden');
});

/* format time */
function formatTime(sec){
  if(!sec || isNaN(sec)) return '00:00';
  const s = Math.floor(sec % 60).toString().padStart(2,'0');
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

/* 画面クリックでフォーカス外し（Space を効かせるための補助） */
window.addEventListener('click', ()=>{
  try{ window.focus(); } catch(e){}
});

/* 初期：曲選択にサンプルを入れる */
populateSongSelectFromArray();
function populateSongSelectFromArray(){
  // sync with songs[]
  const sel = songSelect;
  sel.innerHTML = '';
  songs.forEach((s,i)=>{
    const o = document.createElement('option');
    o.value = i;
    o.textContent = s.title + (s.bpm ? ` — ${s.bpm}BPM` : '');
    sel.appendChild(o);
  });
}
populateSongSelectFromArray();

/* helper: allow loading by double-click on option */
songSelect.addEventListener('dblclick', ()=>{
  const idx = Number(songSelect.value); if(isNaN(idx)) return;
  const s = songs[idx];
  if(!s.src) { alert('この曲はsrcが空です。Add SongでBase64を追加してください。'); return; }
  loadSong(s);
});

/* Space to start/stop */
window.addEventListener('keydown', (e)=>{
  if(e.code === 'Space') e.preventDefault();
  if(e.code === 'Space' && !running){
    startSong();
  }
});

/* 最後に：もし user が直接 Base64 を最初から JS に埋めたい場合
   songs.push({id:'x', title:'MySong', bpm:130, src:'data:audio/mpeg;base64,...'});
*/
