// Your Code Here.

let red = 1;
let yellow = 2;
let currentPlayer = red;
let gameState = "Active";

gameBoard = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function populateCells(board) {
  let boardDiv = document.querySelector(".board");
  let cellNumber = 0;
  for (let row in board) {
    for (let column in board[row]) {
      function createElement() {
        let cell = document.createElement("div");
        cell.id = row.toString() + "-" + column.toString();
        cell.classList.add("cell");
        cell.addEventListener("click", function () {
          createPiece(column);
        });
        boardDiv.append(cell);
      }
      createElement();
      cellNumber++;
    }
  }
}

function createPiece(inputCellColumn) {
  if (gameState != "Active") {
    alert("The Game is Over");
    return;
  } else {
    let cellColumn = inputCellColumn;

    let fallArray = findOpenCell(gameBoard, cellColumn);
    if (fallArray.indexOf(0) === -1) {
      alert("Choose a different column!");
    } else {
      let fallRow = fallArray.lastIndexOf(0);
      gameBoard[fallRow][cellColumn] = currentPlayer;
      let cell = document.getElementById(
        fallRow.toString() + "-" + cellColumn.toString()
      );
      if (currentPlayer === red) {
        cell.classList.add("redpiece");
        document.getElementById("winner").innerText = "Yellow Player's Turn";
        currentPlayer = yellow;
      } else {
        cell.classList.add("yellowpiece");
        document.getElementById("winner").innerText = "Red Player's Turn";
        currentPlayer = red;
      }
    }

    winnerColor();
  }
}

function findOpenCell(board, column) {
  let columnArray = [];
  for (let row = 0; row <= board.length - 1; row++) {
    columnArray.push(board[row][column]);
  }
  return columnArray;
}

//VICTORY CONDITIONS
function victoryHorizontalCheck(board) {
  for (let row in board) {
    for (let column = 0; column < board[0].length - 3; column++) {
      if (board[row][column] != 0) {
        if (
          board[row][column] === board[row][column + 1] &&
          board[row][column] === board[row][column + 2] &&
          board[row][column] === board[row][column + 3]
        ) {
          return board[row][column];
        }
      }
    }
  }
  return 0;
}

function victoryVerticalCheck(board) {
  for (let column = 0; column < gameBoard[0].length - 1; column++) {
    for (let row = 0; row < board.length - 3; row++) {
      if (board[row][column] != 0) {
        if (
          board[row][column] === board[row + 1][column] &&
          board[row][column] === board[row + 2][column] &&
          board[row][column] === board[row + 3][column]
        ) {
          return board[row][column];
        }
      }
    }
  }
  return 0;
}

function victoryDiagonalCheck(board) {
  for (let row = 0; row < board.length - 3; row++) {
    for (let column = 0; column < board[0].length - 3; column++) {
      if (board[row][column] != 0) {
        if (
          board[row][column] === board[row + 1][column + 1] &&
          board[row][column] === board[row + 2][column + 2] &&
          board[row][column] === board[row + 3][column + 3]
        ) {
          return board[row][column];
        }
      }
    }
  }

  for (let row = 3; row < board.length; row++) {
    for (let column = 0; column < board[0].length - 3; column++) {
      if (board[row][column] != 0) {
        if (
          board[row][column] === board[row - 1][column + 1] &&
          board[row][column] === board[row - 2][column + 2] &&
          board[row][column] === board[row - 3][column + 3]
        ) {
          return board[row][column];
        }
      }
    }
  }
  return 0;
}

function tieCheck(board) {
  if (
    board[0][0] != 0 &&
    board[0][1] != 0 &&
    board[0][2] != 0 &&
    board[0][3] != 0 &&
    board[0][4] != 0 &&
    board[0][5] != 0 &&
    board[0][6] != 0
  ) {
    return true;
  } else {
    return false;
  }
}

function victoryCheck(board) {
  let victor = 0;
  let checkTie = tieCheck(board);

  let victoryVert = victoryVerticalCheck(board);
  if (victoryVert != 0) {
    victor = victoryVert;
  } else {
    let victoryHori = victoryHorizontalCheck(board);
    if (victoryHori != 0) {
      victor = victoryHori;
    } else {
      let victoryDiag = victoryDiagonalCheck(board);
      if (victoryDiag != 0) {
        victor = victoryDiag;
      }
    }
  }

  if (victor === 0 && checkTie === true) {
    return "Tie";
  } else {
    if (victor === 1) {
      return "Red";
    } else if (victor === 2) {
      return "Yellow";
    }
  }
}

function winnerColor() {
  let winner = document.getElementById("winner");
  let winnerCheck = victoryCheck(gameBoard);
  if (winnerCheck === "Tie") {
    winner.innerText = "Tie!";
    gameState = "Over";
  } else if (winnerCheck === "Red") {
    winner.innerText = "Red Wins!";
    gameState = "Over";
  } else if (winnerCheck === "Yellow") {
    winner.innerText = "Yellow Wins!";
    gameState = "Over";
  }
}

populateCells(gameBoard);
