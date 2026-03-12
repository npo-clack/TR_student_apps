/* 共通関数: 画像の読み込み　*/
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            resolve(img)
        };
        img.src = src;
    });
}


/** ページが読み込まれたら実行 */
window.onload = () => {
    loadImage("https://raw.githubusercontent.com/3simai/slide_pazzle_winter/main/u-yuri-hu.jpg").then(loadedImage => {
        // 正解画像を390×390で描画する
        const seikaiImage = drawSeiakImage(loadedImage)
        // blank画像を読み込む
        loadImage("https://raw.githubusercontent.com/sktaz/slide_pazzle_winter/main/image/blank_tile.png").then(blankTile => {
            // スライド用のタイル画像を生成する(引数: 390×390の正解画像, blank画像)
            createSlidePazzleImage(seikaiImage, blankTile)
        }).catch(e => {
            console.log('onload error', e);
        });

    }).catch(e => {
        console.log('onload error', e);
    });
};


/** 正解画像を390×390で描画する */
function drawSeiakImage(loadedImage) {
    const canvasElem = document.createElement('canvas')
    // <canvas>のサイズを設定
    canvasElem.width = 390
    canvasElem.height = 390
    // 2Dグラフィックを描画するためのメソッドやプロパティをもつオブジェクトを取得
    const ctx = canvasElem.getContext('2d')

    // 読み込んだ画像を390×390で描画する
    ctx.drawImage(loadedImage, 0, 0, 390, 390)

    // 画像をbase64エンコード
    const seikaiImage = canvasElem.toDataURL()

    // img要素を生成する
    // (補足)作っているものイメージ: <img src="base64エンコードしたした画像">
    let tile = document.createElement("img");
    tile.src = seikaiImage;

    // index.htmlファイルに定義したseikaiのdivを取得し、生成したimg要素を描画する
    document.getElementById("seikai").append(tile);

    // seikaiImageを戻り値として返す
    return seikaiImage
}



/** スライド用のタイル画像を生成する(引数: 390×390の正解画像, blank画像) **/
function createSlidePazzleImage(seikaiImage, blankTile) {

    // <canvas>要素を生成
    const canvas = document.createElement('canvas')
    // <canvas>のサイズを設定
    canvas.width = 130
    canvas.height = 130
    const ctx = canvas.getContext('2d')

    // 新たな<img>要素を作成
    const image = new Image()
    // img要素のソースのパスを設定  イメージ: <img src="defaultImage">
    image.src = seikaiImage
    image.onload = async () => {

        const displayOrder = [1, 8, 2, 7, 4, 3, 6, 5, 9]

        const imageConfigureList = [
            {
                orderNum: 1, // 画像の順番
                customFunc: () => ctx.drawImage(image, 0, 0, 130, 130, 0, 0, 130, 130) // 画像をどの位置で描画するかの関数呼び出し
            },
            {
                orderNum: 2,
                customFunc: () => ctx.drawImage(image, 130, 0, 130, 130, 0, 0, 130, 130)
            },
            {
                orderNum: 3,
                customFunc: () => ctx.drawImage(image, 260, 0, 130, 130, 0, 0, 130, 130)
            },

            {
                orderNum: 4,
                customFunc: () => ctx.drawImage(image, 0, 130, 130, 130, 0, 0, 130, 130)
            },
            {
                orderNum: 5,
                customFunc: () => ctx.drawImage(image, 130, 130, 130, 130, 0, 0, 130, 130)
            },
            {
                orderNum: 6,
                customFunc: () => ctx.drawImage(image, 260, 130, 130, 130, 0, 0, 130, 130)
            },

            {
                orderNum: 7,
                customFunc: () => ctx.drawImage(image, 0, 260, 130, 130, 0, 0, 130, 130)
            },
            {
                orderNum: 8,
                customFunc: () => ctx.drawImage(image, 130, 260, 130, 130, 0, 0, 130, 130)
            },
            {
                orderNum: 9,
                customFunc: () => ''
            }
        ]


        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {

                const selectedNum = displayOrder.shift()


                const configure = imageConfigureList.find((imageConfigure) => {
                    return imageConfigure.orderNum == selectedNum
                })

                // img要素を生成する
                let tile = document.createElement("img");

                // 以下で作っているもののイメージ: 
                // <img id="0-0" ordernum="1" class="tile__image" src="base64エンコードしたデータ"></img>
                // <img id="0-1" ordernum="8" class="tile__image" src="base64エンコードしたデータ"></img> ...

                tile.id = row.toString() + "-" + col.toString();
                tile.setAttribute("orderNum", selectedNum);
                tile.className = "tile__image"

                // 番号が9番目の場合はblankタイルを設定する    
                if (selectedNum == 9) {
                    tile.src = blankTile.src;
                } else {
                    // タイルの画像を描く
                    configure.customFunc()
                    // 画像をbase64エンコード
                    const encodedImage = canvas.toDataURL()
                    tile.src = encodedImage;
                }

                // index.htmlファイルに定義したpazzleのdivを取得し、生成したimg要素を描画する
                document.getElementById("pazzle").append(tile);


                // dragが起きた時に関数呼び出しされるようにリスナーを追加
                tile.addEventListener("dragstart", dragStart);
                tile.addEventListener("dragover", dragOver);
                tile.addEventListener("dragenter", dragEnter);
                tile.addEventListener("dragleave", dragLeave);
                tile.addEventListener("drop", dragDrop);
                tile.addEventListener("dragend", dragEnd);
            }
        }

    }
}


/** クリックした画像 */
let clickedTile

/** ドラッグした先 */
let toTile

/** ドラッグした回数 */
let sumCount = 0


/** dragStart時に呼び出す関数 */
const dragStart = (event) => {
    clickedTile = event.target // クリックしてドラッグしようとした画像を取得
}

/** dragOver時に呼び出す関数 */
const dragOver = (event) => {
    event.preventDefault()
}

/** dragEnter時に呼び出す関数 */
const dragEnter = (event) => {
    event.preventDefault()
}

/** dragLeave時に呼び出す関数 */
const dragLeave = (event) => {
    event.preventDefault()
}

/** dragDrop時に呼び出す関数 */
const dragDrop = (event) => {
    toTile = event.target // ドラッグ先の画像を取得
}

/** dragEnd時に呼び出す関数 */
const dragEnd = () => {
    // ドラッグ先がblankでなければreturn
    // 補足:blank画像以外にdropさせないようにするための処理
    if (!toTile.getAttribute('src').includes('blank')) {
        return
    }


    // 上・下・右・左にしか動かせないように設定
    // 補足: 斜めに画像をドラッグ&ドロップできないようにするための処理
    const currCoords = clickedTile.id.split('-') // "0-0" -> ["0", "0"]
    const row = parseInt(currCoords[0])
    const col = parseInt(currCoords[1])

    const toCoords = toTile.id.split('-')
    const row2 = parseInt(toCoords[0])
    const col2 = parseInt(toCoords[1])

    const moveLeft = row == row2 && col2 == col - 1
    const moveRight = row == row2 && col2 == col + 1

    const moveUp = col == col2 && row2 == row - 1
    const moveDown = col == col2 && row2 == row + 1

    const isMovable = moveLeft || moveRight || moveUp || moveDown

    if (isMovable) {
        // imageの入れ替え
        const currImg = clickedTile.src
        const otherImg = toTile.src

        clickedTile.src = otherImg
        toTile.src = currImg

        // numの入れ替え(numは正解にたどりついたかの判定に利用するため、入れかえを行う)
        const currNum = clickedTile.getAttribute('orderNum')
        const otherNum = toTile.getAttribute('orderNum')
        clickedTile.setAttribute('orderNum', otherNum)
        toTile.setAttribute('orderNum', currNum)

        // dragした回数をカウントする
        sumCount = sumCount + 1
        document.getElementById('sumCount').innerText = sumCount
    }

    /** 正解したかどうかチェックする */
    checkResult()
}


/** 成功時のメッセージ */
let message;

/** 正解したかチェックする関数 */
const checkResult = () => {
    const tile00 = document.getElementById('0-0')
    const tile01 = document.getElementById('0-1')
    const tile02 = document.getElementById('0-2')

    const tile10 = document.getElementById('1-0')
    const tile11 = document.getElementById('1-1')
    const tile12 = document.getElementById('1-2')

    const tile20 = document.getElementById('2-0')
    const tile21 = document.getElementById('2-1')
    const tile22 = document.getElementById('2-2')

    const list = [tile00, tile01, tile02, tile10, tile11, tile12, tile20, tile21, tile22]

    // elemetの項目numの値が1~9に並んだら正解判定する
    const isCorrect = list.every((item, index) => {
        return item.getAttribute('orderNum') == index + 1
    })

    if (isCorrect && !message) {
        // 補足: もしgetElementsByClassName使用したい場合はgetElementsByClassNameの戻り値は配列なので要素の番号を指定すること
        // 例: getElementsByClassName('message--success')[0]innerText
        document.getElementById('success').innerText = `正解です！ ${sumCount}回で正解`

        list.map((item, index) => {
            if (item) {
                item.removeEventListener('dragstart', dragStart)

                item.removeEventListener('dragover', dragOver)
                item.removeEventListener('dragenter', dragEnter)
                item.removeEventListener('dragleave', dragLeave)

                item.removeEventListener('drop', dragDrop)
                item.removeEventListener('dragend', dragEnd)
            }
        })
    } else {
        document.getElementById('success').innerText = ""
    }
}