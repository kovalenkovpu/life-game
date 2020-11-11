import { InitialDataType } from './common';
import { ViewPortSizeType } from './GameView';

export type DataModelType = number[][];
export type NeighboursIndices = number[][];
export type GenerationDiff = number[];

export interface GameModelInterface {
  initialData: InitialDataType;
  xGridSize: ViewPortSizeType['xGridSize'];
  yGridSize: ViewPortSizeType['yGridSize'];
  dataModel: DataModelType;

  createDataModel(): DataModelType;
  resetDataModel(): DataModelType;
  calculateNextGenerationDiff(): GenerationDiff
}
