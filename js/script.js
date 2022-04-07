function Game() {
  let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const spotEmpty = (pX, pY) => {
    return grid[pY][pX] == "";
  };

  const add = (mark, positionX, positionY) => {
    if (spotEmpty(positionX, positionY)) {
      grid[positionY][positionX] = mark;
      return true;
    }
    return false;
  };
  const clearBoard = () => {
    grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };
  const checkWinner = () => {
    //horizontal check
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][0] != "" && grid[y][1] != "" && grid[y][2] != "") {
        if (grid[y][0] == grid[y][1] && grid[y][0] == grid[y][2]) {
          return true;
        }
      }
    }

    //vertical check
    for (let x = 0; x < grid.length; x++) {
      if (grid[0][x] != "" && grid[1][x] != "" && grid[2][x] != "") {
        if (grid[0][x] == grid[1][x] && grid[0][x] == grid[2][x]) {
          return true;
        }
      }
    }

    //diagonal check

    if (grid[0][0] != "" && grid[1][1] != "" && grid[2][2] != "") {
      if (grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2]) {
        return true;
      }
    }

    //secondary diagonal check

    if (grid[0][2] != "" && grid[1][1] != "" && grid[2][0] != "") {
      if (grid[0][2] == grid[1][1] && grid[0][2] == grid[2][0]) {
        return true;
      }
    }
  };

  return { grid, add, clearBoard, checkWinner };
}

const Player = (n, m) => {
  const name = n;
  const mark = m;
  let turn;

  const getName = () => {
    return name;
  };

  const getMark = () => {
    return mark;
  };

  const setTurn = (bool) => {
    turn = bool;
  };

  const getTurn = () => {
    return turn;
  };
  return {
    getName,
    getMark,
    setTurn,
    getTurn,
  };
};

const gameboard = () => {
  const blocks = document.querySelectorAll(".block");
  const player1 = Player("Abdou", "x");
  const player2 = Player("Yacine", "o");
  const newGame = Game();

  player1.setTurn(true);

  let positionX, positionY;
  blocks.forEach((block, index) => {
    block.addEventListener("click", (event) => {
      let markPlayer1 = document.createElement("h2");
      let markPlayer2 = document.createElement("h2");
      markPlayer1.textContent = player1.getMark();
      markPlayer2.textContent = player2.getMark();

      if (player1.getTurn()) {
        positionY = Math.floor(index / 3);
        positionX = Math.round(index % 3);

        let added = newGame.add(player1.getMark(), positionX, positionY);
        if (added) {
          block.appendChild(markPlayer1);
          if (newGame.checkWinner()) {
            newGame.clearBoard();
            removeAllChildNodes(blocks);
            console.log("winner player 1");
          }
          player1.setTurn(false);
          player2.setTurn(true);

          return;
        }
      }

      if (player2.getTurn()) {
        positionY = Math.floor(index / 3);
        positionX = Math.round(index % 3);

        let added = newGame.add(player2.getMark(), positionX, positionY);
        if (added) {
          block.appendChild(markPlayer2);
          if (newGame.checkWinner()) {
            newGame.clearBoard();
            removeAllChildNodes(blocks);
            console.log("winner player 2");
          }
          player1.setTurn(true);
          player2.setTurn(false);

          return;
        }
      }
    });
  });
  function removeAllChildNodes(parent) {
    parent.forEach((p) => {
      while (p.firstChild) {
        p.removeChild(p.firstChild);
      }
    });
  }
};

const newGame = gameboard;
newGame();
