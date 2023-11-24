/*設定*/
const ROWS = 10
const COLUMNS = 10
const BOMBS = ROWS * COLUMNS * 0.1
let isEND = false

/*英単語*/
// row = 行
// column = 列
// div = divisionの略で、「区切り」みたいな意味
// create = 作成
// element = 要素
// append = 追加
// child = 子供
// createElement = 要素を作る
// appendChild = 子要素を追加する

/*変数*/
const areas = [] // 譜面を管理する変数

/*盤面作成*/
//行を作る。ROWSの回数ループする。
for (let r = 0; r < ROWS; r++) {
  //divタグを作成する。
  const rowDiv = document.createElement('div')
  //rowDivに対してclassを設定する
  rowDiv.classList.add('row')
  //rowDivのclassに対して行番号を設定する
  rowDiv.classList.add("r" + r)
  //bodyタグの中に作成したdivを追加して画面に表示されるようにする
  document.body.appendChild(rowDiv)
  //行の区画を増やす
  areas[r] = []
  for (let c = 0; c < COLUMNS; c++) {
    //divタグを作成する。
    const columnDiv = document.createElement('div')
    //columnDivに対してclassを設定する
    columnDiv.classList.add('column')
    //columnDivのclassに対して列番号を設定する
    columnDiv.classList.add("c" + c)
    //bodyタグの中に作成したdivを追加して画面に表示されるようにする
    rowDiv.appendChild(columnDiv)
    //マスのデータを格納
    areas[r][c] = {
      //爆弾が設置されているかどうか
      bomb: false,
      //マス目が開いているか
      isOpen: false,
    }
    //Divタグを作成する
    const coverDiv = document.createElement('div')
    //coverDivに対してclassを設定する
    coverDiv.classList.add('cover')
    //bodyタグの中に作成したDivを追加して画面に表示されるようにする
    columnDiv.appendChild(coverDiv)
    //coverDivをクリックしたときに実行する処理
    coverDiv.onclick = function () {
      //もしゲームオーバーなら処理を中止する
      if (isEND) {
        return
      }
      //マスをオープンする
      openArea(r, c)
      //もしゲームオーバーなら処理を中止する
      if (isEND) {
        //ゲームオーバーだったらすべてのマスをオープンする
        openAllArea()
        //スパンタグを作成
        const span = document.createElement('span')
        // スパンタグに文字を作成
        span.innerHTML = "ゲームオーバー"
        // 画面に表示
        document.body.appendChild(span)
        return
      }
      //爆弾がないところを開く
      openNonBombAreas(r, c)
      //オープン可能なマスの数を数える
      const remainingSafeAreaCount = areas.reduce((carry, r) => carry + r.filter(c => !c.isOpen && !c.bomb).length, 0)
      //オープン可能なマスがなければゲームを終了
      if (remainingSafeAreaCount == 0) {
        isEND = true
        //ゲームオーバーだったらすべてのマスをオープンする
        openAllArea()
        //スパンタグを作成
        const span = document.createElement('span')
        // スパンタグに文字を作成
        span.innerHTML = "GAME CLEAR"
        // 画面に表示
        document.body.appendChild(span)
      }
    }
  }
}
//マスをオープンする関数
function openArea(r, c) {
  //マス目をあいていることにする
  areas[r][c].isOpen = true
  //クリックされたマスのDivを取ってくる
  const columnDiv = document.querySelector(".row.r" + r + " .column.c" + c)
  //ますめを覆っている箱を消す
  columnDiv.innerHTML = ""
  //もしクリックされたマスに爆弾があったら
  if (areas[r][c].bomb == true) {
    // 爆弾の画像を表示する
    setbomb(r, c)
    // ゲーム終了フラグを立てる
    isEND = true
  } else {
    //クリックされたマスの周りの爆弾の数を表示
    setAroundBombCount(r, c)
  }
}
/*爆弾の数だけループする*/
for (let i = 0; i < BOMBS; i++) {
  //行番号をランダムに生成
  let min = 0;
  let max = 9;
  let r = Math.floor(Math.random() * (max + 1 - min)) + min;
  //列番号をランダムに生成
  let c = Math.floor(Math.random() * (max + 1 - min)) + min;
  //ランダムに選択したマスに爆弾がある間マスをランダムに選びなおす
  while (areas[r][c].bomb == true) {
    r = Math.floor(Math.random() * (max + 1 - min)) + min
    c = Math.floor(Math.random() * (max + 1 - min)) + min
  }
  //ランダムに選んだマスの爆弾をおいていることにする
  areas[r][c].bomb = true

}
//全マスの周りの爆弾の数を数えて保存
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLUMNS; c++) {
    areas[r][c].aroundBombCount = countBomb(r, c)
  }

}

function setbomb(r, c) {
  //ランダムに生成した行番号と列番号の場所に爆弾を設定
  //ingタグを作成
  const img = document.createElement('img')
  //imgタグに画像を設定
  img.src = "爆弾.png"
  //ランダムに選んだマスのdivを取得
  const hako = document.querySelector(".row.r" + r + " .column.c" + c)
  //ランダムに選んだマスに爆弾の画像を配置
  hako.appendChild(img)
}

//周りの爆弾の数を数えて表示する関数
function setAroundBombCount(r, c) {
  //爆弾の数を表示するためのDivを作成
  const hako = document.createElement('Div')
  //爆弾の数をDivに設定（周りの爆弾の数が０の場合は何も表示しない）
  hako.innerHTML = areas[r][c].aroundBombCount > 0 ? areas[r][c].aroundBombCount : ""
  //クラスを設定
  hako.classList.add('bombCount')
  if (areas[r][c].aroundBombCount == 1) {
    hako.classList.add('bomb-1')
  } else if (areas[r][c].aroundBombCount == 2) {
    hako.classList.add('bomb-2')
  } else if (areas[r][c].aroundBombCount >= 3) {
    hako.classList.add('bomb-3')
  }

  //クリックされたマスのDivを取ってくる
  const box = document.querySelector(".row.r" + r + " .column.c" + c)
  //クリックされたマスの中に爆弾の数を表示する
  box.appendChild(hako)
}
//周りの爆弾を数える関数
function countBomb(r, c) {
  //結果用の変数
  let result = 0;
  //上のマスに爆弾があると＋１
  if (0 < r && areas[r - 1][c].bomb == true)
    result++
  //右上のマスに爆弾があると＋１
  if (0 < r && COLUMNS - 1 > c && areas[r - 1][c + 1].bomb == true)
    result++
  //左上のマスに爆弾があると＋１
  if (0 < r && 0 < c && areas[r - 1][c - 1].bomb == true)
    result++
  //下のマスに爆弾があると＋１
  if (ROWS - 1 > r && areas[r + 1][c].bomb == true)
    result++
  //右下のマスに爆弾があると＋１
  if (ROWS - 1 > r && COLUMNS - 1 > c && areas[r + 1][c + 1].bomb == true)
    result++
  //左下のマスに爆弾があると＋１
  if (ROWS - 1 > r && 0 < c && areas[r + 1][c - 1].bomb == true)
    result++
  //右のマスに爆弾があると＋１
  if (COLUMNS - 1 > c && areas[r][c + 1].bomb == true)
    result++
  //左のマスに爆弾があると＋１
  if (0 < c && areas[r][c - 1].bomb == true)
    result++
  //数えた爆弾の数を返却
  return result
}
//周りに爆弾がないマスをオープンする関数
function openNonBombAreas(r, c) {
  //周りの爆弾の数が1個以上の場合は何もしない
  if (0 < areas[r][c].aroundBombCount)
    return
  //上のマスがオープンしていなければ実行
  if (0 < r && !areas[r - 1][c].isOpen) {
    //上のマスをオープン
    openArea(r - 1, c)
    //上のマスの周りの爆弾がないマスをオープン
    openNonBombAreas(r - 1, c)
  }
  //右上のマスがオープンしていなければ実行
  if (0 < r && COLUMNS - 1 > c && !areas[r - 1][c + 1].isOpen) {
    openArea(r - 1, c + 1)
    openNonBombAreas(r - 1, c)
  }
  //左上のマスがオープンしていなければ実行
  if (0 < r && 0 < c && !areas[r - 1][c - 1].isOpen) {
    openArea(r - 1, c - 1)
    openNonBombAreas(r - 1, c - 1)
  }
  //下のマスがオープンしていなければ実行
  if (ROWS - 1 > r && !areas[r + 1][c].isOpen) {
    openArea(r + 1, c)
    openNonBombAreas(r + 1, c)
  }
  //右下のマスがオープンしていなければ実行
  if (ROWS - 1 > r && COLUMNS - 1 > c && !areas[r + 1][c + 1].isOpen) {
    openArea(r + 1, c + 1)
    openNonBombAreas(r + 1, c + 1)
  }
  //左下のマスがオープンしていなければ実行
  if (ROWS - 1 > r && 0 < c && !areas[r + 1][c - 1].isOpen) {
    openArea(r + 1, c - 1)
    openNonBombAreas(r + 1, c - 1)
  }
  //右のマスがオープンしていなければ実行
  if (COLUMNS - 1 > c && !areas[r][c + 1].isOpen) {
    openArea(r, c + 1)
    openNonBombAreas(r, c + 1)
  }
  //左のマスがオープンしていなければ実行
  if (0 < c && !areas[r][c - 1].isOpen) {
    openArea(r, c - 1)
    openNonBombAreas(r, c - 1)
  }
}
function openAllArea() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      openArea(r, c)
    }
  }
}