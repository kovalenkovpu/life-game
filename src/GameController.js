export class GameController {
  constructor(gameModel, gameView) {
    this.gameModel = gameModel;
    this.gameView = gameView;
  }

  oneDimensionSize = 200;

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

  // Init app
  initGame = () => {
    this.gameModel.oneDimensionSize = this.oneDimensionSize;
    this.gameModel.createDataModel();

    this.gameView.oneDimensionSize = this.oneDimensionSize;
    this.gameView.onStartGame = this.onStartGame;
    this.gameView.onStopGame = this.onStopGame;
    this.gameView.onPauseGame = this.onPauseGame;
    this.gameView.renderGrid(this.gameModel.dataModel, this.counter);
  };
}
