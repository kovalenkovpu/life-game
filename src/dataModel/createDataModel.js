export function createDataModel(oneDimensionSize, selectedCells = []) {
  const size = Number(oneDimensionSize);
  let dataModel = new Array(size).fill(new Array(size).fill(0));

  dataModel = dataModel
    .map((row, i) => row.map((_, j) => {
      const id = `${i}-${j}`;

      return Number(selectedCells.includes(id));
    }));

  return dataModel;
}
