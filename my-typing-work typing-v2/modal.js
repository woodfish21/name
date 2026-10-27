// 取得 Modal 相關元素
const modal = document.getElementById("game-over-modal");
const modalFinalScore = document.getElementById("modal-final-score");
const modalHighScore = document.getElementById("modal-highscore");
const restartBtn = document.getElementById("restart-btn");

// 顯示結算彈窗
function showGameOverModal(score, highScore) {
    if (modalFinalScore) modalFinalScore.textContent = score;
    if (modalHighScore) modalHighScore.textContent = highScore;
    if (modal) modal.style.display = "flex";
}

// 關閉結算彈窗
function hideGameOverModal() {
    if (modal) modal.style.display = "none";
}

// 點擊「再玩一次」按鈕關閉彈窗並重新開始
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        hideGameOverModal();
        if (typeof startGame === "function") {
            startGame();
        }
    });
}