// bodyタグを取得
const documentBody = document.querySelector('body');
// body直下に右から左のカーテン
var newElement1 = document.createElement("div");
newElement1.setAttribute("class", "leftCurtainbg");
documentBody.prepend(newElement1);
// body直下に左から右のカーテン
var newElement2 = document.createElement("div");
newElement2.setAttribute("class", "rightCurtainbg");
documentBody.prepend(newElement2);


// bodyタグにclassを付与
documentBody.classList.add('pageOn');

// 1.5秒経ったらオーバーレイ非表示
setTimeout(function () {
  newElement1.style.display = "none";
  newElement2.style.display = "none";
}, 1500);

// ページ遷移時にフェードアウト
window.addEventListener("beforeunload", () => {
  documentBody.classList.add('fadeout');
  setTimeout(function () {
    documentBody.style.display = "none";
  }, 1000);
}, false);

//　行先
jpURL = new Array();
jpURL[0] = "https://www.google.com/maps/@35.7103233,139.8114471,3a,75y,236.35h,138.8t/data=!3m7!1e1!3m5!1sAF1QipO91zoIXpng-bj-upK8l_Tsvkb6EoGZwZSAJ9Ar!2e10!3e12!7i6720!8i3360?hl=ja/";
jpURL[1] = "https://www.google.com/maps/@35.0157592,135.7824964,3a,75y,178.98h,94.03t/data=!3m8!1e1!3m6!1sAF1QipPQx8UVKjPGKNTFiSEc3dz09EY7jifvRuflbNce!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPQx8UVKjPGKNTFiSEc3dz09EY7jifvRuflbNce%3Dw203-h100-k-no-pi0-ya214.82285-ro-0-fo100!7i11264!8i5632?hl=ja/";
jpURL[2] = "https://www.google.co.jp/maps/@1.2816736,103.8636312,2a,75y,305.75h,96.85t/data=!3m6!1e1!3m4!1szqMCFGUJCTaxgvYJOMYm1Q!2e0!7i13312!8i6656?hl=ja/";
jpURL[3] = "https://www.google.co.jp/maps/place/%E5%8D%97%E6%A5%B5%E5%A4%A7%E9%99%B8/@-64.156839,-60.8854138,3a,75y,198.35h,90.4t/data=!3m8!1e1!3m6!1sAF1QipOMGH55Q2fZR34dOp-oSmqOwsyyKn5GuKRqMTHR!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOMGH55Q2fZR34dOp-oSmqOwsyyKn5GuKRqMTHR%3Dw224-h298-k-no-pi-31.887518-ya117.988434-ro-6.20404-fo100!7i5376!8i2688!4m11!1m2!2m1!1z5Y2X5qW15aSn6Zm4!3m7!1s0xb09dff882a7809e1:0xb08d0a385dc8c7c7!8m2!3d-82.862752!4d135!14m1!1BCgIgARICCAI!15sCgzljZfmpbXlpKfpmbiSAQljb250aW5lbnTgAQA?hl=ja/";
jpURL[4] = "https://www.google.co.jp/maps/@35.6214435,139.7199808,3a,75y,296.96h,110.59t/data=!3m6!1e1!3m4!1sudPkrPfkaGhI2dKISeEgEw!2e0!7i16384!8i8192?hl=ja/";
jpURL[5] = "https://www.google.co.jp/maps/@55.6796633,12.5913739,3a,75y,272.25h,90.83t/data=!3m6!1e1!3m4!1sSTUCkmnbnE8hv2EAU-KVIQ!2e0!7i16384!8i8192?hl=ja/";
n = Math.floor(Math.random() * jpURL.length);
location.href = jpURL[n];

