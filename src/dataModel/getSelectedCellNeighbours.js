import get from 'lodash/get';

export function getNeighboursIndices(i, j) {
  const leftTopIndex = [i - 1, j - 1];
  const topIndex = [i - 1, j];
  const topRightIndex = [i - 1, j + 1];
  const leftIndex = [i, j - 1];
  const rightIndex = [i, j + 1];
  const bottomLeftIndex = [i + 1, j - 1];
  const bottomIndex = [i + 1, j];
  const bottomRightIndex = [i + 1, j + 1];
  const neighboursIndices = [
    leftTopIndex,
    topIndex,
    topRightIndex,
    leftIndex,
    rightIndex,
    bottomLeftIndex,
    bottomIndex,
    bottomRightIndex,
  ];

  return neighboursIndices;
}

export function getSelectedCellNeighbours(i, j, dataModel) {
  const neighboursIndices = getNeighboursIndices(i, j);

  return neighboursIndices.reduce((acc, indices) => {
    const [currI, currJ] = indices;
    const cellData = get(get(dataModel, currI), currJ);

    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(cellData)) {
      // eslint-disable-next-line no-param-reassign
      acc += 1;
    }

    return acc;
  }, 0);
}
