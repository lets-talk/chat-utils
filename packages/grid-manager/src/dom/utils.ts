import reduce from 'lodash/reduce';
import {
  HTMLFloatType,
  rectPosition,
  WidgetSizeOffset,
  relationTypeX,
  relationTypeY,
  UrlSourceParams,
  IframeType,
  WidgetToRender,
  ReferenceToGridPosition,
  WidgetDimensions,
  WidgetType,
  ReferenceToFloat,
  TilePosition,
  WidgetSize,
} from "../types";
import forEach from "lodash/forEach";
import { ExtendedWidgetsRules } from "../widgetsMachine/machine";

const WIDGET_ELEVATIONS = {
  [1]: '0 -5px 10px rgba(0,0,0,.2)',
  [2]: '0 -6px 12px rgba(0,0,0,.3)',
  [3]: '0 -8px 15px rgba(0,0,0,.4)',
  box: '10px 10px 15px rgba(0,0,0,.2)'
}

export const elementById = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (element === null) throw Error('Can not find the dom element with id: ' + id);
  return element;
}

export const getElementDomPosition = (elementId: string): DOMRect => {
  const element = elementById(elementId);
  const positionInfo = element.getBoundingClientRect();

  return positionInfo;
}

export const getElementPositionFixed = (elementId: string): rectPosition => {
  const domPosition = getElementDomPosition(elementId);
  return domPosition;
}

export const getElementPositionDefault = (elementId: string): rectPosition => {
  const domPosition = getElementDomPosition(elementId);

  return {
    top: Math.floor(domPosition.top + window.scrollY),
    right: domPosition.right,
    bottom: domPosition.bottom,
    left: Math.floor(domPosition.left + window.scrollX),
  };
}

export const getElementPosition = (elementId: string, elementFloatType: ReferenceToFloat): rectPosition => {
  switch (elementFloatType) {
    case ReferenceToFloat.default:
      return getElementPositionDefault(elementId);
    case ReferenceToFloat.fixed:
      return getElementPositionFixed(elementId);
  }
}

export type RelativePositionProps = {
  rect: rectPosition;
  size: WidgetSize;
  offset: WidgetSizeOffset;
  display: ReferenceToFloat;
  styles: {[key:string]: string}
  elevation: number;
  fullSize: boolean;
}
export const getPositionRelativeToViewport = (payload): RelativePositionProps => {
  const {
    rect,
    size,
    offset,
    display,
    styles,
    elevation,
    fullSize
  } = payload

  const relativePosition = getRelativePosition(rect, offset)
  const transformToCssKey = reduce(relativePosition,
    (acc, val, key) => !!val ? {...acc, [key]:`${val}px`} : acc
  , {})

  return {
    ...styles,
    ...transformToCssKey,
    position: display === `${ReferenceToFloat.default}` ? 'relative' : display,
    width: `${fullSize ? window.innerWidth : size.width}px`,
    height: `${fullSize ? window.innerHeight : size.height}px`,
    ['box-shadow']: elevation && WIDGET_ELEVATIONS[elevation] ?
      WIDGET_ELEVATIONS[elevation]: 'none',
  }
}

export const getRelativePosition = (
  domElement: rectPosition,
  relativeOffset: WidgetSizeOffset
): rectPosition => {
  const { top, right, bottom, left } = domElement;
  const { innerHeight, innerWidth } = window;

  let offset: rectPosition = {
    top: 0, bottom: 0, left: 0, right: 0
  };

  switch (relativeOffset.x.relationType) {
    case relationTypeX.LL:
      offset.left = left + relativeOffset.x.value;
      break;
    case relationTypeX.LR:
      offset.left = right + relativeOffset.x.value;
      break;
    case relationTypeX.RL:
      offset.right = innerWidth - left + relativeOffset.x.value;
      break;
    case relationTypeX.RR:
      offset.right = innerWidth - right + relativeOffset.x.value;
      break;
    default:
      return offset
  }

  switch (relativeOffset.y.relationType) {
    case relationTypeY.TT:
      offset.top = top + relativeOffset.y.value
      break;
    case relationTypeY.TB:
      offset.top = bottom + relativeOffset.y.value;
      break;
    case relationTypeY.BT:
      offset.bottom = innerHeight - top + relativeOffset.y.value;
      break;
    case relationTypeY.BB:
      offset.bottom = innerHeight - bottom + relativeOffset.y.value;
      break;
    default:
      return offset
  }

  return offset;
}

export const generateUrlFromParams = (
  urlParams: UrlSourceParams,
  slugKey = 'appName'
): URL => {
  const { src, extra } = urlParams;
  const url = new URL(src);
  const params = new URLSearchParams(url.search);

  params.append(slugKey, extra.slung);
  if(extra.params) {
    forEach(extra.params, (v, k) => params.append(v, k));
  }

  url.search = params.toString();
  return url;
}

export const generateDomElement = (
  id: string,
  element: WidgetType,
  styles: {[key:string]: string} | null,
  iframeSettings: {
    src: string
    type?: IframeType,
  } | null,
  className?: string,
): HTMLDivElement | HTMLIFrameElement => {
  const src = iframeSettings ? iframeSettings.src : undefined;
  const type = iframeSettings ? iframeSettings.type : undefined;
  const el = document.createElement(element);

  el.id = id;
  el.className = className ? className : '';

  if(element === 'iframe') {
    (el as HTMLIFrameElement).src = src;
  }

  if(element === 'iframe' && type && ["lt-basic-container-multimedia",  "lt-webrtc"].indexOf(type) !== -1) {
    (el as HTMLIFrameElement).allow = "microphone *; camera *";
  }

  if(styles) {
    forEach(styles, (value,key) => el.style.setProperty(key, value))
  }

  return el as any
}

export const appendNodeToParent = (parent: Node, children: Node): Node => (
  parent.appendChild(children)
)

export const validateIframeWidgetWithProps = (
  list: WidgetToRender[],
  widget: ExtendedWidgetsRules,
  positions: ReferenceToGridPosition[],
  breakpoint: string,
  usedPositions: ReferenceToGridPosition[]
) => {
  const returnWidgetsList = {
    list,
    position: null,
    requireFullSize: false
  }
  const dimensions = widget.dimensions[breakpoint];
  // if the widget don't need to be render return the prev list
  if(dimensions === null) return returnWidgetsList;
  // if the position doesn't exit for the active breakpoint return list
  if(
    widget.position.relation === 'relative-to-viewport' &&
    positions.indexOf(widget.position.reference) === -1
  ) {
    return returnWidgetsList
  }
  // if the position is duplicated return list
  if(usedPositions.indexOf(widget.position.reference) !== -1) {
    return returnWidgetsList
  }

  const isFullSize = dimensions.fullSize ? dimensions.fullSize : false;
  const widgetToRender = mapWidgetToRenderProps(
    widget, dimensions, dimensions.fullSize
  );

  return {
    list: [...list, widgetToRender],
    position: widget.position.reference,
    fullSize: isFullSize
  } as unknown as {
    list: WidgetToRender[];
    position: ReferenceToGridPosition | null;
    requireFullSize: boolean;
  }
}

export const mapWidgetToRenderProps = (
  widget: ExtendedWidgetsRules,
  dimensions: WidgetDimensions,
  fullSize = false,
  ): WidgetToRender => ({
    id: widget.id,
    isFullSize: fullSize,
    kind: widget.kind,
    url: {
      src: widget.src,
      extra: widget.extra
    },
    dimensions,
    iframeType: widget.iframeType,
    position: widget.position
})