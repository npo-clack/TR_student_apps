//入力フォームとボタンの要素を取得
const day = document.getElementById('day')
const time=document.getElementById('time')
const giver=document.getElementById('giver')
const topping=document.getElementById('topping')
const button =document.getElementById('button')
const petlist = document.getElementById('petlist')

//localstrageにデータを追加する
const addPetRecord = () =>{
  if(!day.value || !time.value || !giver.value || !topping.value){
    alert('すべてのフィールドに入力してください');
    return;
  }else{
    const record={
      day: day.value,
      time: time.value,
      giver: giver.value,
      topping: topping.value
    };

    let localStorageNum = localStorage.length;
    //petRecords.push(record);
    localStorage.setItem(localStorageNum, JSON.stringify(record));

    //フォームをリセット
    day.value='';
    time.value='';
    giver.value='';
    topping.value='';

    displayPetRecords();
  }
};

//localstorageのデータを表示する
const displayPetRecords = () => {
  petlist.innerHTML = '';//既存のリストをクリア
  for (let i = 0; i<localStorage.length; i++ ){
    const record =JSON.parse(localStorage.getItem(i));
    if(record){
      const listItem = document.createElement('div');
      listItem.className="card";
      listItem.innerHTML=`
      日付${record.day}<br>
      時間${record.time}<br>
      あげた人${record.giver}<br>
      トッピング${record.topping}`;
      petlist.appendChild(listItem);
    }
  }
};

//登録を押すとデータを追加する
button.addEventListener("click",addPetRecord);