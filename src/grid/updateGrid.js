export function updateGrid(dataModelDiff) {
  dataModelDiff
    .forEach((cellData) => {
      const cell = document.getElementById(cellData.id);
      const selected = String(!cellData.selected);

      cell.setAttribute('data-selected', selected);
    });
}
