function Omikuji(){
    let fortune = ["ぱー","ちょき","ぐー"];
    let random = Math.floor(Math.random() * fortune.length);
    
    document.getElementById("result").innerHTML = fortune[random];

}