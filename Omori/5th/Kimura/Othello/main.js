const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

  let a = 0, x, X, Y, y, turn = 0, px = 0, py = 0, num, pass, passn, black, white;
  mas =
  [
  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  [0 ,0 ,0 ,1,-1 ,0 ,0 ,0 ],
  [0 ,0 ,0,-1 ,1 ,0 ,0 ,0 ],
  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ]];

//表をつくる関数
function hyou(){
  white = 0;
  black = 0;
  for(y = 0; y < 8; y++){
    for(x = 0; x < 8; x++){
      ctx.strokeStyle = 'white';
      ctx.strokeRect(x * 100 + 10, y * 100 + 10, 100, 100);
      if(mas[y][x] == 2){ //おけるマス
        ctx.fillStyle = 'yellow'
        ctx.fillRect(x * 100 + 11, y * 100 + 11, 98, 98);
      }
      if(mas[y][x] == -1){ //ますが黒色の時の処理
        black++;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.beginPath(); 
        ctx.arc(x * 100 + 60, y * 100 + 60, 40, 0, 360);
        ctx.closePath(); 
        ctx.fill(); 
      }
      else if(mas[y][x] == 1){ //ますが白色の時の処理
        white++;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x * 100 + 60, y * 100 + 60, 40, 0, 360);
        ctx.closePath(); 
        ctx.fill(); 
      }
      }
    }
  };

  //クリック処理
  canvas.addEventListener("click", (e) => {
    // マウスの座標をCanvas内の座標とあわせるため
    const rect = canvas.getBoundingClientRect();
    let point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    for(px = 0; px < 8; px++){
      for(py = 0; py < 8; py++){
        if((((px * 100 + 11) <= point.x && point.x <= ((px + 1) * 100 + 9)) && ((py * 100 + 11) <= point.y && point.y <= ((py + 1) * 100 + 9))) && mas[py][px] == 2){
          TO();
          turn = (turn + 1) % 2;
        }
      }
    }
  });

//おける場所見つける処理
function ura(){

  //初期化
  for(y = 0; y < 8; y++){
    for(x = 0; x < 8; x++){
      if(mas[y][x] == 2){
        mas[y][x] = 0;
      }
    }
  }

  //メイン処理
  pass = 0;
  for(y = 0; y < 8; y++){
    for(x = 0; x < 8; x++){
      if(mas[y][x] == turn * 2 - 1){
        for(let n = -1; n <= 1; n++){
          for(let i = -1; i <= 1; i++){
          for(num = 0, X = x + i, Y = y + n; 0 <= X && X <= 7 && 0 <= Y && Y <= 7; num++, X += i, Y += n){
            if(mas[Y][X] == turn * 2 - 1 || mas[Y][X] == 2){
              break;
            }
            else if(mas[Y][X] == 0 ){
              if(num > 0){
                pass++;
                mas[Y][X] = 2;
            }
            break;
          } 
          }
          }
        }
      }
      }
    }
  };

  //裏返す処理
  function TO(){
    for(let n = -1; n <= 1; n++){
      for(let i = -1; i <= 1; i++){
        for(num = 0, X = px + i, Y = py + n; 0 <= X && X <= 7 && 0 <= Y && Y <= 7; num++, X += i, Y += n){
          if(mas[Y][X] == turn * 2 - 1){
            for( X -= i, Y -= n; num >= 0 ; num--, X -= i, Y -= n){
             mas[Y][X] = turn * 2 - 1;
            }
            break;
          }
          else if(mas[Y][X] == 0 ||mas[Y][X] == 2){
            break;
          } 
        }
      }
    }
  };

//勝敗関数
function loser(){
  if(white == 0 || black == 0 ||white + black == 64 || passn <= 0){
    pass = 2;
    passn = 2;
    if(a == 0){
    if(white == black){
      //引き分け
      alert("引き分けです");
        location.reload();
    }
    else if(white < black){
      //黒の勝ち
      alert("黒の勝ちです")
        location.reload();
    }
    else{
      //白の勝ち
      alert("白の勝ちです")
        location.reload();
    }
  }
    a = 1;
  }
};

function loop(){
  ctx.clearRect(0, 0, 820, 820);
  ura();
  hyou();
  loser();
  //キー入力
  if(pass <= 0){
    alert('パスされました');
    passn--;
    turn = (turn + 1) % 2;
  }
  else{
    passn = 2;
  }
requestAnimationFrame(loop);
}

loop();