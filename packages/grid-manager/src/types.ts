export type GridBreakpoints = {
  small: [number, number];
  medium: [number, number];
  large: [number, number | null];
}

export type GridSettings = {
  columns: number;
  rows: number;
  positions: ReferenceToGridPosition[];
}

export type TilePosition= {
  [key in ReferenceToGridPosition]: {
    left: number;
    right: number;
    top: number;
    bottom: number
  }
}

export type GridPositionsInViewport = {
  tileSize: {
    width: number;
    height: number;
  }
  positions: TilePosition,
  availablePosition: number;
  renderedWidgetsIds: string[];
}

export type rectPosition = {
  left: number;
  right: number;
  top: number;
  bottom: number
}

export enum HTMLFloatType {
  fixed = "fixed",
  default = "default"
};

export type WidgetRelativePosition =
'relative-to-viewport' |
'relative-to-dom-element' |
'relative-to-app' |
'relative-to-center';

export type WidgetType = 'iframe' | 'div' | 'blank';

export type IframeType =
  'lt-basic-container-multimedia' |
  'lt-webrtc';

export type UrlSourceParams = {
  src: string | null;
  extra: {
    slung: string;
    params?: {[key: string]: string};
  };
}

export enum relationTypeX {
  LL = 'LL',
  LR = 'LR',
  RL = 'RL',
  RR = 'RR'
};

export enum relationTypeY {
  TT = 'TT',
  TB = 'TB',
  BT = 'BT',
  BB = 'BB'
};

export enum ReferenceToGridPosition {
  top = 'top',
  mid = 'mid',
  bottom ='bottom',
  topLeft = 'top-left',
  topCenter = 'top-center',
  topRight= 'top-right',
  midLeft= 'mid-left',
  midCenter = 'mid-center',
  midRight = 'mid-right',
  bottomLeft = 'bottom-left',
  bottomCenter ='bottom-center',
  bottomRight = 'bottom-right',
}

export enum ReferenceToFloat {
  fixed ='fixed',
  default = 'default'
}

export type offsetX = {
  relationType: relationTypeX;
  value: number;
}

export type offsetY = {
  relationType: relationTypeY;
  value: number;
}

export type WidgetSize = {
  width: number;
  height: number;
}

export type WidgetSizeOffset = {
  x: offsetX;
  y: offsetY;
}

export type ReferencePosition = {
  relation: WidgetRelativePosition;
  reference: ReferenceToGridPosition | ReferenceToFloat;
  element?: string; // ex #action-button | chat-widget
}

export type WidgetDimensions = {
  [key in 'mobile' | 'tablet' | 'web']: {
    fullSize?: boolean;
    animate?: boolean;
    elevation?: number;
    styles: WidgetStyles;
    size: WidgetSize | null;
    offset: WidgetSizeOffset | null;
  } | null;
};

export type WidgetRules = {
  id: string;
  extra: {
    slung: string;
    params?: {[key: string]: string};
  };
  src: string | null;
  kind: WidgetType;
  position: ReferencePosition;
  dimensions: WidgetDimensions;
}

// generic css styles types
// See CSS 3 CSS-wide keywords https://www.w3.org/TR/css3-values/#common-keywords
// See CSS 3 Explicit Defaulting https://www.w3.org/TR/css-cascade-3/#defaulting-keywords
// "all CSS properties can accept these values"
type CSSWideKeyword = "initial" | "inherit" | "unset";

// This interface is not complete. Only properties accepting
// unitless numbers are listed here (see CSSProperty.js in React)
// to see the complete spec review the definition file
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts
export type WidgetStyles = {
  // flexbox styles props
  /**
 * Defines how the browser distributes space between and around flex items
 * along the main-axis of their container.
 * See CSS justify-content property https://www.w3.org/TR/css-flexbox-1/#justify-content-property
 */
  alignContent?: CSSWideKeyword | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
  alignItems?: CSSWideKeyword | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  alignSelf?: CSSWideKeyword | "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justifyContent?: CSSWideKeyword | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  layoutGrid?: CSSWideKeyword | any;
  layoutGridChar?: CSSWideKeyword | any;
  layoutGridLine?: CSSWideKeyword | any;
  layoutGridMode?: CSSWideKeyword | any;
  layoutGridType?: CSSWideKeyword | any;
  // general styles props
  backgroundColor?: CSSWideKeyword | any;
  backgroundImage?: CSSWideKeyword | any;
  position?: CSSWideKeyword | any;
  borderTop?: CSSWideKeyword | any;
  borderBottom?: CSSWideKeyword | any;
  borderRight?: CSSWideKeyword | any;
  borderLeft?: CSSWideKeyword | any;
  opacity?: CSSWideKeyword | any;
};