import { AppPosition, relationTypeY } from './types';
export type PayloadType = 'html' | 'json' | 'markdown' | 'lt-basic-container';
export type relationTypeX = 'LL' | 'LR' | 'RL' | 'RR';
export type relationTypeY = 'TT' | 'TB' | 'BT' | 'BB';

export type ObjectIndex = {
  [key:string]: string;
}

export type AppSize = {
  width: string;
  height: string;
}

export type Settings = {
  css: string;
  inlineCss: ObjectIndex;
  position: AppPosition;
  size: AppSize;
}

export type Position = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export enum HTMLFloatType {
  fixed = "fixed",
  default = "default"
};

export type offsetX = {
  relationType: relationTypeX;
  value: number;
}

export type offsetY = {
  relationType: relationTypeY;
  value: number;
}

export type RelativeToElementPosition = {
  type: 'relative-to-element';
  payload: {
    relativeId: string;
    floatType: HTMLFloatType;
    offsetX: offsetX,
    offsetY: offsetY,
  }
}

export type RelativeToPlacePosition = {
  type: 'relative-to-position';
  payload: {
    positionId: string;
    offset: Position,
  }
}

export type FixedToTopPosition = {
  type: 'fixed-to-top-position';
  payload: {
    offset: Position,
  }
}

export type AppPosition =
  RelativeToElementPosition |
  RelativeToPlacePosition |
  FixedToTopPosition;

export type App = {
  id: number;
  name: string;
  payload_type: PayloadType;
  payload: string;
  settings: Settings;
  organization_id: Number;
  source: string;
}

export type Size = {
  width: number;
  height: number;
}

export type GridCell = {
  id: string;
  apps: App[];
  position: Position;
  size: Size;
}

export type GridSettings = {
  columns: number;
  gutter: number;
  padding: number;
  positions: string[];
}

export type Grid<T> = {
  settings: GridSettings;
  cells: T[];
}

export interface AddAppsStrategy {
  add(app: App, apps: App[]): App[];
}

export interface PositionStrategy {
  getPositionProps(app: App, cell?: GridCell): ObjectIndex;
  shouldAddNewPosition(): boolean;
  mountStrategy(): AddAppsStrategy;
}

export type PromisedFunction = (appId: number) => Promise<any>;

export const makeHTMLFloatType = (rawString: string): HTMLFloatType => {
  switch (rawString) {
    case HTMLFloatType.fixed:
    case HTMLFloatType.default:
      return rawString;

    default:
      throw Error('Invalid float type');
  }
}
