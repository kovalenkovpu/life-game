export function findCellDataById(cellId, dataModel) {
  let cellData;

  for (let i = 0; i < dataModel.length; i += 1) {
    cellData = dataModel[i].find(({ id }) => id === cellId);

    if (cellData) {
      break;
    }
  }

  return cellData;
}
