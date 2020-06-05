export const getGameField = (rows, cols) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill());

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
              `<div data-j = "${j}" data-i="${i}" class="void"></div>`
          )
          .join("")}</div>`
    )
    .join("");
