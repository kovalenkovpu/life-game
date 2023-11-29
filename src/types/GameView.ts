import { ViewPortSizeType } from './common';
import { DataModelType, GenerationUpdateData } from './GameModel';

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
  updateGrid(generationUpdateData: GenerationUpdateData, counter: number): void;
}
