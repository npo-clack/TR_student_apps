let alarmTime = null;
let alarmTimeout = null;

// 音声ファイルの準備
const alarmSound = new Audio('./audios/alarm_sounds');

// 音声を事前に許可（Safari向け）
document.addEventListener('click', () => {
    alarmSound.play().then(() => {
        alarmSound.pause();
        // alarmSound.currentTime = 0;
        console.log('Audio preloaded successfully');
    }).catch((error) => {
        console.log('Audio preload failed:', error);
    });
}, { once: true });

function setAlarm() {
    const input = document.getElementById('alarmTime');
    alarmTime = input.value;

    if (!alarmTime) {
        alert('Please select a valid time!');
        return;
    }

    const [hours, minutes] = alarmTime.split(':');
    const now = new Date();
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes, 0, 0);

    if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1); // 翌日に設定
    }

    const timeToAlarm = alarmDate.getTime() - now.getTime();

    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }

    alarmTimeout = setTimeout(() => {
        // Safari用の音声再生
        alarmSound.play().catch((error) => {
            console.error('Audio playback error:', error);
            alert('Failed to play sound. Please check your browser settings.');
        });
        alert('Wake up! It\'s time!');
        document.getElementById('status').textContent = '';
    }, timeToAlarm);

    document.getElementById('status').textContent = `Alarm set for ${alarmTime}.`;
    console.log(`Alarm set for ${alarmTime}`);
}
function twoDigit(num) {
    let ret;
    if( num < 10 ) 
      ret = "0" + num; 
    else 
         ret = num; 
    return ret;
 }
function showClock() {
    let nowTime = new Date();
    let nowHour = nowTime.getHours();
    let nowMin = nowTime.getMinutes();
    let nowSec = nowTime.getSeconds();
    let msg = "現在時刻:" + nowHour +":" + nowMin +":"+ nowSec;
    document.getElementById("realtime").innerHTML = msg;
}
setInterval('showClock()',1000);
