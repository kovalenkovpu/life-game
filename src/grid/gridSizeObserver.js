import { initialData } from 'src/constants/initialData';
import { createDataModel } from 'src/dataModel';
import { LEFT_PANEL_CLASS_NAME } from 'src/constants/common';

import { createGrid } from './createGrid';
import { runGameObserver } from './runGameObserver';

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
