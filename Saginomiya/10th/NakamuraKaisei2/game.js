
// もともとあった:
// let score = 0;

// を次に置き換える：
let score = 0;
try {
    const stored = localStorage.getItem('playerScore');
    if (stored !== null) {
        const n = parseInt(stored, 10);
        if (!Number.isNaN(n)) score = n;
    }
} catch (e) {
    console.warn('localStorage 読み取りエラー:', e);
}
// 表示更新
updateScore();