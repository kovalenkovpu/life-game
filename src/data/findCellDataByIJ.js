import get from 'lodash/get';

export function findCellDataByIJ(ij, dataModel) {
  const [i, j] = ij.split('-');

  return get(get(dataModel, i), j);
}
