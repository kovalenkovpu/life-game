import { calculateNextGeneration, calculateNextGenerationDataDiff } from 'src/data';
import { updateGrid } from 'src/grid';

const DELAY = 50;

const runLifeGame = (dataModel, i = 1) => {
  if (i === 100) {
    return;
  }

  const nextCounter = i + 1;

  setTimeout(() => {
    const nextGenerationDataModel = calculateNextGeneration(dataModel);
    const dataModelDiff = calculateNextGenerationDataDiff(
      dataModel,
      nextGenerationDataModel,
    );

    updateGrid(dataModelDiff);

    runLifeGame(nextGenerationDataModel, nextCounter);
  }, DELAY + i * 16);
};

export function runGameObserver(dataModel) {
  const runButton = document.querySelector('.run-game');

  runButton.addEventListener('click', () => {
    runLifeGame(dataModel);
  });
}
