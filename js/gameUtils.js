export const getRandomBoolean = () => Math.random() > 0.5;
export const generate2DetentionsArray = (rowCount, columnCount, valueFn) =>
  new Array(rowCount)
    .fill()
    .map((_, i) => new Array(columnCount).fill().map((_, j) => valueFn(i, j)));

export const getGameField = (rows, cols) =>
  generate2DetentionsArray(rows, cols, () => false);

export const makeGameFieldEditable = (gameField) => (ev) => {
  const el = ev.target;
  if (el.matches(".void, .live")) {
    const i = Number(el.dataset.i);
    const j = Number(el.dataset.j);
    const cell = !gameField[i][j];

    gameField[i][j] = cell;
    el.className = cell ? "live" : "void";
  }
};

export const getGameFieldHTML = (gameField) =>
  gameField
    .map(
      (row, i) =>
        `<div class="row">${row
          .map(
            (cell, j) =>
              `<div data-j = "${j}" data-i="${i}" class=${
                gameField[i][j] ? "live" : "void"
              }></div>`
          )
          .join("")}</div>`
    )
    .join("");
