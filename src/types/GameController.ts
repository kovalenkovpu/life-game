import { GameModelInterface } from 'src/types/GameModel';
import { GameViewInterface } from 'src/types/GameView';

export interface GameControllerInterface {
  gameModel: GameModelInterface;
  gameView: GameViewInterface;

  initGame(): void;
}
