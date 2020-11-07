import 'src/styles.scss';
import { GameView } from 'src/migration/GameView';
import { GameModel } from 'src/migration/GameModel';
import { GameController } from 'src/migration/GameController';
import { initialData } from './constants/initialData';

window.addEventListener('load', () => {
  const gameModel = new GameModel(initialData);
  const gameView = new GameView();
  const gameController = new GameController(gameModel, gameView);

  gameController.initGame();
});
