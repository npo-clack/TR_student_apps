document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const reservationList = document.getElementById("reservationList");
  const timePicker =document.getElementById("timePicker");
  const timeInput = document.getElementById("timeInput");
  const selectedTime = document.getElementById("selectedTime");

  // Flatpickrを初期化
  flatpickr("#dateInput", {
   enableTime: true, // 時間の選択を有効
    noCalendar: false, // カレンダーを表示
    dateFormat: "Y-m-d H:i ", // 日付のフォーマット
    minDate: "today", // 今日以降の日付のみ選択可能
    disableMobile: true, // モバイルでのカレンダー表示を無効化
    locale: {
      weekdays: {
        shorthand: ['日', '月', '火', '水', '木', '金', '土'],
        longhand: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      },
      months: {
        shorthand: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        longhand: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
    },
    onChange: function (selectedDates, dateStr, instance) {
      // 選択された日付が変更されたときの処理
      console.log(dateStr);
    }
  });

  // Flatpickrの初期化の後に
  let currentHour = 13;
  let currentMinute = 0;

  // タップで時間選択UIを表示
  function showTimePicker() {
    timePicker.innerHTML = ""; // リセット

  for (let hours = 13; hours < 23; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const timeButton = document.createElement("button");
      timeButton.classList.add("time-button");
      timeButton.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      timeButton.addEventListener("click", function () {
      
      currentHour = hours;
      currentMinute = minutes;
      selectedTime.textContent = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
      hideTimePicker();
      });

      timePicker.appendChild(timeButton);
      }
    }

    timePicker.classList.remove("hidden");
  }

  // 時間選択UIを非表示
  function hideTimePicker() {
    timePicker.classList.add("hidden");
  }

  // タイムピッカーの外側をクリックしたら非表示
  document.addEventListener("click", function (event) {
    if (!timePicker.contains(event.target) && event.target !== timeInput) {
      hideTimePicker();
    }
  });

  // #timeInput をクリックしたときに時間選択UIを表示
  timeInput.addEventListener("click", function (event) {
    event.stopPropagation(); // クリックイベントが親要素に伝播しないように 
    showTimePicker();
  });

  // 初期表示の適当な時間を設定
  selectedTime.textContent = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
});
    // 入力された値を取得 
    form.addEventListener("submit", function (event) {
    event.preventDefault();

    const lastName = document.getElementById("last-name").value;
    const firstName = document.getElementById("first-name").value;
    const guests = document.querySelector("select[name='item']").value;
    const dateInput = document.getElementById("dateInput");
    const date = dateInput.value; // 日付を取得
    const time = selectedTime.textContent;

    // 予約情報を表示するためのリストアイテムを作成
    const reservationItem = document.createElement("li");
    reservationItem.textContent = `${lastName}${firstName} 様, 人数: ${guests}, 予約日: ${date}, 予約時間:${time}`;

    // リストに追加
    reservationList.appendChild(reservationItem);

    // フォームのリセット
    form.reset();

    // 入力情報をローカルストレージに保存
    saveReservationToLocalStorage({
      lastName,
      firstName,
      guests,
      date,
      time,
      });
    });
  

  // ローカルストレージから予約情報を取得して表示
  loadReservationsFromLocalStorage();

  // ローカルストレージに予約情報を保存する関数
  function saveReservationToLocalStorage(reservation) {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }

  // ローカルストレージから予約情報を取得して表示する関数
  function loadReservationsFromLocalStorage() {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.forEach((reservation) => {
      const reservationItem = document.createElement("li");
      reservationItem.textContent = `${reservation.lastName}${reservation.firstName} 様, 人数: ${reservation.guests}, 予約日: ${reservation.date}, 予約時間: ${reservation.time}`;
      reservationList.appendChild(reservationItem);
    });
  }