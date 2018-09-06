import { AppPosition } from './types';
export type PayloadType = 'html' | 'json';

export type ObjectIndex = {
  [key:string]: string;
}

export type Settings = {
  css: string;
  inlineCss: ObjectIndex;
  position: AppPosition;
}

export type Position = {
  x: number;
  y: number;
}

export enum HTMLFloatType {
  fixed = "fixed",
  default = "default"
};

export type RelativeToElementPosition = {
  type: 'relative-to-element';
  payload: {
    relativeId: string;
    floatType: HTMLFloatType;
    offset: {
      x: number;
      y: number;
    },
  }
}

export type RelativeToPlacePosition = {
  type: 'relative-to-position';
  payload: {
    positionId: string;
    offset: {
      x: number;
      y: number;
    },
  }
}

export type FixedToTopPosition = {
  type: 'fixed-to-top-position';
  payload: {
    offset: {
      x: number;
      y: number;
    },
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

export type Grid = {
  settings: GridSettings;
  cells: GridCell[];
}

export interface AddAppsStrategy {
  add(app: App, apps: App[]): App[];
}

export interface PositionStrategy {
  getPositionProps(app: App, cell?: GridCell): ObjectIndex;
  shouldAddNewPosition(): boolean;
}

export const makeHTMLFloatType = (rawString: string): HTMLFloatType => {
  switch (rawString) {
    case HTMLFloatType.fixed:
    case HTMLFloatType.default:
      return rawString;

    default:
      throw Error('Invalid float type');
  }
}
