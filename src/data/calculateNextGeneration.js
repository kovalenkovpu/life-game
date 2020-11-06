import { getSelectedCellNeighbours } from './getSelectedCellNeighbours';

export function calculateNextGeneration(dataModel) {
  const currentGenerationData = dataModel
    .map(
      (_, i) => dataModel[i]
        .map((cell) => getSelectedCellNeighbours(cell, dataModel)),
    );

  const nextGenerationDataModel = dataModel
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

        if (isAlive && (selectedNumber === 2 || selectedNumber === 3)) {
          return cell;
        }

        if (isAlive && (selectedNumber > 2 || selectedNumber < 3)) {
          return {
            ...cell,
            selected: false,
          };
        }

        return cell;
      }));

  return nextGenerationDataModel;
}
