import 'src/styles.scss';

import { GameView } from 'src/GameView';
import { GameModel } from 'src/GameModel';
import { GameController } from 'src/GameController';

import { initialData } from './constants/initialData';

window.addEventListener('load', () => {
  const gameModel = new GameModel(initialData);
  const gameView = new GameView();
  const gameController = new GameController(gameModel, gameView);

  gameController.initGame();
});
