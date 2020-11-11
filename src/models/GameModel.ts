import get from 'lodash/get';

import { InitialDataType } from 'src/types/common';
import {
  DataModelType,
  GameModelInterface,
  GenerationDiff,
  NeighboursIndices,
} from 'src/types/GameModel';

export class GameModel implements GameModelInterface {
  constructor(public initialData: InitialDataType) { }

  xSize = 0;

  ySize = 0;

  previousDataModel: DataModelType = [[]];

  dataModel: DataModelType = [[]];

  generationDiff: GenerationDiff = [];

  private getNeighboursIndices = (i: number, j: number): NeighboursIndices => {
    const leftTopIndex = [i - 1, j - 1];
    const topIndex = [i - 1, j];
    const topRightIndex = [i - 1, j + 1];
    const leftIndex = [i, j - 1];
    const rightIndex = [i, j + 1];
    const bottomLeftIndex = [i + 1, j - 1];
    const bottomIndex = [i + 1, j];
    const bottomRightIndex = [i + 1, j + 1];

    const neighboursIndices: NeighboursIndices = [
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

  private getSelectedCellNeighboursNumber = (i: number, j: number): number => {
    const neighboursIndices = this.getNeighboursIndices(i, j);

    return neighboursIndices.reduce((acc, indices) => {
      const [currI, currJ] = indices;
      const cellData = get(get(this.dataModel, currI), currJ);

      if (cellData && cellData === 1) {
        return acc + 1;
      }

      return acc;
    }, 0);
  };

  private calculateNextGeneration = (): DataModelType => {
    this.previousDataModel = [...this.dataModel];

    const currentGenerationData: DataModelType = this.dataModel
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

  calculateNextGenerationDiff = (): GenerationDiff => {
    this.calculateNextGeneration();

    this.generationDiff = this.previousDataModel
      .reduce(
        (acc, _, i) => {
          const diffByRow = this.previousDataModel[i]
            .reduce<number[]>((indices, alive, j) => {
              if (this.dataModel[i][j] !== alive) {
                indices.push(i * this.xSize + j);
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

  createDataModel = (): DataModelType => {
    const dataModelTemplate = new Array<number[]>(this.ySize)
      .fill(new Array(this.xSize).fill(0));
    const dataModel: DataModelType = dataModelTemplate
      .map((row, i) => row.map((_, j) => {
        const id = `${i}-${j}`;

        return Number(this.initialData.includes(id));
      }));

    this.dataModel = dataModel;
    this.previousDataModel = [...this.dataModel];

    return this.dataModel;
  };

  resetDataModel = (): DataModelType => this.createDataModel();
}
