import 'src/styles.scss';

import { GameView } from 'src/views/GameView';
import { GameModel } from 'src/models/GameModel';
import { GameController } from 'src/controllers/GameController';

import { initialData } from 'src/constants/initialData';

window.addEventListener('load', () => {
  const gameModel = new GameModel(initialData);
  const gameView = new GameView();
  const gameController = new GameController(gameModel, gameView);

  gameController.initGame();
});
