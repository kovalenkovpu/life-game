import get from 'lodash/get';

export class GameModel {
  constructor(initialData) {
    this.initialData = initialData;
  }

  oneDimensionSize = null;

  previousDataModel = [];

  dataModel = [];

  generationDiff = [];

  createDataModel = () => {
    const dataModelMock = new Array(this.oneDimensionSize)
      .fill(new Array(this.oneDimensionSize).fill(0));

    this.dataModel = dataModelMock
      .map((row, i) => row.map((_, j) => {
        const id = `${i}-${j}`;

        return Number(this.initialData.includes(id));
      }));

    this.previousDataModel = [...this.dataModel];

    return this.dataModel;
  };

  resetDataModel = () => {
    this.dataModel = this.createDataModel();

    return this.dataModel;
  };

  getNeighboursIndices = (i, j) => {
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

  getSelectedCellNeighboursNumber = (i, j) => {
    const neighboursIndices = this.getNeighboursIndices(i, j);

    return neighboursIndices.reduce((acc, indices) => {
      const [currI, currJ] = indices;
      const cellData = get(get(this.dataModel, currI), currJ);

      // eslint-disable-next-line no-extra-boolean-cast
      if (Boolean(cellData)) {
        // eslint-disable-next-line no-param-reassign
        acc += 1;
      }

      return acc;
    }, 0);
  };

  calculateNextGeneration = () => {
    this.previousDataModel = [...this.dataModel];

    const currentGenerationData = this.dataModel
      .map(
        (_, i) => this.dataModel[i]
          .map((__, j) => this.getSelectedCellNeighboursNumber(i, j)),
      );

    this.dataModel = this.dataModel
      .map((_, i) => this.dataModel[i]
        .map((isAlive, j) => {
          const selectedNumber = currentGenerationData[i][j];

          if (!isAlive && selectedNumber === 3) {
            return 1;
          }

          if (isAlive) {
            return (selectedNumber === 2 || selectedNumber === 3)
              ? isAlive
              : 0;
          }

          return isAlive;
        }));

    return this.dataModel;
  };

  calculateNextGenerationDiff = () => {
    this.calculateNextGeneration();

    this.generationDiff = this.previousDataModel
      .reduce(
        (acc, _, i) => {
          const diffByRow = this.previousDataModel[i]
            .reduce((indices, alive, j) => {
              if (this.dataModel[i][j] !== alive) {
                indices.push(i * this.oneDimensionSize + j);
              }

              return indices;
            }, []);

          acc.push(...diffByRow);

          return acc;
        },
        [],
      );

    return this.generationDiff;
  };
}
