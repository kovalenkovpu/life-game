import isEmpty from 'lodash/isEmpty';

import {
  COUNTER_ID,
  DELAY,
  RUN_GAME_BTN,
  STOP_GAME_BTN,
} from 'src/constants/common';
import {
  calculateNextGeneration,
  calculateNextGenerationDataDiff,
} from 'src/data';
import { updateGrid } from 'src/grid';

const runLifeGame = (dataModel) => {
  const counterEl = document.body.querySelector(COUNTER_ID);
  let currentDataModel = dataModel;
  let count = 0;

  const timerId = setInterval(() => {
    const nextGenerationDataModel = calculateNextGeneration(currentDataModel);
    const dataModelDiff = calculateNextGenerationDataDiff(
      currentDataModel,
      nextGenerationDataModel,
    );

    if (isEmpty(dataModelDiff)) {
      clearInterval(timerId);
    }

    counterEl.innerHTML = String(count);

    updateGrid(dataModelDiff);

    currentDataModel = nextGenerationDataModel;

    count += 1;
  }, DELAY);

  return timerId;
};

export function runGameObserver(dataModel) {
  const runButton = document.querySelector(RUN_GAME_BTN);
  const stopButton = document.querySelector(STOP_GAME_BTN);
  let timerId = 0;

  runButton.addEventListener('click', () => {
    timerId = runLifeGame(dataModel);
  });

  stopButton.addEventListener('click', () => {
    clearInterval(timerId);
  });
}
