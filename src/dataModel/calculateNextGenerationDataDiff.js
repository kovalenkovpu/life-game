export function calculateNextGenerationDataDiff(previousDataModel, currentDataModel) {
  const gridOneDimensionSize = previousDataModel.length;

  const diff = previousDataModel
    .reduce(
      (acc, _, i) => {
        const diffByRow = previousDataModel[i]
          .reduce((indices, alive, j) => {
            if (currentDataModel[i][j] !== alive) {
              indices.push(i * gridOneDimensionSize + j);
            }

            return indices;
          }, []);

        acc.push(...diffByRow);

        return acc;
      },
      [],
    );

  return diff;
}
