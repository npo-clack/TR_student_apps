document.addEventListener('DOMContentLoaded', function() {
  const reservationForm = document.querySelector('#reservationForm form');
  const reservationList = document.getElementById('reservationList');

  reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const guestsSelect = document.querySelector('select[name="item"]');
    const dateInput = document.getElementById('date');

    const name = nameInput.value;
    const guests = guestsSelect.value;
    const date = dateInput.value;

    if (name && guests && date) {
      addReservation(name, guests, date);
      reservationForm.reset();
    }
  });

  function addReservation(name, guests, date) {
    const reservationItem = document.createElement('li');
    reservationItem.innerHTML = `<strong>${name}</strong> - ${guests}人, ${formatDate(date)}`;
    reservationList.appendChild(reservationItem);
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  }
});






