export function createDataModel(oneDimensionSize, selectedCells = []) {
  const size = Number(oneDimensionSize);
  let dataModel = new Array(size).fill(new Array(size).fill(0));

  dataModel = dataModel
    .map((row, i) => row.map((_, j) => {
      const id = i * oneDimensionSize + j;
      const cell = {
        id,
        i,
        j,
        ij: `${i}-${j}`,
      };

      cell.selected = selectedCells.includes(cell.ij);

      return cell;
    }));

  return dataModel;
}
