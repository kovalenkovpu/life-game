import {
  GRID_CLASS_NAME,
  LEFT_PANEL_CLASS_NAME,
  RUN_GAME_BTN,
  PAUSE_GAME_BTN,
  RANDOMIZE_BTN,
  STOP_GAME_BTN,
  COUNTER_CLASS_NAME,
  RANDOMIZE_FACTOR_CLASS_NAME,
} from 'src/constants/common';

export class GameView {
  onStartGame = null;

  onStopGame = null;

  onPauseGame = null;

  onRandomize = null;

  grid = null;

  startGameButton = document.body.querySelector(RUN_GAME_BTN);

  pauseGameButton = document.body.querySelector(PAUSE_GAME_BTN);

  stopGameButton = document.body.querySelector(STOP_GAME_BTN);

  randomizeButton = document.body.querySelector(RANDOMIZE_BTN);

  randomizeFactorInput = document.body.querySelector(RANDOMIZE_FACTOR_CLASS_NAME);

  counterEl = document.body.querySelector(COUNTER_CLASS_NAME);

  randomizeFactor = 0;

  xSize = 0;

  ySize = 0;

  gridWidth = 0;

  gridHeight = 0;

  getViewPortSize = () => {
    this.gridWidth = Math.floor((document.documentElement.clientWidth - 150));
    this.gridHeight = Math.floor(document.documentElement.clientHeight);
    this.xSize = Math.floor(this.gridWidth / 8);
    this.ySize = Math.floor(this.gridHeight / 8);

    return {
      xSize: this.xSize,
      ySize: this.ySize,
    };
  }

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
    for (let i = 0; i < this.ySize; i += 1) {
      for (let j = 0; j < this.xSize; j += 1) {
        const cell = document.createElement('span');
        const cellData = dataModel[i][j];
        const isSelectedStringified = String(Boolean(cellData));

        cell.setAttribute('id', i * this.xSize + j);
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-type', 'cell');
        cell.setAttribute('data-selected', isSelectedStringified);

        this.grid.insertAdjacentElement('beforeend', cell);
      }
    }
  };

  applyGridStyles = () => {
    this.grid.classList.add(GRID_CLASS_NAME);
    this.grid.style.width = `${this.gridWidth}px`;
    this.grid.style.minWidth = `${this.gridWidth}px`;
    this.grid.style.height = `${this.gridHeight}px`;
    this.grid.style.minHeight = `${this.gridHeight}px`;
    this.grid.style.gridTemplateRow = `repeat(${this.ySize}, 1fr)`;
    this.grid.style.gridTemplateColumns = `repeat(${this.xSize}, 1fr)`;
  };

  attachControlsEventListeners = () => {
    this.startGameButton.addEventListener('click', this.startGameHandler);
    this.pauseGameButton.addEventListener('click', this.pauseGameHandler);
    this.stopGameButton.addEventListener('click', this.stopGameHandler);
    this.randomizeButton.addEventListener('click', this.randomizeHandler);
  };

  removeControlsEventListeners = () => {
    this.startGameButton.removeEventListener('click', this.startGameHandler);
    this.pauseGameButton.removeEventListener('click', this.pauseGameHandler);
    this.stopGameButton.removeEventListener('click', this.stopGameHandler);
  };

  renderGrid = (dataModel, counter) => {
    const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

    if (existingGrid) {
      existingGrid.remove();

      this.removeControlsEventListeners();
    }

    this.grid = document.createElement('main');

    this.applyGridStyles();
    this.generateGridMarkup(dataModel);
    this.attachControlsEventListeners();

    document
      .querySelector(LEFT_PANEL_CLASS_NAME)
      .insertAdjacentElement('afterend', this.grid);

    this.pauseGameButton.disabled = true;
    this.stopGameButton.disabled = true;
    this.counterEl.innerText = counter;
  };

  updateGrid = (generationDiff, counter) => {
    generationDiff
      .forEach((id) => {
        const cell = document.getElementById(id);
        const selected = cell.dataset.selected === 'true' ? 'false' : 'true';

        cell.setAttribute('data-selected', selected);
      });

    document.body.querySelector(COUNTER_CLASS_NAME).innerHTML = counter;
  };
}
