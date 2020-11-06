import { createDataModel } from 'src/data';
import { createGrid } from './createGrid';
import { runGameObserver } from './runGameObserver';

import { LEFT_PANEL_CLASS_NAME } from '../constants/classes';

const selectedCells = ['4-3', '4-5', '5-4', '5-5', '6-5'];

export function gridSizeObserver() {
  const leftPanel = document.body.querySelector(LEFT_PANEL_CLASS_NAME);

  leftPanel.addEventListener('click', ({ target }) => {
    const isRadio = target.getAttribute('type') === 'radio';

    if (isRadio) {
      const { value: oneDimensionSize } = target;
      const dataModel = createDataModel(oneDimensionSize, selectedCells);

      createGrid(oneDimensionSize, dataModel);
      runGameObserver(dataModel);
    }
  });
}
