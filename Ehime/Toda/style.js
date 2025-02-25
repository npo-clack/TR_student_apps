const suits = ['♠', '♥', '♦', '♣'];
const values = [
    { value: "3", power: 0 },
    { value: "4", power: 1 },
    { value: "5", power: 2 },
    { value: "6", power: 3 },
    { value: "7", power: 4 },
    { value: "8", power: 5 },
    { value: "9", power: 6 },
    { value: "10", power: 7 },
    { value: "J", power: 8 },
    { value: "Q", power: 9 },
    { value: "K", power: 10 },
    { value: "A", power: 11 },
    { value: "2", power: 12 },
];
let deck = [];
let players = [{ name: 'プレイヤー1', hand: [] }, { name: 'プレイヤー2', hand: [] }, { name: 'プレイヤー3', hand: [] }, { name: 'プレイヤー4', hand: [] }];
let currentPlayerIndex = 0;
let gameOver = false;
let playedcards = [];
let countpass = 0;



// トランプデッキを生成
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value: value.value, suit: suit, power: value.power });
        }
    }
    deck.push({ value: "Joker", suit: "", power: 13 });
    shuffleDeck();
}

// デッキをシャッフル
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// プレイヤーにカードを配る
function dealCards() {
    for (let i = 0; i < 13; i++) {
        for (let player of players) {
            player.hand.push(deck.pop());
        }
    }
}

// ランクの順番を定義
const rankOrder = {
    '2': 12, '3': 0, '4': 1, '5': 2, '6': 3, '7': 4, '8': 5, '9': 6, '10': 7,
    'J': 8, 'Q': 9, 'K': 10, 'A': 11
};

// ソート関数
function sortHand() {
    for (let player of players) {
        player.hand = player.hand.sort((a, b) => {
            const rankA = a.value; // ランクを取り出す
            const rankB = b.value;
            const suitA = a.suit;   // スートを取り出す
            const suitB = b.suit;

            if (a.value === "Joker") return 1;
            if (b.value === "Joker") return -1;

            // ランクで比較
            if (rankOrder[rankA] !== rankOrder[rankB]) {
                return rankOrder[rankA] - rankOrder[rankB];
            }

            // ランクが同じなら、スートで比較（スートの順番は♠ > ♣ > ♦ > ♥）
            const suitOrder = { '♠': 0, '♣': 1, '♦': 2, '♥': 3 };
            return suitOrder[suitA] - suitOrder[suitB];
        });
    }
}


// 手札を表示する関数
function displayCards() {
    const player = players[currentPlayerIndex];
    const handDiv = document.getElementById('playerCards');
    handDiv.innerHTML = '';

    player.hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // ハートとダイヤに色をつける
        if (card.suit === '♥') {
            cardElement.classList.add('heart');
        } else if (card.suit === '♦') {
            cardElement.classList.add('diamond');
        }

        cardElement.textContent = `${card.value}${card.suit}`;
        cardElement.addEventListener('click', () => playCard(card));
        handDiv.appendChild(cardElement);
    });
}

// 出されたカードを表示する関数
function displayPlayedCard(card) {
    const playedDiv = document.getElementById('playedCards');
    const playedCardElement = document.createElement('div');
    playedCardElement.classList.add('card');
    if (card.suit === '♥') {
        playedCardElement.classList.add('heart');
    } else if (card.suit === '♦') {
        playedCardElement.classList.add('diamond');
    }
    playedCardElement.textContent = `${card.value}${card.suit}`;
    playedDiv.appendChild(playedCardElement);
}

function toNormalMode() {
    console.log("tonormalMode")
    for (let player of players) {
        player.hand.forEach(card => {
            if (card.power != 13 && card.power <= 0) {
                card.power = card.power * -1
            }
        });
    }
    if (playedcards.length > 0 && playedcards[playedcards.length - 1] <= 0 ) {
        playedcards[playedcards.length - 1] *= -1;
    }
}

    function toReverseMode() {
        console.log("toReverseMode")
        for (let player of players) {
            player.hand.forEach(card => {
                if (card.power != 13) {
                    card.power = card.power * -1
                }
            });
        }
        if (playedcards.length > 0) {
            playedcards[playedcards.length - 1] *= -1;
        }
    }

    // カードを出す処理（簡略化）
    function playCard(card) {
        console.log("playCard:", card);
        const player = players[currentPlayerIndex];
        const cardIndex = player.hand.indexOf(card);
        //手札にないカードを出していないかチェック
        if (cardIndex !== -1) {
            console.log("cardIndex:", cardIndex);
            if (card.suit === "♠" && card.value === "3" && playedcards[playedcards.length - 1] === 13) {
                playedcards.push(card.power);
                player.hand.splice(cardIndex, 1);
                displayPlayedCard(card); // 出されたカードを表示
                window.alert("スペ３返しがプレイされました！場をリセットします。");
                displayCards();
                resetPlayedCard();
                updateGameInfo();
                checkGameOver();
            }
            
            //8切り
            else if (card.value === "8" && (card.power > playedcards[playedcards.length - 1] || playedcards.length === 0 )) {
                playedcards.push(card.power);
                player.hand.splice(cardIndex, 1);
                displayPlayedCard(card); // 出されたカードを表示
                window.alert("８切りがプレイされました！場をリセットします。");
                displayCards();
                resetPlayedCard();
                updateGameInfo();
                checkGameOver();
            }
            //11を出したら逆転モードになる
            else if (card.value === "J" && card.power > playedcards[playedcards.length - 1]) {
                playedcards.push(card.power);
                player.hand.splice(cardIndex, 1);
                console.log(`${player.name}がカード ${card.value}${card.suit} を出しました`);
                console.log("playedcards", playedcards);
                console.log("card", card);
                console.log("playedCards[playedCards.length - 1]", playedCards[playedCards.length - 1]);
                countpass = 0;
                displayPlayedCard(card);
                window.alert("Jバックがプレイされました!強さが逆転されます。");
                displayCards();
                updateGameInfo();
                checkGameOver();
                nextTurn();
                toReverseMode();
            }
            else if (playedcards.length === 0 || card.value === "Joker" || card.power > playedcards[playedcards.length - 1]) {
                playedcards.push(card.power);
                player.hand.splice(cardIndex, 1);
                console.log(`${player.name}がカード ${card.value}${card.suit} を出しました`);
                console.log("playedcards", playedcards);
                countpass = 0;
                displayPlayedCard(card);
                displayCards();
                updateGameInfo();
                checkGameOver();
                nextTurn();
            }
        }
    }

    function clickNextTurnBtn() {
        countpass += 1;
        nextTurn();
    }

    // プレイヤーのターンを進める
    function nextTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        if (!gameOver) {
            console.log(countpass);
            if (countpass === 3) { resetPlayedCard(); }
            displayCards();
            updateGameInfo();
        }
    }

    // 場をリセットする
    function resetPlayedCard() {
        playedcards = [];
        console.log(playedcards);
        console.log("resetplayedcard");
        countpass = 0;
        const playedDiv = document.getElementById("playedCards");
        while (playedDiv.firstChild) {
            playedDiv.removeChild(playedDiv.firstChild);
        }
        toNormalMode();
    }

    // ゲームが終了したかチェック
    function checkGameOver() {
        for (let player of players) {
            if (player.hand.length === 0) {
                gameOver = true;
                document.getElementById('gameInfo').innerHTML = `${player.name}が勝ちました！`;
                break;
            }
        }
    }

    // ゲームの情報を更新
    function updateGameInfo() {
        const player = players[currentPlayerIndex];
        document.getElementById('gameInfo').textContent = `${player.name}の番です。手札: ${player.hand.length}枚`;
    }

    // 初期化
    function initGame() {
        createDeck();
        dealCards();
        sortHand();
        displayCards();
        updateGameInfo();
        document.getElementById('nextTurnBtn').addEventListener('click', clickNextTurnBtn);
    }

    initGame();