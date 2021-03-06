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
import { DataModelType, GenerationDiff } from 'src/types/GameModel';
import { GameViewInterface, ViewPortSizeType } from 'src/types/GameView';

export class GameView implements GameViewInterface {
  onStartGame: () => void;

  onStopGame: () => void;

  onPauseGame: () => void;

  onRandomize: () => void;

  private grid: HTMLSpanElement;

  private startGameButton = document.body
    .querySelector<HTMLButtonElement>(RUN_GAME_BTN);

  private pauseGameButton = document.body
    .querySelector<HTMLButtonElement>(PAUSE_GAME_BTN);

  private stopGameButton = document.body
    .querySelector<HTMLButtonElement>(STOP_GAME_BTN);

  private randomizeButton = document.body
    .querySelector<HTMLButtonElement>(RANDOMIZE_BTN);

  private randomizeFactorInput = document.body
    .querySelector<HTMLInputElement>(RANDOMIZE_FACTOR_CLASS_NAME);

  private counterEl = document.body
    .querySelector<HTMLInputElement>(COUNTER_CLASS_NAME);

  private xGridSize: ViewPortSizeType['xGridSize'];

  private yGridSize: ViewPortSizeType['yGridSize'];

  private gridWidth = 0;

  private gridHeight = 0;

  private generateGridMarkup = (dataModel: DataModelType): void => {
    for (let i = 0; i < this.yGridSize; i += 1) {
      for (let j = 0; j < this.xGridSize; j += 1) {
        const cell = document.createElement('span');
        const cellData = dataModel[i][j];
        const isSelectedStringified = String(Boolean(cellData));

        cell.setAttribute('id', String(i * this.xGridSize + j));
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-type', 'cell');
        cell.setAttribute('data-selected', isSelectedStringified);

        this.grid.insertAdjacentElement('beforeend', cell);
      }
    }
  };

  private applyGridStyles = (): void => {
    this.grid.classList.add(GRID_CLASS_NAME);
    this.grid.style.width = `${this.gridWidth}px`;
    this.grid.style.minWidth = `${this.gridWidth}px`;
    this.grid.style.height = `${this.gridHeight}px`;
    this.grid.style.minHeight = `${this.gridHeight}px`;
    this.grid.style.gridTemplateRows = `repeat(${this.yGridSize}, 1fr)`;
    this.grid.style.gridTemplateColumns = `repeat(${this.xGridSize}, 1fr)`;
  };

  private attachControlsEventListeners = (): void => {
    this.startGameButton?.addEventListener('click', this.startGameHandler);
    this.pauseGameButton?.addEventListener('click', this.pauseGameHandler);
    this.stopGameButton?.addEventListener('click', this.stopGameHandler);
    this.randomizeButton?.addEventListener('click', this.randomizeHandler);
  };

  private removeControlsEventListeners = (): void => {
    this.startGameButton?.removeEventListener('click', this.startGameHandler);
    this.pauseGameButton?.removeEventListener('click', this.pauseGameHandler);
    this.stopGameButton?.removeEventListener('click', this.stopGameHandler);
  };

  private updateCounter = (counter: number): void => {
    if (this.counterEl) {
      this.counterEl.innerText = String(counter);
    }
  };

  getViewPortSize = (): ViewPortSizeType => {
    this.gridWidth = Math.floor((document.documentElement.clientWidth - 150));
    this.gridHeight = Math.floor(document.documentElement.clientHeight);
    this.xGridSize = Math.floor(this.gridWidth / 8);
    this.yGridSize = Math.floor(this.gridHeight / 8);

    return {
      xGridSize: this.xGridSize,
      yGridSize: this.yGridSize,
    };
  }

  getRandomizeFactor = (): number => {
    const value = this.randomizeFactorInput?.value;

    return Number(value);
  }

  startGameHandler = (): void => {
    this.onStartGame();

    if (this.startGameButton) {
      this.startGameButton.disabled = true;
    }

    if (this.pauseGameButton) {
      this.pauseGameButton.disabled = false;
    }

    if (this.stopGameButton) {
      this.stopGameButton.disabled = false;
    }

    if (this.randomizeButton) {
      this.randomizeButton.disabled = true;
    }
  };

  pauseGameHandler = (): void => {
    this.onPauseGame();

    if (this.startGameButton) {
      this.startGameButton.innerText = 'Resume game';
      this.startGameButton.disabled = false;
    }

    if (this.pauseGameButton) {
      this.pauseGameButton.disabled = true;
    }

    if (this.randomizeButton) {
      this.randomizeButton.disabled = false;
    }
  };

  stopGameHandler = (): void => {
    this.onStopGame();

    if (this.startGameButton) {
      this.startGameButton.innerText = 'Start game';
      this.startGameButton.disabled = false;
    }

    if (this.randomizeButton) {
      this.randomizeButton.disabled = false;
    }
  };

  randomizeHandler = (): void => this.onRandomize();

  renderGrid = (dataModel: DataModelType, counter: number): void => {
    const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

    if (existingGrid) {
      existingGrid.remove();

      this.removeControlsEventListeners();
    }

    this.grid = document.createElement('main');

    this.updateCounter(counter);
    this.applyGridStyles();
    this.generateGridMarkup(dataModel);
    this.attachControlsEventListeners();

    document.body
      .querySelector(LEFT_PANEL_CLASS_NAME)?.insertAdjacentElement('afterend', this.grid);

    if (this.pauseGameButton) {
      this.pauseGameButton.disabled = true;
    }

    if (this.stopGameButton) {
      this.stopGameButton.disabled = true;
    }
  };

  updateGrid = (generationDiff: GenerationDiff, counter: number): void => {
    this.updateCounter(counter);

    generationDiff
      .forEach((id) => {
        const cell = document.getElementById(String(id));
        const selected = cell?.dataset
          .selected === 'true' ? 'false' : 'true';

        cell?.setAttribute('data-selected', selected);
      });
  };
}
