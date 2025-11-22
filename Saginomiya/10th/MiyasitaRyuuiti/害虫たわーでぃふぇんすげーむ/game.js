// game.js — フル版（セーブ/ロード・売却・寿命味方・新敵・ボス継続出現対応）
// 鷹ボス(hawk)追加: hp 2400, reward 5000, wave 15 出現。queen と同様に撃破されるまで戻ってくる仕様。
// ムカデ（centipede）追加: コスト500, 攻撃20, 通路上にのみ設置可能, 体当たり15回で死亡, 1体制限。鷹撃破でショップ追加。

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const CELL = 48;
  const COLS = 14;
  const ROWS = 8;
  const pathCells = [];

// パス作成（ジグザグ）
(function createPath(){
  const mid = Math.floor(ROWS/2);
  for(let c=0;c<COLS;c++){
    const r = mid + Math.round(2*Math.sin(c/2));
    pathCells.push({c, r});
  }
})();

  // 状態
  let gold = 100, life = 10, wave = 0, running = false, timeScale = 1;
  const towers = [], enemies = [], projectiles = [];
  let spawningCount = 0; // 生成予約カウント（ウェーブ終了判定のため）

  // DOM
  const shop = document.getElementById('shop');
  const logEl = document.getElementById('log');
  const goldEl = document.getElementById('gold');
  const lifeEl = document.getElementById('life');
  const waveEl = document.getElementById('wave');
  const ownedEl = document.getElementById('owned');

  function log(s){
    const d = document.createElement('div');
    d.textContent = s;
    logEl.prepend(d);
  }

  // 味方定義（centipede を追加）
  const TOWER_TYPES = {
    cockroach: {name:'ゴキブリ', cost:30, range:1.2, dmg:15, cd:1.2, emoji:'🪳'},
    mosquito: {name:'蚊', cost:45, range:3.2, dmg:8, cd:0.6, emoji:'🦟'},
    slug: {name:'ナメクジ', cost:80, range:2.0, dmg:8, cd:2.5, emoji:'🐌', burn:true, duration:30},
    stinkbug: {name:'カメムシ', cost:100, range:2.5, dmg:15, cd:1.0, emoji:'🪲', aoe:true, duration:10},
    centipede: {name:'ムカデ', cost:500, range:0, dmg:20, cd:0.3, emoji:'🐛', pathOnly:true} // 新：ムカデ
  };

  // 敵定義（カマキリの絵文字を変更して見分けやすく）
  const ENEMY_TYPES = {
    bird:   {name:'鳥', hp:30, speed:1.0, reward:12, emoji:'🐦'},
    frog:   {name:'カエル', hp:80, speed:0.6, reward:22, emoji:'🐸'},
    spider: {name:'クモ', hp:45, speed:0.9, reward:16, emoji:'🕷️'},
    mantis: {name:'カマキリ', hp:100, speed:1.1, reward:28, emoji:'🦗'},
    rat:    {name:'ネズミ', hp:150, speed:1.8, reward:40, emoji:'🐀'},
    armyAnt:{name:'軍隊アリ', hp:90, speed:1.2, reward:80, emoji:'🐜'},
    queen:  {name:'スパイダークイーン', hp:1200, speed:1.0, reward:200, emoji:'👑🕷️'},
    hawk:   {name:'鷹', hp:2400, speed:1.3, reward:5000, emoji:'🦅'},
    onyanma: { name: 'オニヤンマ', hp: 4500, speed: 1.0, reward: 12000, emoji: '🐉' },
  };

  // ヘルパー
  function cellCenter(c,r){ return {x:c*CELL+CELL/2, y:r*CELL+CELL/2}; }
  function distance(a,b){ const dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx*dx + dy*dy); }

  // グリッド描画
  function drawGrid(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let r=0;r<ROWS;r++){
      for(let c=0;c<COLS;c++){
        ctx.fillStyle = '#0a2b20';
        ctx.fillRect(c*CELL, r*CELL, CELL-2, CELL-2);
      }
    }
    for(const p of pathCells){
      ctx.fillStyle = '#2a5f3a';
      ctx.fillRect(p.c*CELL, p.r*CELL, CELL-2, CELL-2);
    }
  }

  // 敵生成ユーティリティ
  function createEnemy(type,hp,speed,reward){
    const start = pathCells[0];
    const pos = {x:start.c*CELL + CELL/2, y:start.r*CELL + CELL/2};
    return {
      type,
      hp,
      maxHp: hp,
      speed,
      reward,
      pathIndex: 0,
      pos,
      alive: true,
      spawnTimer: 0,
      childrenSpawned: 0
    };
  }

  // 敵が倒されたときの共通処理
  function onEnemyKilled(type){
    // 鷹を倒したらムカデをショップに追加（既に追加済みなら無視）
    if(type === 'hawk' && !document.querySelector('[data-type="centipede"]')){
      const centCard = document.createElement('div');
      centCard.className = 'card';
      centCard.dataset.type = 'centipede';
      centCard.dataset.cost = TOWER_TYPES.centipede.cost;
      centCard.innerHTML = `
        <div style="font-size:28px">🐛</div>
        <div class="meta"><b>${TOWER_TYPES.centipede.name}</b><div class="muted">コスト:${TOWER_TYPES.centipede.cost} / 道上のみ / 1体のみ</div></div>
        <button class="buy">設置</button>`;
      shop.appendChild(centCard);
      log('🏆 報酬：ムカデ（🐛）がショップに追加されました！');
    }
  }

function spawnWave(){
  wave++;
  waveEl.textContent = wave;
  running = true;
  log(`Wave ${wave} 開始！`);

  // Wave20: オニヤンマ（ボス）
  if (wave === 20) {
    log('⚠️ ボス出現：オニヤンマが現れた！');
    const o = ENEMY_TYPES.onyanma;
    spawningCount++; // 波終了誤判定を防ぐ
    setTimeout(() => {
      enemies.push(createEnemy('onyanma', o.hp, o.speed, o.reward));
      spawningCount--;
      log('🟣 オニヤンマが飛び出した！');
    }, 400);
    return;
  }

  // Wave15: 鷹（hawk）
  if (wave === 15) {
    log('⚠️ ボス出現：鷹が現れた！');
    const h = ENEMY_TYPES.hawk;
    enemies.push(createEnemy('hawk', h.hp, h.speed, h.reward));
    return;
  }

  // Wave10: スパイダークイーン（queen）
  if (wave === 10) {
    log('⚠️ ボス出現：スパイダークイーンが現れた！');
    const q = ENEMY_TYPES.queen;
    enemies.push(createEnemy('queen', q.hp, q.speed, q.reward));
    return;
  }

  // Wave11 以降：軍隊アリの列（列で出す）
  if (wave >= 11) {
    const antCount = 5 + Math.floor(Math.random() * 6); // 5〜10匹
    const a = ENEMY_TYPES.armyAnt;
    log(`🐜 軍隊アリ ${antCount} 匹の隊列が進軍中！`);
    for (let i = 0; i < antCount; i++) {
      spawningCount++;
      setTimeout(() => {
        enemies.push(createEnemy('armyAnt', a.hp, a.speed, a.reward));
        spawningCount--;
      }, i * 250 / timeScale);
    }
  }

  // 通常敵を出す（既存ロジック）
  const count = 6 + Math.floor(wave * 1.5);
  const pool = ['bird', 'frog', 'spider'];
  if (wave >= 3) pool.push('mantis');
  if (wave >= 5) pool.push('rat');

  for (let i = 0; i < count; i++) {
    const type = pool[Math.floor(Math.random() * pool.length)];
    const base = ENEMY_TYPES[type];
    const hp = Math.round(base.hp * (1 + wave * 0.15));
    const sp = base.speed * (1 + Math.min(0.4, wave * 0.03));

    spawningCount++; // 生成予約
    setTimeout(() => {
      enemies.push(createEnemy(type, hp, sp, base.reward));
      spawningCount--; // 実際に湧いたら減らす
    }, i * 800 / timeScale);
  }
}

  // HUD 更新
  function updateHUD(){ goldEl.textContent = gold; lifeEl.textContent = life; waveEl.textContent = wave; }

  // --- ショップ操作（click） ---
  let placing = null;
  shop.addEventListener('click', e=>{
    const card = e.target.closest('.card');
    if(!card) return;
    const type = card.dataset.type;
    const cost = Number(card.dataset.cost);
    if(e.target.classList.contains('buy')){
      if(gold < cost){ log('ゴールドが足りません'); return; }
      placing = type;
      log(TOWER_TYPES[type].name + ' を設置する場所をクリック');
      document.querySelectorAll('.card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected');
    }
  });

  // 設置＋売却
  canvas.addEventListener('click', e=>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / CELL);
    const r = Math.floor(y / CELL);

    const clickedTower = towers.find(t=>t.c===c && t.r===r);
    if(clickedTower){
      const def = TOWER_TYPES[clickedTower.type];
      const refund = Math.round(def.cost * 0.6);
      if(confirm(`${def.name} を売却しますか？\n返金額: ${refund}G`)){
        gold += refund;
        towers.splice(towers.indexOf(clickedTower),1);
        updateHUD(); ownedEl.textContent = towers.length;
        log(`${def.name} を売却しました`);
      }
      return;
    }

    if(placing){
      const def = TOWER_TYPES[placing];

      // ムカデ専用：道上に設置必須 & 既にムカデがいると設置不可
      if(placing === 'centipede'){
        // 道上か？
        if(!pathCells.some(p=>p.c===c && p.r===r)){
          log('ムカデは通路上にのみ設置可能です');
          return;
        }
        // 既にムカデがいるか？
        if(towers.some(t=>t.type === 'centipede')){
          log('ムカデは既に設置されています（1体のみ）');
          return;
        }
      } else {
        // 通常の味方は通路上に設置不可
        if(pathCells.some(p=>p.c===c && p.r===r)){ log('通路上には設置できません'); return; }
      }

      if(towers.some(t=>t.c===c && t.r===r)){ log('その場所は既に占有されています'); return; }
      if(gold < def.cost){ log('ゴールド不足'); return; }

      gold -= def.cost;

      // ムカデは特別な初期パラメータを持つ
      if(placing === 'centipede'){
        // find path index for this cell
        const pIndex = pathCells.findIndex(p=>p.c===c && p.r===r);
        const tower = {
          type: 'centipede',
          c, r,
          x: c*CELL + CELL/2,
          y: r*CELL + CELL/2,
          lvl: 1,
          lastShot: 0,
          // centipede specific
          pathIndex: pIndex >= 0 ? pIndex : 0,
          speed: 1.0, // movement speed along path
          hitsDone: 0,
          hitCooldown: 0
        };
        towers.push(tower);
        log('🐛 ムカデ を設置しました（道に沿って前進して攻撃します）');
      } else {
        const tower = { type: placing, c, r, x:c*CELL+CELL/2, y:r*CELL+CELL/2, lvl:1, lastShot:0 };
        if(def.duration) tower.durationLeft = def.duration;
        towers.push(tower);
        log(`${def.name} を設置しました`);
      }

      placing = null;
      document.querySelectorAll('.card').forEach(c=>c.classList.remove('selected'));
      updateHUD();
      ownedEl.textContent = towers.length;
    } else log('味方をショップから選んで設置してください');
  });

  // --- メインループ ---
  let last = performance.now();
  function loop(now){
    const dt = (now - last) / 1000 * timeScale;
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  // --- 更新処理（移動・攻撃・弾） ---
  const HIT_RADIUS = 16;

  function update(dt){
    // 敵移動＆ボス生成（子供生成）
    for(const e of enemies.slice()){
      if(!e.alive) continue;

      // queen の子生成
      if (e.type === 'queen') {
        e.spawnTimer = (e.spawnTimer || 0) + dt;
        if (e.spawnTimer >= 2 && (e.childrenSpawned || 0) < 5) {
          const childHp = Math.round(ENEMY_TYPES.spider.hp * (1 + wave * 0.1));
          enemies.push(createEnemy('spider', childHp, ENEMY_TYPES.spider.speed, ENEMY_TYPES.spider.reward));
          e.childrenSpawned = (e.childrenSpawned || 0) + 1;
          e.spawnTimer = 0;
          log('スパイダークイーンがクモを生み出した！');
        }
      }

      const nextIndex = Math.min(e.pathIndex + 1, pathCells.length - 1);
      const targetCell = pathCells[nextIndex];
      const target = cellCenter(targetCell.c, targetCell.r);
      const dx = target.x - e.pos.x, dy = target.y - e.pos.y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 4) {
        e.pathIndex = nextIndex;

        // 到達判定
        if (e.pathIndex >= pathCells.length - 1) {
          // queen または hawk の場合：到達しても消さず、HP を維持してスタートに戻す（撃破されるまで何度でも来る）
          if (e.type === 'queen' || e.type === 'hawk') {
            life--;
            updateHUD();
            log((e.type === 'queen' ? '👑 スパイダークイーン' : '🦅 鷹') + ' が巣を攻撃！（戻って再出現）');
            if (life <= 0) { alert('ゲームオーバー'); reset(); return; }
            // スタート位置に戻す（HP は維持）
            e.pathIndex = 0;
            const start = pathCells[0];
            e.pos.x = start.c * CELL + CELL/2;
            e.pos.y = start.r * CELL + CELL/2;
            continue;
          } else {
            // 通常敵は到達で削除
            e.alive = false;
            const idx = enemies.indexOf(e);
            if (idx >= 0) enemies.splice(idx, 1);
            life--; updateHUD(); log(ENEMY_TYPES[e.type].name + ' が巣を襲った！');
            if (life <= 0) { alert('ゲームオーバー'); reset(); return; }
            continue;
          }
        }
      } else {
        if (dist > 0) {
          e.pos.x += (dx / dist) * e.speed * 40 * dt;
          e.pos.y += (dy / dist) * e.speed * 40 * dt;
        }
      }
    }

    // --- ムカデ専用挙動（towers 配列中の centipede を処理） ---
    for (const t of towers.slice()){
      if (t.type !== 'centipede') continue;
      // move along path using pathIndex
      const currIndex = Math.max(0, Math.min(pathCells.length - 1, t.pathIndex));
      const nextIndex = Math.max(0, currIndex - 1);
      const targetCell = pathCells[nextIndex];
      const target = cellCenter(targetCell.c, targetCell.r);
      const dx = target.x - t.x, dy = target.y - t.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 4) {
        t.pathIndex = nextIndex;
        // 到達して最後のセルまで来たら消滅
        if (t.pathIndex >= pathCells.length - 1){
          const ti = towers.indexOf(t);
          if (ti >= 0) towers.splice(ti, 1);
          ownedEl.textContent = towers.length;
          log('🐛 ムカデが道の終点に到達して消滅しました');
          continue;
        }
      } else {
        if (dist > 0){
          const step = t.speed * 40 * dt;
          t.x += (dx / dist) * step;
          t.y += (dy / dist) * step;
        }
      }

      // 攻撃クールダウン処理（フレーム毎に減らす）
      t.hitCooldown = (t.hitCooldown || 0) - dt;
      if (t.hitCooldown <= 0){
        // 衝突判定：近くの敵に当たるとダメージを与える（1回ヒットで20）
        let attacked = false;
        for (const e of enemies.slice()){
          if (!e.alive) continue;
          const d = distance({x:t.x,y:t.y}, e.pos);
          if (d <= HIT_RADIUS + 6){ // ちょっと広めに判定
            // ヒット
            e.hp -= TOWER_TYPES.centipede.dmg;
            t.hitsDone = (t.hitsDone || 0) + 1;
            t.hitCooldown = TOWER_TYPES.centipede.cd; // 小さなクールダウン
            attacked = true;
            log(`🐛 ムカデが ${ENEMY_TYPES[e.type].name} に切りつけた！ -${TOWER_TYPES.centipede.dmg}HP`);
            if (e.hp <= 0){
              e.alive = false;
              const idx = enemies.indexOf(e); if (idx >= 0) enemies.splice(idx, 1);
              gold += e.reward; updateHUD();
              log(`${ENEMY_TYPES[e.type].name} を撃破！ +${e.reward}G`);
              onEnemyKilled(e.type); // ボス撃破判定など
            }
            // ムカデが15回当たったら消える
            if (t.hitsDone >= 15){
              const ti = towers.indexOf(t);
              if (ti >= 0) towers.splice(ti, 1);
              ownedEl.textContent = towers.length;
              log('🐛 ムカデは15回の攻撃を行い消滅しました');
            }
            break; // 1回のクールダウンにつき1ヒット
          }
        }
        if (!attacked){
          // 何もしない
        }
      }
    }

    // タワー攻撃（AOE / burn / projectile） - centipede は上で処理済み
    for(const t of towers.slice()){
      if (t.type === 'centipede') continue; // already handled

      const def = TOWER_TYPES[t.type];
      t.lastShot = (t.lastShot || 0) - dt;

      // 寿命処理
      if (def.duration && t.durationLeft !== undefined){
        t.durationLeft -= dt;
        if (t.durationLeft <= 0){
          log(`${def.name} は寿命を迎えました…`);
          const ti = towers.indexOf(t);
          if (ti >= 0) towers.splice(ti, 1);
          ownedEl.textContent = towers.length;
          continue;
        }
      }

      if (t.lastShot <= 0){
        // AOE（カメムシ）
        if (def.aoe){
          let attacked = false;
          for (const e of enemies.slice()){
            if (!e.alive) continue;
            if (distance({x:t.x,y:t.y}, e.pos) <= def.range * CELL){
              e.hp -= def.dmg;
              attacked = true;
              if (e.hp <= 0){
                e.alive = false;
                const idx = enemies.indexOf(e); if (idx >= 0) enemies.splice(idx, 1);
                gold += e.reward; updateHUD();
                log(`${ENEMY_TYPES[e.type].name} をカメムシのガスで撃破！`);
                onEnemyKilled(e.type);
              }
            }
          }
          if (attacked) log(`${def.name} がガスを放出！`);
          t.lastShot = def.cd;
          continue;
        }

        // 単体ターゲット探索
        let target = null, bestD = Infinity;
        for (const e of enemies){
          if (!e.alive) continue;
          const d = distance({x:t.x,y:t.y}, e.pos);
          if (d <= def.range * CELL && d < bestD){
            bestD = d; target = e;
          }
        }

        if (target){
          if (def.burn){
            if (!target.burn){
              target.burn = { timer: 1, dmg: def.dmg, duration: 5 };
              log(`${def.name} が ${ENEMY_TYPES[target.type].name} に粘液を付着！`);
            } else {
              // duration をリセット/延長
              target.burn.duration = Math.max(target.burn.duration || 0, 5);
            }
          } else {
            projectiles.push({ x: t.x, y: t.y, target, speed: 450, dmg: def.dmg, life: 2.5 });
          }
          t.lastShot = def.cd;
        }
      }
    }

    // ナメクジの持続ダメージ処理
    for (const e of enemies.slice()){
      if (e.burn){
        e.burn.timer -= dt;
        e.burn.duration -= dt;
        if (e.burn.timer <= 0){
          e.hp -= e.burn.dmg;
          e.burn.timer = 1;
          if (e.hp <= 0){
            e.alive = false;
            const idx = enemies.indexOf(e); if (idx >= 0) enemies.splice(idx, 1);
            gold += e.reward; updateHUD();
            log(`${ENEMY_TYPES[e.type].name} が粘液ダメージで倒れた！`);
            onEnemyKilled(e.type);
          }
        }
        if (e.burn.duration <= 0) delete e.burn;
      }
    }

    // 弾更新（追尾）
    for (const p of projectiles.slice()){
      if (!p.target || !p.target.alive){ projectiles.splice(projectiles.indexOf(p), 1); continue; }
      const tx = p.target.pos.x, ty = p.target.pos.y;
      const dx = tx - p.x, dy = ty - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const step = p.speed * dt;
      if (dist <= HIT_RADIUS || dist <= step){
        p.target.hp -= p.dmg;
        if (p.target.hp <= 0){
          p.target.alive = false;
          const idx = enemies.indexOf(p.target); if (idx >= 0) enemies.splice(idx, 1);
          gold += p.target.reward; updateHUD();
          log(`${ENEMY_TYPES[p.target.type].name} を撃破！ +${p.target.reward}G`);
          onEnemyKilled(p.target.type);
        }
        projectiles.splice(projectiles.indexOf(p), 1);
        continue;
      }
      if (dist > 0){
        p.x += (dx / dist) * step; p.y += (dy / dist) * step;
      }
      p.life -= dt;
      if (p.life <= 0) projectiles.splice(projectiles.indexOf(p), 1);
    }

    // wave 終了チェック：
    // - 通常：enemies が 0 かつ spawningCount が 0 なら終了
    // - ボス wave(10,15)：queen/hawk が生きている限り enemies に残るため終了しない（倒されれば enemies が空になり得る）
    if (running && enemies.length === 0 && spawningCount === 0){
      running = false;
      log(`Wave ${wave} 終了`);
      unlockNewAllies();
    }
  }

  // 新味方をショップに追加
  function unlockNewAllies(){
    if (wave >= 5 && !document.querySelector('[data-type="slug"]')){
      const slugCard = document.createElement('div');
      slugCard.className = 'card';
      slugCard.dataset.type = 'slug';
      slugCard.dataset.cost = TOWER_TYPES.slug.cost;
      slugCard.innerHTML = `
        <div style="font-size:28px">🐌</div>
        <div class="meta"><b>${TOWER_TYPES.slug.name}</b><div class="muted">コスト:${TOWER_TYPES.slug.cost} / 持続:${TOWER_TYPES.slug.duration}s</div></div>
        <button class="buy">設置</button>
      `;
      shop.appendChild(slugCard);
      log('🎉 新しい仲間「ナメクジ（🐌）」がショップに追加されました！');
    }

    if (wave >= 10 && !document.querySelector('[data-type="stinkbug"]')){
      const bugCard = document.createElement('div');
      bugCard.className = 'card';
      bugCard.dataset.type = 'stinkbug';
      bugCard.dataset.cost = TOWER_TYPES.stinkbug.cost;
      bugCard.innerHTML = `
        <div style="font-size:28px">🪲</div>
        <div class="meta"><b>${TOWER_TYPES.stinkbug.name}</b><div class="muted">コスト:${TOWER_TYPES.stinkbug.cost} / 範囲攻撃・持続:${TOWER_TYPES.stinkbug.duration}s</div></div>
        <button class="buy">設置</button>
      `;
      shop.appendChild(bugCard);
      log('👑 スパイダークイーン撃破報酬：「カメムシ（🪲）」がショップに追加されました！');
    }
  }

  // 描画
  function draw(){
    drawGrid();

    // タワー（ムカデ含む）
    for(const t of towers){
      ctx.save(); ctx.translate(t.x,t.y);
      ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const emoji = (TOWER_TYPES[t.type] && TOWER_TYPES[t.type].emoji) ? TOWER_TYPES[t.type].emoji : '❓';
      ctx.fillText(emoji, 0, 0);
      // 範囲は通常のタワーだけ表示
      if (TOWER_TYPES[t.type] && !TOWER_TYPES[t.type].pathOnly){
        ctx.beginPath(); ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.arc(0, 0, TOWER_TYPES[t.type].range * CELL, 0, Math.PI*2); ctx.stroke();
      }
      ctx.restore();
    }

    // 敵（HPバー）
    for(const e of enemies){
      ctx.save(); ctx.translate(e.pos.x,e.pos.y);
      ctx.font='26px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      const typeKey = e.type;
      const emoji = (ENEMY_TYPES[typeKey] && ENEMY_TYPES[typeKey].emoji) ? ENEMY_TYPES[typeKey].emoji : '❓';
      ctx.fillText(emoji, 0, 0);

      const w = (e.type === 'queen' || e.type === 'hawk') ? 80 : 36;
      const h = 6;
      const ratio = Math.max(0, e.hp / e.maxHp);
      ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(-w/2,20,w,h);
      ctx.fillStyle='rgba(200,40,40,0.9)'; ctx.fillRect(-w/2,20,w*ratio,h);
      ctx.restore();
    }

    // 弾
    for(const p of projectiles){
      ctx.beginPath(); ctx.arc(p.x,p.y,5,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.fill();
    }
  }

  // UI ボタン
  document.getElementById('startWave').addEventListener('click', ()=>{ if(!running) spawnWave(); else log('波は進行中です'); });
  document.getElementById('fast').addEventListener('click', function(){ timeScale = (timeScale === 1) ? 2 : 1; this.textContent = `速度 x${timeScale}`; });

  // セーブ / ロード / クリア
  function saveGame(){
    try{
      const data = {
        gold, life, wave,
        towers: towers.map(t => ({ type: t.type, c: t.c, r: t.r, lvl: t.lvl, durationLeft: t.durationLeft, // centipede specific values saved too
          pathIndex: t.pathIndex, x: t.x, y: t.y, hitsDone: t.hitsDone, hitCooldown: t.hitCooldown
        }))
      };
      localStorage.setItem('towerDefenseSave', JSON.stringify(data));
      log('💾 セーブしました');
    }catch(e){ console.error(e); log('セーブに失敗しました'); }
  }

  function loadGame(){
    const s = localStorage.getItem('towerDefenseSave');
    if (!s){ log('セーブデータがありません'); return; }
    try{
      const d = JSON.parse(s);
      gold = d.gold ?? gold;
      life = d.life ?? life;
      wave = d.wave ?? wave;

      towers.length = 0;
      if (Array.isArray(d.towers)){
        for (const t of d.towers){
          const obj = {
            type: t.type,
            c: t.c,
            r: t.r,
            lvl: t.lvl || 1,
            x: (t.x !== undefined) ? t.x : t.c * CELL + CELL/2,
            y: (t.y !== undefined) ? t.y : t.r * CELL + CELL/2,
            lastShot: 0,
            durationLeft: t.durationLeft
          };
          // restore centipede fields if present
          if (t.type === 'centipede'){
            obj.pathIndex = t.pathIndex || 0;
            obj.hitsDone = t.hitsDone || 0;
            obj.hitCooldown = t.hitCooldown || 0;
            obj.speed = 1.0;
          }
          towers.push(obj);
        }
      }

      updateHUD();
      ownedEl.textContent = towers.length;
      log('✅ セーブデータを読み込みました！');

      // セーブ状態に合わせてショップ更新（ナメクジ/カメムシ）
      unlockNewAllies();
      // 念のためセーブ内に含まれていれば追加
      if (d.towers && d.towers.some(tt => tt.type === 'slug')) {
        if (!document.querySelector('[data-type="slug"]')) unlockNewAllies();
      }
      if (d.towers && d.towers.some(tt => tt.type === 'stinkbug')) {
        if (!document.querySelector('[data-type="stinkbug"]')) unlockNewAllies();
      }
    }catch(e){ console.error(e); log('セーブの読み込みに失敗しました'); }
  }

  function clearSave(){ localStorage.removeItem('towerDefenseSave'); log('🧹 セーブ削除'); }

  const saveBtn = document.getElementById('saveBtn');
  const loadBtn = document.getElementById('loadBtn');
  const clearBtn = document.getElementById('clearBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveGame);
  if (loadBtn) loadBtn.addEventListener('click', loadGame);
  if (clearBtn) clearBtn.addEventListener('click', clearSave);
  window.saveGame = saveGame; window.loadGame = loadGame; window.clearSave = clearSave;

  // リセット
  function reset(){
    gold = 100; life = 10; wave = 0;
    towers.length = 0; enemies.length = 0; projectiles.length = 0;
    spawningCount = 0;
    updateHUD(); log('リセットしました');
  }

  // 初期化 + ゲームループ開始
  updateHUD();
  requestAnimationFrame(loop);
});
