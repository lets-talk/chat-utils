export interface ObjectIndex<T> {
  [key:string]: T;
}

export type AppSettingsResult = {
  data: ExtendedAppData;
}

export type PayloadType = 'html' | 'json' | 'markdown' | 'lt-basic-container';
export type relationTypeX = 'LL' | 'LR' | 'RL' | 'RR';
export type relationTypeY = 'TT' | 'TB' | 'BT' | 'BB';

export type AppSize = {
  width: string;
  height: string;
}

export type Settings = {
  css: string;
  inlineCss: ObjectIndex<string>;
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

export type ExtendedAppData = App & {
  initialData: ObjectIndex<any>;
}