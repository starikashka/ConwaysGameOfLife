import {
  getGameField,
  makeGameFieldEditable,
  getGameFieldHTML,
} from "./gameUtils.js";

const init = () => {
  function initControl() {
    let start = document.getElementById("start");
    start.onclick = startLife;

    let reset = document.getElementById("reset");
    reset.onclick = resetLife;

    let random = document.getElementById("random");
    random.onclick = randomLife;
  }
  function startLife() {
    // console.log(this)
    if (runLife) {
      runLife = false;
      clearTimeout(timer);
      this.innerText = "Start";
    } else {
      runLife = true;
      run();
      this.innerText = "Stop";
    }
  }
  function run() {
    nextGeneration();
    timer = setTimeout(run, speed);
    // timer = setTimeout(startLife, speed);
  }
  function nextGeneration() {
    population = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        liveForecast(i, j);
      }
    }
    // gameField = [...nextArrayField];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gameField[i][j] = nextArrayField[i][j];
        nextArrayField[i][j] = false;
      }
    }
    drawField(gameField, rows, cols);

    generation++;
    generationText.innerText = "Generation: " + generation;

    populationText.innerText = "Population: " + population;
  }
  function liveForecast(row, col) {
    let neighbors = countNeighbors(row, col);
    // console.log("----------------")
    // console.log(`${row}, ${col} - ${neighbors}`);

    if (gameField[row][col]) {
      if (neighbors < 2 || neighbors > 3) {
        nextArrayField[row][col] = false;
        // console.log(`${row}, ${col} - ${neighbors} false 1`);
        // } else if(neighbors > 3){
        //     nextArrayField[row][col] = false;
        //     // console.log(`${row}, ${col} - ${neighbors} false 2`);
      } else {
        nextArrayField[row][col] = true;
        // console.log(`${row}, ${col} - ${neighbors} true 3`);
      }
    } else if (neighbors === 3) {
      nextArrayField[row][col] = true;
      // console.log(`${row}, ${col} - ${neighbors} true 4`);
    } else {
      nextArrayField[row][col] = false;
      // console.log(`${row}, ${col} - ${neighbors} false 5`);
    }
    if (nextArrayField[row][col]) {
      population++;
    }
  }
  function countNeighbors(row, col) {
    let count = 0;

    if (row - 1 > -1 && col - 1 > -1 && gameField[row - 1][col - 1]) count++;
    if (row - 1 > -1 && gameField[row - 1][col]) count++;
    if (row - 1 > -1 && col + 1 < cols && gameField[row - 1][col + 1]) count++;

    if (col - 1 > -1 && gameField[row][col - 1]) count++;
    if (col + 1 < cols && gameField[row][col + 1]) count++;

    if (row + 1 < rows && col - 1 > -1 && gameField[row + 1][col - 1]) count++;
    if (row + 1 < rows && gameField[row + 1][col]) count++;
    if (row + 1 < rows && col + 1 < cols && gameField[row + 1][col + 1])
      count++;

    return count++;
  }

  function reset() {
    let startBtn = document.getElementById("start");
    runLife = false;
    clearTimeout(timer);
    startBtn.innerText = "Start";
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        gameField[i][j] = false;
      }
    }
    generation = 0;
    generationText.innerText = "Generation: " + generation;
    population = 0;
    populationText.innerText = "Population: " + population;
  }
  function drawField() {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        let cell = document.getElementById(`${i}-${j}`);
        if (gameField[i][j]) {
          cell.className = "live";
          cell.innerText = "t";
        } else {
          cell.className = "void";
          cell.innerText = "f";
        }
      }
    }
  }
  function random() {
    population = 0;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (Math.random() > 0.5) {
          gameField[i][j] = true;
          population++;
        } else {
          gameField[i][j] = false;
        }
      }
    }
    populationText.innerText = "Population: " + population;
    generation = 0;
    generationText.innerText = "Generation: " + generation;
    // console.log(gameField);
  }
  function resetLife() {
    reset();
    drawField();
  }
  function randomLife() {
    random();
    drawField();
  }

  let rows = 50;
  let cols = 50;

  let nextArrayField = new Array(rows);

  let population = 0;
  let generation = 0;
  let runLife = false;
  let timer;

  const speed = 500;
  let gameField = getGameField(rows, cols);
  const gameRootElement = document.getElementById("lifeWorld");
  gameRootElement.innerHTML = getGameFieldHTML(gameField);
  gameRootElement.addEventListener("click", makeGameFieldEditable(gameField));

  initControl();
  let generationText = document.getElementById("generation");
  generationText.innerText = "Generation: " + generation;
  let populationText = document.getElementById("population");
  populationText.innerText = "Population: " + population;
};

init();
