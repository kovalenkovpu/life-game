export class GameController {
  constructor(gameModel, gameView) {
    this.gameModel = gameModel;
    this.gameView = gameView;
  }

  intervalId = null;

  counter = 0;

  // When start button is clicked
  onStartGame = () => {
    this.intervalId = setInterval(() => {
      const generationDiff = this.gameModel.calculateNextGenerationDiff();

      this.counter += 1;
      this.gameView.updateGrid(generationDiff, this.counter);
    });
  };

  // When stop button is clicked
  onStopGame = () => {
    clearInterval(this.intervalId);

    this.counter = 0;
    this.gameModel.resetDataModel();
    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };

  // When pause button is clicked
  onPauseGame = () => {
    clearInterval(this.intervalId);
  };

  getRandomIndexI = () => Math.ceil((Math.random() * this.ySize));

  getRandomIndexJ = () => Math.ceil((Math.random() * this.xSize));

  // When randomize button is clicked
  onRandomize = () => {
    const randomizeFactor = this.gameView.getRandomizeFactor();
    const numberOfRandomElements = Math.floor(this.xSize * this.ySize * Number(randomizeFactor));

    this.gameModel.initialData = new Array(numberOfRandomElements).fill('')
      .map(() => `${this.getRandomIndexI()}-${this.getRandomIndexJ()}`);
    this.gameModel.createDataModel();

    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };

  // Init app
  initGame = () => {
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
