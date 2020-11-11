import { InitialDataType } from './common';

export type DataModelType = number[][];
export type NeighboursIndices = number[][];
export type GenerationDiff = number[];

export interface GameModelInterface {
  initialData: InitialDataType;
  xSize: number;
  ySize: number;
  previousDataModel: DataModelType;
  dataModel: DataModelType;
  generationDiff: GenerationDiff;

  createDataModel(): DataModelType;
  resetDataModel(): DataModelType;
  calculateNextGenerationDiff(): GenerationDiff
}
