import reduce from 'lodash/reduce';
import {
  rectPosition,
  WidgetSizeOffset,
  relationTypeX,
  relationTypeY,
  UrlSourceParams,
  IframeType,
  WidgetType,
  ReferenceToFloat,
  WidgetSize,
} from "../types";
import forEach from "lodash/forEach";

const WIDGET_ELEVATIONS = {
  [1]: '0 -5px 10px rgba(0,0,0,.2)',
  [2]: '0 -6px 12px rgba(0,0,0,.3)',
  [3]: '0 -8px 15px rgba(0,0,0,.4)',
  box: '10px 10px 15px rgba(0,0,0,.2)'
}

export const removeNodeRef = (ref: HTMLElement): any => {
  try {
    ref.remove();
  } catch(e) {
    throw new Error(e)
  }
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
  animate: string | false;
}

export const serializeBorderRadius = (
  borderRadius: string | number, fallback: string | boolean
): string | boolean => {
  return borderRadius ? typeof(borderRadius) === 'number' ?
    `${borderRadius}px` : borderRadius : fallback
}

export const getPositionRelativeToViewport = (props): RelativePositionProps => {
  const {
    rect,
    size,
    offset,
    display,
    styles,
    elevation,
    fullSize,
    animate,
    zIndex,
    borderRadius
  } = props

  const relativePosition = getRelativePosition(rect, offset)
  const transformToCssKey = fullSize ?
    { top: 0, left: 0 } : reduce(relativePosition,
    (acc, val, key) => !!val ? {...acc, [key]:`${val}px`} : acc
  , {})

  return {
    ...styles,
    ...transformToCssKey,
    position: display === `${ReferenceToFloat.default}` ? 'relative' : display,
    width: `${fullSize ? window.innerWidth : size.width}px`,
    height: `${fullSize ? window.innerHeight : size.height}px`,
    ['z-index']: zIndex ? `${zIndex}` : 'inherit',
    ['border-radius']: serializeBorderRadius(borderRadius, '0') as string,
    ['box-shadow']: elevation && WIDGET_ELEVATIONS[elevation] ?
      WIDGET_ELEVATIONS[elevation]: 'none',
    transition: animate ? animate : 'none'
  }
}

export const getRelativePosition = (
  gridDimensions: rectPosition,
  relativeOffset: WidgetSizeOffset
): rectPosition => {
  const { top, right, bottom, left } = gridDimensions;
  const { innerHeight, innerWidth } = window;

  let offset: rectPosition = {
    top: null, bottom: null, left: null, right: null
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

export const updateWidgetNode = (ref: Node) => {

}