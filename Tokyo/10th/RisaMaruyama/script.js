document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('startScreen');
  const startBtn = document.getElementById('startBtn');
  const game = document.getElementById('game');
  const playArea = document.getElementById('playArea');
  const nextNumEl = document.getElementById('nextNum');
  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('overlayContent');
  const restartBtn = document.getElementById('restartBtn');
  const timerEl = document.getElementById('timer');

  const COUNT = 30;
  let nextNumber = 1;
  let startedTiming = false;
  let timerInterval = null;
  let startTime = 0;

  function startTimer(){
    startedTiming = true;
    startTime = Date.now();
    timerEl.textContent = '00:00';
    timerInterval = setInterval(() => {
      const s = Math.floor((Date.now()-startTime)/1000);
      const mm = String(Math.floor(s/60)).padStart(2,'0');
      const ss = String(s%60).padStart(2,'0');
      timerEl.textContent = mm + ':' + ss;
    }, 200);
  }
  function stopTimer(){
    if(timerInterval){ clearInterval(timerInterval); timerInterval = null; }
    startedTiming = false;
  }

  function showOverlay(text){
    overlayContent.innerHTML = text;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden','false');
  }
  function hideOverlay(){
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden','true');
  }

  function resetGame(){
    stopTimer();
    timerEl.textContent = '00:00';
    nextNumber = 1;
    nextNumEl.textContent = nextNumber;
    hideOverlay();
    // clear play area
    while(playArea.firstChild) playArea.removeChild(playArea.firstChild);
    placeButtons();
  }

  // placeButtons はレイアウト確定を確認してから配置する（rect が小さければリトライ）
  function placeButtons(retries = 0){
    const rect = playArea.getBoundingClientRect();

    // rect が極端に小さい（hidden などで未確定）なら少し待って再試行
    if((rect.width < 120 || rect.height < 120) && retries < 12){
      return setTimeout(() => placeButtons(retries + 1), 60);
    }

    const placed = [];

    for(let i=1;i<=COUNT;i++){
      const btn = document.createElement('button');
      btn.className = 'num';
      btn.type = 'button';
      btn.textContent = i;
      btn.dataset.num = i;

      // attempt to place without overlap
      let placedOk = false;
      for(let attempt=0; attempt<300; attempt++){
        const pad = 8;
        const w = btn.offsetWidth || 56;
        const h = btn.offsetHeight || 56;
        const x = Math.floor(Math.random() * Math.max(1, (rect.width - w - pad*2))) + pad;
        const y = Math.floor(Math.random() * Math.max(1, (rect.height - h - pad*2))) + pad;
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
        playArea.appendChild(btn);

        const r = btn.getBoundingClientRect();
        let collide = false;
        for(const other of placed){
          const or = other.getBoundingClientRect();
          if(!(r.right < or.left || r.left > or.right || r.bottom < or.top || r.top > or.bottom)){
            collide = true;
            break;
          }
        }
        if(collide){
          playArea.removeChild(btn);
          continue;
        } else {
          placed.push(btn);
          placedOk = true;
          break;
        }
      }
      // if not placed after attempts, append anyway
      if(!placedOk){
        playArea.appendChild(btn);
      }

      btn.addEventListener('click', onNumClick);
    }
  }

  function onNumClick(e){
    const btn = e.currentTarget;
    const val = Number(btn.dataset.num);
    if(val === nextNumber){
      // start timer when 1 pressed
      if(val === 1 && !startedTiming){
        startTimer();
      }
      btn.classList.add('done');
      btn.disabled = true;
      nextNumber++;
      nextNumEl.textContent = nextNumber;

      if(nextNumber > COUNT){
        stopTimer();
        // explode effect: scale & fade each button
        const all = Array.from(document.querySelectorAll('.num'));
        all.forEach((b, i) => {
          b.style.transition = 'transform .6s ease, opacity .6s ease';
          b.style.transform = 'scale(2) rotate(' + (Math.random()*60-30) + 'deg)';
          b.style.opacity = '0';
        });
        setTimeout(() => {
          while(playArea.firstChild) playArea.removeChild(playArea.firstChild);
          // compute elapsed time and format mm:ss
          const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
          const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
          const ss = String(elapsedSec % 60).padStart(2, '0');
          const finalTime = mm + ':' + ss;

          // check and store best time (seconds) in localStorage
          try {
            const bestKey = 'bestTimeSec';
            const prevBest = localStorage.getItem(bestKey);
            let isNewRecord = false;
            if(prevBest === null || elapsedSec < Number(prevBest)){
              localStorage.setItem(bestKey, String(elapsedSec));
              isNewRecord = true;
            }

            // show title, optional new-record label, and time
            let html = '<div>ミッションコンプリート！</div>';
            if(isNewRecord){
              html += '<div class="new-record">最高記録！</div>';
            }
            html += '<div class="final-time">' + finalTime + '</div>';
            showOverlay(html);
          } catch (err) {
            // localStorage may be unavailable in some contexts; fallback to showing time
            showOverlay('<div>ミッションコンプリート！</div><div class="final-time">' + finalTime + '</div>');
          }
        }, 650);
      }
    } else {
      stopTimer();
      showOverlay('ゲームオーバー！');
    }
  }

  // start ボタンは startScreen を隠して game を表示 → レイアウトが固まるまで rAF を使って待機してから resetGame() を呼ぶ
  startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    game.classList.remove('hidden');
    game.setAttribute('aria-hidden','false');
    // requestAnimationFrame を二回使うとレイアウトとペイントが安定してから実行されます
    requestAnimationFrame(() => requestAnimationFrame(resetGame));
  });

  restartBtn.addEventListener('click', () => {
    hideOverlay();
    resetGame();
  });

  // rebuild positions on resize (keeps non-overlap)
  window.addEventListener('resize', () => {
    if(!game.classList.contains('hidden')) resetGame();
  });

  // initialize (keep start screen visible)
  hideOverlay();
});