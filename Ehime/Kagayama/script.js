$(".slide-items").slick(
    {
         autoplay: true, // 自動スクロールを有効にする
        autoplaySpeed: 2000, // 2000ms = 2秒おきにスクロール
        speed: 1000, // スクロールの速さ
        arrows: false, // スクロールボタンの表示・非表示
        dots: true, // ドットの表示
        
          
        pauseOnFocus: false,//フォーカスが合っても止めない
    }
);