import { GRID_CLASS_NAME } from 'src/constants/classes';

export function cellClickObserver() {
  const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

  existingGrid.addEventListener('click', (event) => {
    const { target: element } = event;

    if (element.dataset.type === 'cell') {
      const cell = existingGrid.querySelector(`[data-id="${element.dataset.id}"]`);
      const selected = element.dataset.selected === 'true' ? 'false' : 'true';

      cell.dataset.selected = selected;
    }
  });
}
