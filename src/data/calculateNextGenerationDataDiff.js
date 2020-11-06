export function calculateNextGenerationDataDiff(previousDataModel, currentDataModel) {
  const diff = previousDataModel
    .reduce(
      (acc, _, i) => {
        const diffByRow = previousDataModel[i]
          .filter((data, j) => currentDataModel[i][j].selected !== data.selected);

        acc.push(...diffByRow);

        return acc;
      }, [],
    );

  return diff;
}
