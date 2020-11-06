import { GRID_CLASS_NAME } from 'src/constants/classes';

export function updateGrid(dataModelDiff) {
  const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

  dataModelDiff
    .forEach((cellData) => {
      const cell = existingGrid.querySelector(`[data-id="${cellData.id}"]`);

      cell.setAttribute('data-selected', !cellData.selected);
    });
}
