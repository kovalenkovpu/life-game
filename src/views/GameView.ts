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
import { DataModelType, GenerationUpdateData } from 'src/types/GameModel';
import { GameViewInterface } from 'src/types/GameView';
import { ViewPortSizeType } from 'src/types/common';

export class GameView implements GameViewInterface {
  onStartGame: () => void;

  onStopGame: () => void;

  onPauseGame: () => void;

  onRandomize: () => void;

  private grid: HTMLCanvasElement;

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

  private cellWidth: number = 4;

  private cellHeight: number = 4;

  private cellGap: number = 1;

  private deadCellColor: string = '#c0a9bd';

  private aliveCellColor: string = '#d96846';

  private gridWidth = 0;

  private gridHeight = 0;

  private gridCoordsById: Map<number, [number, number]> = new Map();

  private generateGridMarkup = (dataModel: DataModelType): void => {
    const ctx = this.grid.getContext('2d') as CanvasRenderingContext2D;

    for (let i = 0; i < this.yGridSize; i++) {
      for (let j = 0; j < this.xGridSize; j++) {
        const cellData = dataModel[i][j];
        const isSelected = Boolean(cellData);

        const nextX = this.cellGap + this.cellWidth * j + this.cellGap * j;
        const nextY = this.cellGap + this.cellHeight * i + this.cellGap * i;
        const id = i * this.xGridSize + j;

        this.gridCoordsById.set(id, [nextX, nextY]);

        ctx.fillStyle = isSelected ? this.aliveCellColor : this.deadCellColor;
        ctx.fillRect(nextX, nextY, this.cellWidth, this.cellHeight);
      }
    }
  };

  private applyGridStyles = (): void => {
    this.grid.classList.add(GRID_CLASS_NAME);
    this.grid.width = this.gridWidth;
    this.grid.height = this.gridHeight;
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
    this.xGridSize = Math.floor(this.gridWidth / (this.cellWidth + this.cellGap));
    this.yGridSize = Math.floor(this.gridHeight / (this.cellHeight + this.cellGap));

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

    this.grid = document.createElement('canvas');

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

  updateGrid = (generationUpdateData: GenerationUpdateData, counter: number): void => {
    this.updateCounter(counter);

    const { generationDiff, generationState } = generationUpdateData;

    const ctx = this.grid.getContext('2d') as CanvasRenderingContext2D;

    generationDiff
      .forEach((id, ind) => {
        const coordsById = this.gridCoordsById.get(id);

        if (coordsById) {
          ctx.fillStyle = generationState[ind] ? this.aliveCellColor : this.deadCellColor;
          ctx.fillRect(coordsById[0], coordsById[1], this.cellWidth, this.cellHeight);
        }
      });
  };
}
