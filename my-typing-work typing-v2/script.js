// 遊戲變數設定
const targetWords = ["apple", "banana", "cherry", "design", "keyboard", "typing", "media", "learning", "python", "javascript"];
let currentWord = "";
let score = 0;
let highScore = localStorage.getItem("typing_highscore") || 0;
let timeLeft = 30;
let timer = null;
let isPlaying = false;

// DOM 元素
const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const highScoreDisplay = document.getElementById("highscore");
const startBtn = document.getElementById("start-btn");

// 音效載入
const beepSound = new Audio("assets/beep.wav");

if (highScoreDisplay) highScoreDisplay.textContent = highScore;

function getNextWord() {
    const randomIndex = Math.floor(Math.random() * targetWords.length);
    currentWord = targetWords[randomIndex];
    if (wordDisplay) wordDisplay.textContent = currentWord;
}

function startGame() {
    if (isPlaying) return;

    isPlaying = true;
    score = 0;
    timeLeft = 30;

    if (scoreDisplay) scoreDisplay.textContent = score;
    if (timeDisplay) timeDisplay.textContent = timeLeft;

    if (wordInput) {
        wordInput.disabled = false;
        wordInput.value = "";
        wordInput.focus();
    }

    if (startBtn) startBtn.disabled = true;

    getNextWord();

    timer = setInterval(() => {
        timeLeft--;
        if (timeDisplay) timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    isPlaying = false;

    if (wordInput) {
        wordInput.disabled = true;
        wordInput.value = "";
    }
    if (startBtn) startBtn.disabled = false;
    if (wordDisplay) wordDisplay.textContent = "遊戲結束！";

    // 刷新最高分紀錄
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("typing_highscore", highScore);
        if (highScoreDisplay) highScoreDisplay.textContent = highScore;
    }

    // 💡 步驟五：呼叫 modal.js 顯示結算視窗
    if (typeof showGameOverModal === "function") {
        showGameOverModal(score, highScore);
    }
}

if (wordInput) {
    wordInput.addEventListener("input", () => {
        if (!isPlaying) return;

        const typedValue = wordInput.value.trim().toLowerCase();

        if (typedValue === currentWord) {
            score += 10;
            if (scoreDisplay) scoreDisplay.textContent = score;
            wordInput.value = "";
            getNextWord();
        } else if (typedValue.length > 0 && !currentWord.startsWith(typedValue)) {
            beepSound.currentTime = 0;
            beepSound.play().catch(e => console.log("音效播放失敗：", e));
        }
    });
}

if (startBtn) {
    startBtn.addEventListener("click", startGame);
}