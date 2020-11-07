import { GRID_CLASS_NAME } from 'src/constants/common';

export function cellClickObserver() {
  const existingGrid = document.body.querySelector(`.${GRID_CLASS_NAME}`);

  existingGrid.addEventListener('click', (event) => {
    const { target: element } = event;

    if (element.dataset.type === 'cell') {
      const selected = element.dataset.selected === 'true' ? 'false' : 'true';

      element.dataset.selected = selected;
    }
  });
}
