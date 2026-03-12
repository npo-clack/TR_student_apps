const tdA = document.getElementById('A');
const tdB = document.getElementById('B');
const tdC = document.getElementById('C');
const tdD = document.getElementById('D');
const tdE = document.getElementById('E');
const tdF = document.getElementById('F');
const tdG = document.getElementById('G');
const tdH = document.getElementById('H');
const tdI = document.getElementById('I');
const tdJ = document.getElementById('J');
const tdK = document.getElementById('K');
const tdL = document.getElementById('L');
const tdM = document.getElementById('M');
const tdN = document.getElementById('N');
const tdO = document.getElementById('O');
const tdP = document.getElementById('P');
const tdQ = document.getElementById('Q');
const tdR = document.getElementById('R');
const tdS = document.getElementById('S');
const tdT = document.getElementById('T');
const tdU = document.getElementById('U');
const tdV = document.getElementById('V');
const tdW = document.getElementById('W');
const tdX = document.getElementById('X');
const tdY = document.getElementById('Y');
const tdZ = document.getElementById('Z');
const tda = document.getElementById('a');
const tdb = document.getElementById('b');
const tdc = document.getElementById('c');
const tdd = document.getElementById('d');
const tde = document.getElementById('e');
const tdf = document.getElementById('f');
const tdg = document.getElementById('g');
const tdh = document.getElementById('h');
const tdi = document.getElementById('i');
const tdj = document.getElementById('j');
const tdk = document.getElementById('k');
const tdl = document.getElementById('l');
const tdm = document.getElementById('m');
const tdn = document.getElementById('n');
const tdo = document.getElementById('o');
const tdp = document.getElementById('p');
const tdq = document.getElementById('q');
const tdr = document.getElementById('r');
const tds = document.getElementById('s');
const checkButton = document.getElementById('checkButton');

function colorCell(cell){
  if (cell.style.backgroundColor === 'black'){
   cell.style.backgroundColor = '';
 }else {
   cell.style.backgroundColor = 'black';
 }

cell.addEventListener('click', function() {
  if (checkPlay()) {
    alert("おめでとう！ポッチャマになったかな？");
  } else {
    alert("ざんねん！がんばれ！");
  }
}
)};

checkButton.addEventListener('click', function(){
  if(tdA.style.backgroundColor === 'black' &&
     tdB.style.backgroundColor === 'black' &&
     tdC.style.backgroundColor === 'black' &&
     tdD.style.backgroundColor === 'black' &&
     tdE.style.backgroundColor === 'black' &&
     tdF.style.backgroundColor === 'black' &&
     tdG.style.backgroundColor === 'black' &&
     tdH.style.backgroundColor === 'black' &&
     tdI.style.backgroundColor === 'black' &&
     tdJ.style.backgroundColor === 'black' &&
     tdK.style.backgroundColor === 'black' &&
     tdL.style.backgroundColor === 'black' &&
     tdM.style.backgroundColor === 'black' &&
     tdN.style.backgroundColor === 'black' &&
     tdO.style.backgroundColor === 'black' &&
     tdP.style.backgroundColor === 'black' &&
     tdQ.style.backgroundColor === 'black' &&
     tdR.style.backgroundColor === 'black' &&
     tdS.style.backgroundColor === 'black' &&
     tdT.style.backgroundColor === 'black' &&
     tdU.style.backgroundColor === 'black' &&
     tdV.style.backgroundColor === 'black' &&
     tdW.style.backgroundColor === 'black' &&
     tdX.style.backgroundColor === 'black' &&
     tdY.style.backgroundColor === 'black' &&
     tdZ.style.backgroundColor === 'black' &&
     tda.style.backgroundColor === 'black' &&
     tdb.style.backgroundColor === 'black' &&
     tdc.style.backgroundColor === 'black' &&
     tdd.style.backgroundColor === 'black' &&
     tde.style.backgroundColor === 'black' &&
     tdf.style.backgroundColor === 'black' &&
     tdg.style.backgroundColor === 'black' &&
     tdh.style.backgroundColor === 'black' &&
     tdi.style.backgroundColor === 'black' &&
     tdj.style.backgroundColor === 'black' &&
     tdk.style.backgroundColor === 'black' &&
     tdl.style.backgroundColor === 'black' &&
     tdm.style.backgroundColor === 'black' &&
     tdn.style.backgroundColor === 'black' &&
     tdo.style.backgroundColor === 'black' &&
     tdp.style.backgroundColor === 'black' &&
     tdq.style.backgroundColor === 'black' &&
     tdr.style.backgroundColor === 'black' &&
     tds.style.backgroundColor === 'black'
    ){
     alert("おめでとう！ポッチャマになったかな？")
     } else {
     alert("ざんねん！がんばれ！")
    }
});