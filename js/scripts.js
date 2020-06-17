import {
  getGameField,
  makeGameFieldEditable,
  getGameFieldHTML,
  generate2DetentionsArray,
  getRandomBoolean,
} from "./gameUtils.js";

const reset = (gameField) => gameField.map((row) => row.map((cell) => false));

const renderGame = (gameField) => {
  const gameRootElement = document.getElementById("lifeWorld");
  gameRootElement.innerHTML = getGameFieldHTML(gameField);
  gameRootElement.addEventListener("click", makeGameFieldEditable(gameField));
};

const init = () => {
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const randomButton = document.getElementById("random");

  const toggleGame = (gameField, speed) => {
    let gameTimer = 0;

    return () => {
      if (gameTimer) {
        clearTimeout(gameTimer);
        gameTimer = 0;
        startButton.innerText = "Start";
      } else {
        gameTimer = setInterval(nextGeneration, speed);
        startButton.innerText = "Stop";
      }
    };
  };

  const initControls = (gameField) => {
    startButton.onclick = toggleGame(gameField, 500);
    resetButton.onclick = resetGame;
    randomButton.onclick = randomGame;
  };

  const getNextGeneration = (gameField) =>
    generate2DetentionsArray(gameField.length, gameField[0].length, (i, j) =>
      liveForecast(i, j, gameField)
    );

  const liveForecast = (row, col, gameField) => {
    let neighbors = countNeighbors(row, col, gameField);

    return gameField[row][col]
      ? neighbors === 3 || neighbors === 2
      : neighbors === 3;
  };

  const countNeighbors = (row, col, gameField) =>
    (gameField[row - 1]?.[col - 1] ? 1 : 0) +
    (gameField[row - 1]?.[col] ? 1 : 0) +
    (gameField[row - 1]?.[col + 1] ? 1 : 0) +
    (gameField[row][col - 1] ? 1 : 0) +
    (gameField[row][col + 1] ? 1 : 0) +
    (gameField[row + 1]?.[col - 1] ? 1 : 0) +
    (gameField[row + 1]?.[col] ? 1 : 0) +
    (gameField[row + 1]?.[col + 1] ? 1 : 0);

  const resetGame = () => {
    console.log("TODO: implement!");
  };

  const nextGeneration = () => {
    gameField = getNextGeneration(gameField);

    renderGame(gameField);
  };

  const randomGame = () => {
    gameField = generate2DetentionsArray(gameField.length, gameField[0].length, getRandomBoolean);

    renderGame(gameField);
  };

  let gameField = getGameField(10, 10);
  renderGame(gameField);
  initControls(gameField);
};

init();
