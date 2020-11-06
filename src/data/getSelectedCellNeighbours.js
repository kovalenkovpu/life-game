import get from 'lodash/get';
import { findCellDataByIJ } from './findCellDataByIJ';

export function getNeighboursIndices(cell) {
  const { i, j } = cell;
  const leftTopIndex = `${i - 1}-${j - 1}`;
  const topIndex = `${i - 1}-${j}`;
  const topRightIndex = `${i - 1}-${j + 1}`;
  const leftIndex = `${i}-${j - 1}`;
  const rightIndex = `${i}-${j + 1}`;
  const bottomLeftIndex = `${i + 1}-${j - 1}`;
  const bottomIndex = `${i + 1}-${j}`;
  const bottomRightIndex = `${i + 1}-${j + 1}`;
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

export function getSelectedCellNeighbours(cell, dataModel) {
  const neighboursIndices = getNeighboursIndices(cell);

  return neighboursIndices.reduce((acc, ij) => {
    const cellData = findCellDataByIJ(ij, dataModel);

    if (get(cellData, 'selected')) {
      acc.selectedNeighbours.push(cellData);
      acc.selectedNumber += 1;
    }

    return acc;
  }, {
    selectedNumber: 0,
    selectedNeighbours: [],
  });
}
