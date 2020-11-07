export function updateGrid(dataModelDiff) {
  dataModelDiff
    .forEach((id) => {
      const cell = document.getElementById(id);
      const selected = cell.dataset.selected === 'true' ? 'false' : 'true';

      cell.setAttribute('data-selected', selected);
    });
}
