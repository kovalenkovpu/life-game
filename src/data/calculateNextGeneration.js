import { getSelectedCellNeighbours } from './getSelectedCellNeighbours';

export function calculateNextGeneration(dataModel) {
  const currentGenerationData = dataModel
    .map(
      (_, i) => dataModel[i]
        .map((cell) => getSelectedCellNeighbours(cell, dataModel)),
    );

  return dataModel
    .map((_, i) => dataModel[i]
      .map((cell, j) => {
        const { selectedNumber } = currentGenerationData[i][j];
        const isAlive = cell.selected;

        if (!isAlive && selectedNumber === 3) {
          return {
            ...cell,
            selected: true,
          };
        }

        if (isAlive) {
          return (selectedNumber === 2 || selectedNumber === 3)
            ? cell
            : { ...cell, selected: false };
        }

        return cell;
      }));
}
