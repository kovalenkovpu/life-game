import { GameControllerInterface } from 'src/types/GameController';
import { GameModelInterface } from 'src/types/GameModel';
import { GameViewInterface, ViewPortSizeType } from 'src/types/GameView';

export class GameController implements GameControllerInterface {
  constructor(
    public gameModel: GameModelInterface,
    public gameView: GameViewInterface,
  ) { }

  private xGridSize: ViewPortSizeType['xGridSize'];

  private yGridSize: ViewPortSizeType['yGridSize'];

  private counter = 0;

  private intervalId = 0;

  private onStartGame = (): void => {
    this.intervalId = setInterval(() => {
      const generationDiff = this.gameModel.calculateNextGenerationDiff();

      this.counter += 1;
      this.gameView.updateGrid(generationDiff, this.counter);
    });
  };

  private onStopGame = (): void => {
    clearInterval(this.intervalId);

    this.counter = 0;
    this.gameModel.resetDataModel();
    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };

  private onPauseGame = (): void => clearInterval(this.intervalId);

  private getRandomIndexI = (): number => Math.ceil((Math.random() * this.yGridSize));

  private getRandomIndexJ = (): number => Math.ceil((Math.random() * this.xGridSize));

  private onRandomize = (): void => {
    const randomizeFactor = this.gameView.getRandomizeFactor();
    const numberOfRandomElements = Math
      .floor(this.xGridSize * this.yGridSize * Number(randomizeFactor));

    this.gameModel.initialData = new Array(numberOfRandomElements).fill('')
      .map(() => `${this.getRandomIndexI()}-${this.getRandomIndexJ()}`);
    this.gameModel.createDataModel();

    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };

  // Init app
  initGame = (): void => {
    const { xGridSize, yGridSize } = this.gameView.getViewPortSize();
    this.xGridSize = xGridSize;
    this.yGridSize = yGridSize;

    this.gameModel.xGridSize = xGridSize;
    this.gameModel.yGridSize = yGridSize;
    this.gameModel.createDataModel();

    this.gameView.onStartGame = this.onStartGame;
    this.gameView.onStopGame = this.onStopGame;
    this.gameView.onPauseGame = this.onPauseGame;
    this.gameView.onRandomize = this.onRandomize;
    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };
}
