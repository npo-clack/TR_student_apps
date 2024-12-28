document.addEventListener("DOMContentLoaded", () => {
    const symbols = ["レクサスを",  "食堂を", "ビルを"];
    const symbols2 = ["見て","のぼって","通り過ぎて"];
    const symbols3 = ["口笛を　吹く","黄昏る","街並み　をみる"];
    const reels = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3"),
    ];

    const spinButton = document.getElementById("spinButton");

    function populateReel(reel) {
        // Add symbols to the reel
        reel.innerHTML = "";
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbols[i % symbols.length];
            let div = document.createElement("div");
            div.textContent = symbol;
            reel.appendChild(div);
        }
    }

    function populateReel2(reel2) {
        // Add symbols to the reel
        reel2.innerHTML = "";
        for (let i = 0; i < symbols2.length; i++) {
            let symbol = symbols2[i % symbols2.length];
            let div = document.createElement("div");
            div.textContent = symbol;
            reel2.appendChild(div);
        }
    }
    
    function populateReel3(reel3) {
        // Add symbols to the reel
        reel3.innerHTML = "";
        for (let i = 0; i < symbols3.length; i++) {
            let symbol = symbols3[i % symbols3.length];
            let div = document.createElement("div");
            div.textContent = symbol;
            reel3.appendChild(div);
        }
    }
    

    

    function spinReel(reel, duration) {
        return new Promise((resolve) => {
            const symbolsCount = symbols.length;
            let position = 0;

            const spinInterval = 100; // アニメーション速度

            const spin = setInterval(() => {
                position = (position + 1) % symbolsCount;

                // Apply transformations for 3D effect
                const children = reel.children;
                for (let i = 0; i < children.length; i++) {
                    const div = children[i];
                    const offset = (i - position + symbolsCount) % symbolsCount;

                    if (offset === 0) {
                        div.style.transform = `translateY(50px) translateZ(0px) scale(1)`;
                        div.style.opacity = 1;
                    } else if (offset === 1) {
                        div.style.transform = `translateY(0px) translateZ(-50px) scale(0.8)`;
                        div.style.opacity = 0.5;
                    } else if (offset === 2) {
                        div.style.transform = `translateY(100px) translateZ(-50px) scale(0.8)`;
                        div.style.opacity = 0.5;
                    } else if (offset > 2) {
                        div.style.transform = `translateY(100px) translateZ(-50px) scale(0.8)`;
                        div.style.opacity = 0;
                    }
                }
            }, spinInterval);

            setTimeout(() => {
                clearInterval(spin);

                // Stop at a random symbol
                const randomStop = Math.floor(Math.random() * symbolsCount);
                position = randomStop;

                // Set final positions
                const children = reel.children;
                for (let i = 0; i < children.length; i++) {
                    const div = children[i];
                    const offset = (i - position + symbolsCount) % symbolsCount;

                    if (offset === 0) {
                        div.style.transform = `translateY(50px) translateZ(0px) scale(1)`;
                        div.style.opacity = 1;
                    } else if (offset === 1) {
                        div.style.transform = `translateY(0px) translateZ(-50px) scale(0.8)`;
                        div.style.opacity = 0.5;
                    } else if (offset === 2) {
                        div.style.transform = `translateY(100px) translateZ(-50px) scale(0.8)`;
                        div.style.opacity = 0.5;
                    } else if (offset > 2) {
                        div.style.transform = `translateY(100px) translateZ(-50px) scale(0.8)`;
                        div.style.opacity = 0;
                    }
                }

                resolve(symbols[randomStop]);
            }, duration);
        });
    }

    async function spinSlots() {
        spinButton.disabled = true;

        const results = await Promise.all([
            spinReel(reels[0], 2000),
            spinReel(reels[1], 2500),
            spinReel(reels[2], 3000),
        ]);

        // alert(`結果: ${results.join(" - ")}`);
        spinButton.disabled = false;
    }

    // reels.forEach((reel) => populateReel(reel));
    populateReel(reels[0]);
    populateReel2(reels[1]);
    populateReel3(reels[2]);

    spinButton.addEventListener("click", spinSlots);
});