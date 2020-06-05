var rows = 50;
var cols = 50;

var arrayField = new Array(rows);
var nextArrayField = new Array(rows);

var population = 0;
var generation = 0;
var runLife = false;
var timer;

var speed=500;

function initArrayField() {
    for (let i = 0; i < rows ; i++) {
        arrayField[i] = new Array(cols);
        nextArrayField[i] = new Array(cols);
    }
}

function initDrawField() {
    let field = document.getElementById("lifeWorld");
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.id = `${i}-${j}`;
            cell.className = "void";
            row.appendChild(cell);
            cell.onclick = function(){
                arrayField[i][j] = !arrayField[i][j];
                if(arrayField[i][j]){
                    cell.className = "live";
                }else{
                    cell.className = "void";
                }
            }
        }
        field.appendChild(row);
    }

}

function initControl(){
    let start = document.getElementById("start");
    start.onclick = startLife;

    let reset = document.getElementById("reset");
    reset.onclick = resetLife;

    let random = document.getElementById("random");
    random.onclick = randomLife;
}
function startLife(){
    // console.log(this)
    if(runLife){
        runLife = false;
        clearTimeout(timer);
        this.innerText = "Start";
    }else{
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
function nextGeneration(){
    population = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            liveForecast(i,j);
        }
    }
    // arrayField = [...nextArrayField];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arrayField[i][j] = nextArrayField[i][j];
            nextArrayField[i][j] = false;
        }
    }
    drawField(arrayField, rows, cols);

    generation++;
    generationText.innerText = "Generation: " + generation;

    populationText.innerText = "Population: " + population;
}
function liveForecast(row, col){
    let neighbors = countNeighbors(row, col);
    // console.log("----------------")
    // console.log(`${row}, ${col} - ${neighbors}`);

    if(arrayField[row][col]){
        if(neighbors < 2 || neighbors > 3) {
            nextArrayField[row][col] = false;
            // console.log(`${row}, ${col} - ${neighbors} false 1`);
        // } else if(neighbors > 3){
        //     nextArrayField[row][col] = false;
        //     // console.log(`${row}, ${col} - ${neighbors} false 2`);
        } else{
            nextArrayField[row][col] = true;
            // console.log(`${row}, ${col} - ${neighbors} true 3`);
        }
    }else if(neighbors === 3){
        nextArrayField[row][col] = true;
        // console.log(`${row}, ${col} - ${neighbors} true 4`);
    }else {
        nextArrayField[row][col] = false;
        // console.log(`${row}, ${col} - ${neighbors} false 5`);
    }
    if(nextArrayField[row][col]){
        population++;
    }
}
function countNeighbors(row, col){
    let count = 0;

    if ((row-1)>-1 && (col-1)>-1 && arrayField[row-1][col-1]) count++;
    if ((row-1)>-1 && arrayField[row-1][col]) count++;
    if ((row-1)>-1 && (col+1)<cols && arrayField[row-1][col+1]) count++;

    if ( (col-1)>-1 && arrayField[row][col-1]) count++;
    if ( (col+1)<cols && arrayField[row][col+1]) count++;

    if ((row+1)<rows && (col-1)>-1 && arrayField[row+1][col-1]) count++;
    if ((row+1)<rows && arrayField[row+1][col]) count++;
    if ((row+1)<rows && (col+1)<cols && arrayField[row+1][col+1]) count++;

    return count++;
}

function reset(){
    let startBtn = document.getElementById("start");
    runLife = false;
    clearTimeout(timer);
    startBtn.innerText = "Start";
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            arrayField[i][j]=false;
        }
    }
    generation = 0;
    generationText.innerText = "Generation: " + generation;
    population = 0;
    populationText.innerText = "Population: " + population;
}
function drawField(){
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            let cell = document.getElementById(`${i}-${j}`);
            if(arrayField[i][j]){
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
            if(Math.random() > 0.5){
                arrayField[i][j] = true;
                population++;
            } else {
                arrayField[i][j] = false;
            }
        }
    }
    populationText.innerText = "Population: " + population;
    generation = 0;
    generationText.innerText = "Generation: " + generation;
    // console.log(arrayField);
}
function resetLife(){
    reset();
    drawField();
}
function randomLife(){
    random();
    drawField();
}

initArrayField();
initDrawField();
initControl();
let generationText = document.getElementById("generation");
generationText.innerText = "Generation: " + generation;
let populationText = document.getElementById("population");
populationText.innerText = "Population: " + population;