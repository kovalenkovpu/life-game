import {
  GRID_CLASS_NAME,
  LEFT_PANEL_CLASS_NAME,
  RUN_GAME_BTN,
  PAUSE_GAME_BTN,
  STOP_GAME_BTN,
  COUNTER_ID,
} from 'src/constants/common';

export class GameView {
  constructor() {
    this.onStartGame = null;
    this.onStopGame = null;
    this.onPauseGame = null;
    this.grid = null;
    this.startGameButton = null;
    this.stopGameButton = null;
    this.oneDimensionSize = null;
  }

  renderGrid = (dataModel, counter) => {
    const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);
    const counterEl = document.getElementById(COUNTER_ID);

    counterEl.innerText = counter;

    this.startGameButton = document.querySelector(RUN_GAME_BTN);
    this.pauseGameButton = document.querySelector(PAUSE_GAME_BTN);
    this.stopGameButton = document.querySelector(STOP_GAME_BTN);

    if (existingGrid) {
      existingGrid.remove();

      this.startGameButton.removeEventListener('click', this.onStartGame);
      this.stopGameButton.removeEventListener('click', this.onStopGame);
    }

    this.grid = document.createElement('main');
    this.grid.classList.add(GRID_CLASS_NAME);
    this.grid.style['grid-template-row'] = `repeat(${this.oneDimensionSize}, 1fr)`;
    this.grid.style['grid-template-columns'] = `repeat(${this.oneDimensionSize}, 1fr)`;

    for (let i = 0; i < this.oneDimensionSize; i += 1) {
      for (let j = 0; j < this.oneDimensionSize; j += 1) {
        const cell = document.createElement('span');
        const cellData = dataModel[i][j];
        const isSelectedStringified = String(Boolean(cellData));

        cell.setAttribute('id', i * this.oneDimensionSize + j);
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-type', 'cell');
        cell.setAttribute('data-selected', isSelectedStringified);

        this.grid.insertAdjacentElement('beforeend', cell);
      }
    }

    document
      .querySelector(LEFT_PANEL_CLASS_NAME)
      .insertAdjacentElement('afterend', this.grid);

    this.startGameButton.addEventListener('click', this.onStartGame);
    this.pauseGameButton.addEventListener('click', this.onPauseGame);
    this.stopGameButton.addEventListener('click', this.onStopGame);
  };

  updateGrid = (generationDiff, counter) => {
    generationDiff
      .forEach((id) => {
        const cell = document.getElementById(id);
        const selected = cell.dataset.selected === 'true' ? 'false' : 'true';

        cell.setAttribute('data-selected', selected);
      });

    document.getElementById(COUNTER_ID).innerHTML = counter;
  };
}
