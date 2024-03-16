const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

let m = -1, b = 1, a, ny = 0, mochi = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], nx = 0, turn = -1, X, Y, x = 0, y = 0, move = [[0, 1, 0, 0, 0, 0, 0, 0, 0],[1, 0, 1, 0, 0, 0, 1, 0, 1],[0, 1, 0, 1, 0, 1, 0, 1, 0],[1, 1, 1, 1, 0, 1, 1, 1, 1],[1, 1, 1, 1, 0, 1, 0, 1, 0]]
mas = [ [-3,-4,-2],
        [0,-1, 0],
        [0, 1, 0],
        [2, 4, 3]];

// Image オブジェクトを生成
let lion = new Image(), kirin = new Image(), zou = new Image(), hiyoko = new Image(), ticken = new Image();
let elion = new Image(), ekirin = new Image(), ezou = new Image(), ehiyoko = new Image(), eticken = new Image();
lion.src = "./画像/lion.jpg";
kirin.src = "./画像/kirin.jpg";
zou.src = "./画像/zou.jpg";
hiyoko.src = "./画像/hiyoko.jpg";
ticken.src = "./画像/鶏.png";

elion.src = "./画像/e lion.jpg";
ekirin.src = "./画像/e kirin.jpg";
ezou.src = "./画像/e zou.jpg";
ehiyoko.src = "./画像/e hiyoko.jpg";
eticken.src = "./画像/e鶏.png";
//drawImage(image, x, y, width, height)
lion.onload = function(){
  ctx.drawImage(lion, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
kirin.onload = function(){
  ctx.drawImage(kirin, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
hiyoko.onload = function(){
  ctx.drawImage(hiyoko, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
zou.onload = function(){
  ctx.drawImage(zou, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
ticken.onload = function(){
  ctx.drawImage(ticken, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
elion.onload = function(){
  ctx.drawImage(elion, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
ekirin.onload = function(){
  ctx.drawImage(ekirin, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
ehiyoko.onload = function(){
  ctx.drawImage(ehiyoko, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
ezou.onload = function(){
  ctx.drawImage(ezou, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}
eticken.onload = function(){
  ctx.drawImage(eticken, (x * 200 + 230) / b + (b - 1) * 10, ((y * 200 + 20) / b) + (b - 1) * 5, 180 / b, 180 / b);
}

//おけるマスを通常のマスに戻す
function shokika(){
  nx = 10;
  ny = 10;
  for(let n = 0; n < 4; n++){
    for(let i = 0; i < 3; i++){
      if(mas[n][i] >= 6){
        mas[n][i] -= 6;
      }
      if(mas[n][i] <= -6){
        mas[n][i] += 6;
      }
    }
  }
};

//持ち駒の表示
function mochigoma(){
  b = 2;
  for(let n = 0; n < 2; n++){
    x = n * 9 - 1;
  for(let z = 0; z < 6; z++){
    if(mochi[n][z] >= 0){ //手前の持ち駒
      y = 7 - z;
    if(mochi[n][z] == 1){
      hiyoko.onload();
    }
    if(mochi[n][z] == 2){
      zou.onload();
    }
    if(mochi[n][z] == 3){
      kirin.onload();
    }
  }
  else{ //奥の持ち駒
    y = z;
    if(mochi[n][z] == -1){
      ehiyoko.onload();
    }
    if(mochi[n][z] == -2){
      ezou.onload();
    }
    if(mochi[n][z] == -3){
      ekirin.onload();
    }
  }
  }
  }
}

//表作成
function hyou(){
  b = 1;
  for(y = 0; y < 4; y++){
    for(x = 0; x < 3; x++){
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeRect(x * 200 + 220, y * 200 + 10, 200, 200);
      if(mas[y][x] >= 6 || mas[y][x] <= -6){ //動けるマス
        ctx.strokeStyle = 'yellow';
        ctx.strokeRect(x * 200 + 223, y * 200 + 13, 194, 194);
      }
      if(mas[y][x] >= 0){
      if(mas[y][x] == 1 || mas[y][x] == 7){ //ひよこ
        hiyoko.onload();
      }
      if(mas[y][x] == 2 || mas[y][x] == 8){ //ぞう
        zou.onload();
      }
      if(mas[y][x] == 3 || mas[y][x] == 9){ //kirin
        kirin.onload();
      }
      if(mas[y][x] == 4 || mas[y][x] == 10){ //らいおｎ
        lion.onload();
      }
      if(mas[y][x] == 5 || mas[y][x] == 11){ //鶏
        ticken.onload();
      }
    }
    else{
      if(mas[y][x] == -1 || mas[y][x] == -7){ //ひよこ
        ehiyoko.onload();
      }
      if(mas[y][x] == -2 || mas[y][x] == -8){ //ぞう
        ezou.onload();
      }
      if(mas[y][x] == -3 || mas[y][x] == -9){ //kirin
        ekirin.onload();
      }
      if(mas[y][x] == -4 || mas[y][x] == -10){ //らいおｎ
        elion.onload();
      }
      if(mas[y][x] == -5 || mas[y][x] == -11){//鶏
        eticken.onload();
      }
    }
    if(m != -1){
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'lime';
      ctx.strokeRect((turn + Math.abs(turn)) / 2 * 900 + 25, Math.abs(((turn + Math.abs(turn)) / 2 - 1) * 7 + m) * 90 + 15 + Math.abs(((turn + Math.abs(turn)) / 2 - 1) * 7 + m) * 10, 90, 90);
    }
    else{
      if(mas[ny][nx] == 0){
        ctx.strokeStyle = 'white';
      }
      else if((mas[ny][nx] <= 0) == (turn + Math.abs(turn)) / 2){
      ctx.strokeStyle = 'lime';
      }
      else{
        ctx.strokeStyle = 'red';
      }
      ctx.lineWidth = 5;
      ctx.strokeRect(nx * 200 + 232, ny * 200 + 22, 176, 176);
    }
    }
  }
}

//クリック処理
canvas.addEventListener("click", (e) => {
  // マウスの座標をCanvas内の座標とあわせるため
  const rect = canvas.getBoundingClientRect();
  let point = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
  for(x = 0; x < 3; x++){
    for(y = 0; y < 4; y++){
      if((((x * 200 + 222) <= point.x && point.x <= ((x + 1) * 200 + 218) && (y * 200 + 12) <= point.y && point.y <= ((y + 1) * 200 + 8)))){
        movement();
        shokika();
        Move();
      }
    }
  }
  for(let i = 0; i < 6; i++){
    if((turn + Math.abs(turn)) / 2 * 900 + 25 <= point.x && point.x <= (turn + Math.abs(turn)) / 2 * 910 + 105 && Math.abs(((turn + Math.abs(turn)) / 2 - 1) * 7 + i) * 90 + 15 + Math.abs(((turn + Math.abs(turn)) / 2 - 1) * 7 + i) * 10 <= point.y && point.y <= (Math.abs(((turn + Math.abs(turn)) / 2 - 1) * 7 + i) + 1) * 90 + 15 + Math.abs(((turn + Math.abs(turn)) / 2 - 1) * 7 + i) * 10 && mochi[(turn + Math.abs(turn)) / 2][i] != 0){
      m = i;
      for(y = 0; y < 4; y++){
        for(x = 0; x < 3; x++){
          if(mas[y][x] == 0){
            mas[y][x] += 6;
          }
        }
      }
    }
  }
});

//勝敗
function shouhai(){
  for(let n = 0; n < 2; n++){
  for(let i = 0; i < 6; i++){
    if(mochi[n][i] == 4){ //持ち駒にキングがいるか
      alert('手前側の勝ち');
      location.reload();
      mochi[n][i] = 0;
    }
    if(mochi[n][i] == -4){ //持ち駒にキングがいるか
      alert('奥側の勝ち');
      location.reload();
      mochi[n][i] = 0;
    }
  }
}
}

//動いた時の処理
function movement(){
  if(mas[y][x] <= -6 || 6 <= mas[y][x]){
    if(m != -1){  //控えの駒の移動
      mas[y][x] = mochi[(turn + Math.abs(turn)) / 2][m]
    for(a = m; mochi[(turn + Math.abs(turn)) / 2][a] != 0; a++){
      mochi[(turn + Math.abs(turn)) / 2][a] = mochi[(turn + Math.abs(turn)) / 2][a + 1];
    }
  }
  else{ //ます内の駒の移動
    for(a = 0; mochi[(turn + Math.abs(turn)) / 2][a] != 0; a++){
    }
    mochi[(turn + Math.abs(turn)) / 2][a] = (((mas[y][x] - 7 * turn) % 4 ) + turn) * -1;
    if(mas[ny][nx] == turn * -1 && y == (turn + Math.abs(turn)) / 2 * 3){
      mas[y][x] = -5 * turn;
    }
    else{
      mas[y][x] = mas[ny][nx];
    }
    mas[ny][nx] = 0;
    shokika();
  }
  turn *= -1;
}
  m = -1;
}

//どこに動けるかの処理
function Move(){
  m = -1;
  ny = y;
  nx = x;
  for(let n = 0; n < 9; n++){
    if(mas[ny][nx] != 0 && (mas[ny][nx] <= -1) == (turn + Math.abs(turn)) / 2 && move[mas[y][x] * -1 * turn - 1][((4 + 4 * turn) - n ) * turn] == 1){
      Y = Math.floor(n / 3) - 1;
      X = Math.floor(n % 3) - 1;
      if(0 <= (y + Y) && (y + Y) < 4 && 0 <= (x + X) && (x + X) < 3){
      if((mas[y + Y][x + X] >= 0) == (turn + Math.abs(turn)) / 2 || mas[y + Y][x + X] == 0){
      mas[y + Y][x + X] += (6 * turn);
      }
    }
    } 
  }
}

//メインのループ処理
function main(){
  ctx.clearRect(0, 0, 1040, 820);
  mochigoma();
  hyou();
  shouhai();
  requestAnimationFrame(main);
}
main();