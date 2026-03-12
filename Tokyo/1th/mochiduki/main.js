function showDialog(imageName){
    const elm = document.getElementById("myDialog");
    elm.classList.remove("hide");
    elm.classList.add("show");

    const imageElm =document.getElementById("imgName");

    imageElm.setAttribute("src",imageName)
    //alert(imageElm.getAttribute("src"));
}

function closeDialog(){
    const elm = document.getElementById("myDialog");
    elm.classList.remove("show");
    elm.classList.add("hide");
}

//ボタンクリックでスクロール
//1
window.addEventListener('load', (event) => {

    document.getElementById('button1').addEventListener('click', () => {

// content1の表示位置を取得
        var content = document.getElementById('content1');
        var content_position = content.getBoundingClientRect();

// content1へ移動
        window.scrollTo( 0, content_position.top);

    });

//2
    document.getElementById('button2').addEventListener('click', () => {

// content2の表示位置を取得
        var content = document.getElementById('content2');
        var content_position = content.getBoundingClientRect();

// content2へ移動
        window.scrollTo( 0, content_position.top);

    });

//3
document.getElementById('button3').addEventListener('click', () => {

    // content3の表示位置を取得
            var content = document.getElementById('content3');
            var content_position = content.getBoundingClientRect();
    
    // content3へ移動
            window.scrollTo( 0, content_position.top);
    
        });

//4
    document.getElementById('button4').addEventListener('click', () => {

        // content2の表示位置を取得
                var content = document.getElementById('content4');
                var content_position = content.getBoundingClientRect();
        
        // content2へ移動
                window.scrollTo( 0, content_position.top);
        
            });
        });



//ページトップ
const scroll_to_top_btn = document.querySelector('#scroll-to-top-btn');

//クリックイベントを追加
scroll_to_top_btn.addEventListener('click', scroll_to_top);

function scroll_to_top(){
	window.scroll({top: 0, behavior: 'smooth'});
};

//スクロール時のイベントを追加
window.addEventListener( 'scroll' , scroll_event );

function scroll_event(){
	
	if(window.pageYOffset > 400){
		scroll_to_top_btn.style.opacity = '1';
	}else	if(window.pageYOffset < 400){
		scroll_to_top_btn.style.opacity = '0';
	}
	
};