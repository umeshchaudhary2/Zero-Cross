const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameBtn = document.getElementById("newGameBtn");

const playerIcons = {
  X: "❌",
  O: "⭕"
};

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  resultScreen.style.display = "none";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("last-move");
  });

  e.target.innerHTML = `<span class="${currentPlayer === 'O' ? 'blue' : 'red'}">${playerIcons[currentPlayer]}</span>`;
  e.target.classList.add("last-move");

  const winCombo = checkWin();
  if (winCombo) {
    winCombo.forEach(i => {
      document.querySelector(`.cell[data-index='${i}']`).classList.add("win");
    });
    showResultScreen(`🎉 Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    showResultScreen("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return condition;
    }
  }
  return null;
}

function showResultScreen(message) {
  resultMessage.textContent = message;
  resultScreen.style.display = "flex";
}

resetBtn.addEventListener("click", createBoard);
newGameBtn.addEventListener("click", createBoard);

createBoard();
