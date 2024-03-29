//game.js
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//背景
var kotoribakobg = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "images/コトリバコ.jpg";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var kotoribakobgbld = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "images/kotoribgbld.png";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var horrorbg = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "images/hora-3.jpg";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var taitorubg = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "images/taitoru.png";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var kotoribakobglst = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "images/kotoribglst.png";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}



//メッセージボックス
var messageBox = new function () {
  this.x = 0;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "images/box_horror_red.png";
    this.image.onload = loader;
  }

  this.render = function () {

    this.aspect = this.image.width / this.image.height;

    this.width = canvas.width;
    this.height = canvas.height / this.aspect;

    this.marginBottom = 20;
    this.y = canvas.height - this.height - this.marginBottom;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}



//テキストを表示
var myText = new function () {

  this.render = function () {
    var messageBoxInnerWidth = messageBox.width - 40;
    var messageBoxPaddingTop = 33;
    var messageBoxPaddingLeft = 10;

    var s = "";
    var sentenceArray = text.split("");

    var kaigyouHeight = 0;

    for (var i = 0; i < sentenceArray.length; i++) {
      s += sentenceArray[i];
      var textWidth = ctx.measureText(s).width;

      if(textWidth > messageBoxInnerWidth) {
        ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);

        kaigyouHeight += 20;
        s = "";
      }
    }

    ctx.fillStyle = "#fff";
    ctx.font = "20px serif";
    ctx.textAlign = "left";

    ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);
  }
}





//画像の読み込みを待ち合わせる
var Loader = function (expectedCnt, callback) {
  var cnt = 0;
  return function() {
    cnt++;
    if(cnt == expectedCnt) {
      callback();
    }
  }
}


// n 個の画像の読み込みが完了した後update関数を実行
var loader = Loader(6, function () {
  update();
});


//画像の読み込みを開始するための loadImage() メソッドを呼び出す
kotoribakobg.loadImage();
messageBox.loadImage();
taitorubg.loadImage();
kotoribakobglst.loadImage();
kotoribakobgbld.loadImage();
horrorbg.loadImage();


















