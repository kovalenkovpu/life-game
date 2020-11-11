import { GameControllerInterface } from 'src/types/GameController';
import { GameModelInterface } from 'src/types/GameModel';
import { GameViewInterface } from 'src/types/GameView';

export class GameController implements GameControllerInterface {
  constructor(
    public gameModel: GameModelInterface,
    public gameView: GameViewInterface,
  ) { }

  intervalId = 0;

  counter = 0;

  xSize = 0;

  ySize = 0;

  // When start button is clicked
  onStartGame = (): void => {
    this.intervalId = setInterval(() => {
      const generationDiff = this.gameModel.calculateNextGenerationDiff();

      this.counter += 1;
      this.gameView.updateGrid(generationDiff, this.counter);
    });
  };

  // When stop button is clicked
  onStopGame = (): void => {
    clearInterval(this.intervalId);

    this.counter = 0;
    this.gameModel.resetDataModel();
    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };

  // When pause button is clicked
  onPauseGame = (): void => {
    clearInterval(this.intervalId);
  };

  private getRandomIndexI = (): number => Math.ceil((Math.random() * this.ySize));

  private getRandomIndexJ = (): number => Math.ceil((Math.random() * this.xSize));

  // When randomize button is clicked
  onRandomize = (): void => {
    const randomizeFactor = this.gameView.getRandomizeFactor();
    const numberOfRandomElements = Math.floor(this.xSize * this.ySize * Number(randomizeFactor));

    this.gameModel.initialData = new Array(numberOfRandomElements).fill('')
      .map(() => `${this.getRandomIndexI()}-${this.getRandomIndexJ()}`);
    this.gameModel.createDataModel();

    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };

  // Init app
  initGame = (): void => {
    const { xSize, ySize } = this.gameView.getViewPortSize();
    this.xSize = xSize;
    this.ySize = ySize;

    this.gameModel.xSize = xSize;
    this.gameModel.ySize = ySize;
    this.gameModel.createDataModel();

    this.gameView.onStartGame = this.onStartGame;
    this.gameView.onStopGame = this.onStopGame;
    this.gameView.onPauseGame = this.onPauseGame;
    this.gameView.onRandomize = this.onRandomize;
    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };
}
