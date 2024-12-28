document.getElementById('seatForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    generateSeatChart(rows, cols);
});

function generateSeatChart(rows, cols) {
    const totalSeats = rows * cols;
    const seatNumbers = Array.from({ length: totalSeats }, (_, i) => i + 1);

    // 座席番号をランダムにシャッフル
    for (let i = totalSeats - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [seatNumbers[i], seatNumbers[j]] = [seatNumbers[j], seatNumbers[i]];
    }

    // 座席表を生成
    const seatChart = document.getElementById('seatChart');
    seatChart.innerHTML = '';
    seatChart.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    seatChart.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    seatNumbers.forEach(number => {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = number;
        seatChart.appendChild(seat);
    });
}