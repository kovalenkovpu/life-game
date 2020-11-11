import { GameModelInterface } from 'src/types/GameModel';
import { GameViewInterface } from 'src/types/GameView';

export interface GameControllerInterface {
  gameModel: GameModelInterface;
  gameView: GameViewInterface;
  intervalId: number;
  counter: number;
  xSize: number;
  ySize: number;

  onStartGame(): void;
  onStopGame(): void;
  onPauseGame(): void;
  onRandomize(): void;
  initGame(): void;
}
