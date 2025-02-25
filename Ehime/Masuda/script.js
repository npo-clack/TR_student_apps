// alert("Hello World");alert("Hello World");
function Omikuji() {
	// ここに処理を書いていく
    let fortune = ["大吉", "中吉","小吉","極小吉","吉", "凶","大凶"];
    let random = Math.floor(Math.random() * fortune.length);
document.getElementById("result").innerHTML = fortune[random];
}

