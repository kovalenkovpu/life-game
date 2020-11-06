import { initialData } from 'src/constants/initialData';
import { createDataModel } from 'src/data';

import { createGrid } from './createGrid';
import { runGameObserver } from './runGameObserver';

import { LEFT_PANEL_CLASS_NAME } from '../constants/common';

export function gridSizeObserver() {
  const leftPanel = document.body.querySelector(LEFT_PANEL_CLASS_NAME);

  leftPanel.addEventListener('click', ({ target }) => {
    const isRadio = target.getAttribute('type') === 'radio';

    if (isRadio) {
      const { value: oneDimensionSize } = target;
      const dataModel = createDataModel(oneDimensionSize, initialData);

      createGrid(oneDimensionSize, dataModel);
      runGameObserver(dataModel);
    }
  });
}
