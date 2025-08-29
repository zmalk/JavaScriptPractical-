const board = document.querySelector(".board");
let currentPlayer = "X";
let cells = Array.from({ length: 9 });

const handleCellClick = (event) => {
  const cell = event.target.dataset.index;
  //   console.log(cell);
  //  check if cell is already filled
  if (cells[cell]) return;
  updateCell(cell, currentPlayer);
  const winner = checkWin();
  if (winner || !cells.includes(undefined)) {
    alert(winner ? `player ${winner} Wins! ` : "Draw!");
    restGame()
  }
};
const restGame = () =>{
window.location.reload();
}
const updateCell = (index, value) => {
  cells[index] = value;
  const cell = board.querySelector(`[data-index='${index}']`);
  cell.textContent = value;
  cell.classList.add(value === "X" ? "player-x" : "player-o");
  //   switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};
const checkWin = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
};

// create 9 cells
cells.forEach((_cell, index) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  board.appendChild(cell);
  cell.addEventListener("click", handleCellClick);
});

checkWin();
