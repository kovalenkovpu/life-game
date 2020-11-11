import { DataModelType, GenerationDiff } from './GameModel';

export interface ViewPortSizeType {
  xSize: number;
  ySize: number;
}

export interface GameViewInterface {
  grid: HTMLSpanElement;
  startGameButton: HTMLButtonElement | null;
  pauseGameButton: HTMLButtonElement | null;
  stopGameButton: HTMLButtonElement | null;
  randomizeButton: HTMLButtonElement | null;
  randomizeFactorInput: HTMLInputElement | null;
  counterEl: HTMLInputElement | null;
  randomizeFactor: number;
  xSize: number;
  ySize: number;
  gridWidth: number;
  gridHeight: number;

  onStartGame(): void;
  onPauseGame(): void;
  onStopGame(): void;
  onRandomize(): void;

  getViewPortSize(): ViewPortSizeType;
  getRandomizeFactor(): number;
  startGameHandler(): void;
  pauseGameHandler(): void;
  stopGameHandler(): void;
  randomizeHandler(): void;
  renderGrid(dataModel: DataModelType, counter: number): void;
  updateGrid(generationDiff: GenerationDiff, counter: number): void
}
