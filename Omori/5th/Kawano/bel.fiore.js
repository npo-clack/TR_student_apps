particlesJS("particles-js", {
  "particlea":{
    "number":{
      "value":346,//この数値を変更すると星の数が増減できる
      "density":{
        "enable":true,
        "value_area":800
      }
    },
    "color":{
      "value":"#ffffff"
    },
    "shape":{
      "type":"circle",//形状はcircleを指定
      "stroke":{
        "width":0
      },
      },
      "opacity":{
        "value":1,//シェイプの透明度
        "random":true,//シェイプの透明度をランダムにする
        "anim":{
          "enable":true,//シェイプの透明度をアニメーションさせる
          "speed":3,//シェイプの透明度をアニメーションさせる
          "opacity_min":0,//透明度最小値０
          "sync":false//全てを同時にアニメーションさせない
        }
      },
      "size":{
        "value":2,
        "random":true,
        "anim":{
          "enable":false,
          "speed":4,
          "size_min":0.3,
          "sync":false
        }
      },
      "line_linked":{
        "enable":false,
      },
      "move":{
        "enable":true,
        "speed":120,//この数値を小さくするとゆっくりな動きになる
      "direction":"none",//方向指定なし
      "random":true,//動きはランダムに
      "straight":true,//動きをとどめる
        "out_mode":"out",
        "bounce":false,
        "attract":{
          "enable":false,
          "rotateX":600,
          "rotateY":600
        }
      }
    },
    "interactivity":{
      "detect_on":"canvas",
      "events":{
        "onhover":{
          "enable":false,
        },
        "onclick":{
          "enable":false,
        },
        "resize":true
      }
    },
    "retina_detect":true
  });
// glowAnimeにglowというクラス名を付ける定義
function GlowAnimeControl() {
  $('.glowAnime').each(function () 
  {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("glow");

    } else {
      $(this).removeClass("glow");
    }
  });
}
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  GlowAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述//

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime(){

  // ふわっ
  $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    }else{
    $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
    }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function (){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function(){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述