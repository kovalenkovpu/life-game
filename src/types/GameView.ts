import { DataModelType, GenerationDiff } from './GameModel';

export interface ViewPortSizeType {
  xGridSize: number;
  yGridSize: number;
}

export interface GameViewInterface {
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
