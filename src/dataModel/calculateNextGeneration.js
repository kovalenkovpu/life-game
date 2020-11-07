import { getSelectedCellNeighbours } from './getSelectedCellNeighbours';

export function calculateNextGeneration(dataModel) {
  const currentGenerationData = dataModel
    .map(
      (_, i) => dataModel[i]
        .map((__, j) => getSelectedCellNeighbours(i, j, dataModel)),
    );

  return dataModel
    .map((_, i) => dataModel[i]
      .map((isAlive, j) => {
        const selectedNumber = currentGenerationData[i][j];

        if (!isAlive && selectedNumber === 3) {
          return 1;
        }

        if (isAlive) {
          return (selectedNumber === 2 || selectedNumber === 3)
            ? isAlive
            : 0;
        }

        return isAlive;
      }));
}
