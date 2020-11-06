import { GRID_CLASS_NAME, LEFT_PANEL_CLASS_NAME } from 'src/constants/classes';
import { findCellDataById } from 'src/data';
import { cellClickObserver } from 'src/grid';

export function createGrid(oneDimensionSize, dataModel) {
  const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

  if (existingGrid) {
    existingGrid.remove();
  }

  const grid = document.createElement('main');
  const numberOfCells = oneDimensionSize ** 2;

  grid.classList.add(GRID_CLASS_NAME);
  grid.style['grid-template-row'] = `repeat(${oneDimensionSize}, 1fr)`;
  grid.style['grid-template-columns'] = `repeat(${oneDimensionSize}, 1fr)`;

  for (let i = 0; i < numberOfCells; i += 1) {
    const cell = document.createElement('span');
    const cellData = findCellDataById(i, dataModel);

    cell.setAttribute('class', `cell cell-${i}`);
    cell.setAttribute('data-type', 'cell');
    cell.setAttribute('data-id', i);
    cell.setAttribute('data-selected', cellData.selected);

    grid.insertAdjacentElement('beforeend', cell);
  }

  document
    .querySelector(LEFT_PANEL_CLASS_NAME)
    .insertAdjacentElement('afterend', grid);

  cellClickObserver();
}
