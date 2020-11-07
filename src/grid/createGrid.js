import { GRID_CLASS_NAME, LEFT_PANEL_CLASS_NAME } from 'src/constants/common';
import { cellClickObserver } from 'src/grid';

export function createGrid(oneDimensionSize, dataModel) {
  const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

  if (existingGrid) {
    existingGrid.remove();
  }

  const grid = document.createElement('main');

  grid.classList.add(GRID_CLASS_NAME);
  grid.style['grid-template-row'] = `repeat(${oneDimensionSize}, 1fr)`;
  grid.style['grid-template-columns'] = `repeat(${oneDimensionSize}, 1fr)`;

  for (let i = 0; i < oneDimensionSize; i += 1) {
    for (let j = 0; j < oneDimensionSize; j += 1) {
      const cell = document.createElement('span');
      const cellData = dataModel[i][j];
      const isSelectedStringified = String(Boolean(cellData));

      cell.setAttribute('id', i * oneDimensionSize + j);
      cell.setAttribute('class', 'cell');
      cell.setAttribute('data-type', 'cell');
      cell.setAttribute('data-selected', isSelectedStringified);

      grid.insertAdjacentElement('beforeend', cell);
    }
  }

  document
    .querySelector(LEFT_PANEL_CLASS_NAME)
    .insertAdjacentElement('afterend', grid);

  cellClickObserver();
}
