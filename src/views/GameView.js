import {
  GRID_CLASS_NAME,
  LEFT_PANEL_CLASS_NAME,
  RUN_GAME_BTN,
  PAUSE_GAME_BTN,
  RANDOMIZE_BTN,
  STOP_GAME_BTN,
  COUNTER_ID,
  RANDOMIZE_FACTOR_ID,
} from 'src/constants/common';

export class GameView {
  onStartGame = null;

  onStopGame = null;

  onPauseGame = null;

  onRandomize = null;

  grid = null;

  startGameButton = document.querySelector(RUN_GAME_BTN);

  pauseGameButton = document.querySelector(PAUSE_GAME_BTN);

  stopGameButton = document.querySelector(STOP_GAME_BTN);

  randomizeButton = document.querySelector(RANDOMIZE_BTN);

  randomizeFactorInput = document.querySelector(RANDOMIZE_FACTOR_ID);

  randomizeFactor = 0;

  counterEl = document.getElementById(COUNTER_ID);

  getRandomizeFactor = () => this.randomizeFactorInput.value;

  startGameHandler = () => {
    this.onStartGame();

    this.startGameButton.disabled = true;
    this.pauseGameButton.disabled = false;
    this.stopGameButton.disabled = false;
    this.randomizeButton.disabled = true;
  };

  pauseGameHandler = () => {
    this.onPauseGame();

    this.startGameButton.innerText = 'Resume game';
    this.startGameButton.disabled = false;
    this.pauseGameButton.disabled = true;
    this.randomizeButton.disabled = false;
  };

  stopGameHandler = () => {
    this.onStopGame();

    this.startGameButton.innerText = 'Start game';
    this.startGameButton.disabled = false;
    this.randomizeButton.disabled = false;
  };

  randomizeHandler = () => {
    this.onRandomize();
  };

  generateGridMarkup = (dataModel) => {
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
  };

  renderGrid = (dataModel, counter) => {
    const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

    if (existingGrid) {
      existingGrid.remove();

      this.startGameButton.removeEventListener('click', this.startGameHandler);
      this.pauseGameButton.removeEventListener('click', this.pauseGameHandler);
      this.stopGameButton.removeEventListener('click', this.stopGameHandler);
    }

    this.counterEl.innerText = counter;
    this.grid = document.createElement('main');
    this.grid.classList.add(GRID_CLASS_NAME);
    this.grid.style['grid-template-row'] = `repeat(${this.oneDimensionSize}, 1fr)`;
    this.grid.style['grid-template-columns'] = `repeat(${this.oneDimensionSize}, 1fr)`;

    this.generateGridMarkup(dataModel);

    document
      .querySelector(LEFT_PANEL_CLASS_NAME)
      .insertAdjacentElement('afterend', this.grid);

    this.startGameButton.addEventListener('click', this.startGameHandler);

    this.pauseGameButton.addEventListener('click', this.pauseGameHandler);
    this.pauseGameButton.disabled = true;

    this.stopGameButton.addEventListener('click', this.stopGameHandler);
    this.stopGameButton.disabled = true;

    this.randomizeButton.addEventListener('click', this.randomizeHandler);
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