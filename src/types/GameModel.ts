import { InitialDataType, ViewPortSizeType } from './common';

export type DataModelType = number[][];
export type NeighboursIndices = number[][];
export type GenerationDiff = number[];
export type GenerationUpdateData = {
  generationDiff: GenerationDiff;
  generationState: number[];
};

export interface GameModelInterface {
  initialData: InitialDataType;
  xGridSize: ViewPortSizeType['xGridSize'];
  yGridSize: ViewPortSizeType['yGridSize'];
  dataModel: DataModelType;

  createDataModel(): DataModelType;
  resetDataModel(): DataModelType;
  calculateNextGenerationDiff(): GenerationUpdateData;
}
