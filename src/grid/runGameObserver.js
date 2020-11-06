/* eslint-disable no-loop-func */
import isEmpty from 'lodash/isEmpty';

import { calculateNextGeneration, calculateNextGenerationDataDiff } from 'src/data';
import { updateGrid } from 'src/grid';

const DELAY = 50;

const runLifeGame = (dataModel) => {
  const counterEl = document.body.querySelector('#iterations');
  let currentDataModel = dataModel;

  for (let i = 0; i < 1000; i += 1) {
    ((count) => setTimeout(() => {
      const nextGenerationDataModel = calculateNextGeneration(currentDataModel);
      const dataModelDiff = calculateNextGenerationDataDiff(
        currentDataModel,
        nextGenerationDataModel,
      );

      if (!isEmpty(dataModelDiff)) {
        counterEl.innerHTML = count;

        updateGrid(dataModelDiff);

        currentDataModel = nextGenerationDataModel;
      }
    }, DELAY + i * 16))(i);
  }
};

export function runGameObserver(dataModel) {
  const runButton = document.querySelector('.run-game');

  runButton.addEventListener('click', () => {
    runLifeGame(dataModel);
  });
}
