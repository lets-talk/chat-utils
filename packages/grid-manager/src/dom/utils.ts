import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import {
  rectPosition,
  WidgetSizeOffset,
  relationTypeX,
  relationTypeY,
  UrlSourceParams,
  IframeType,
  WidgetType,
  ReferenceToFloat,
  WidgetSize
} from '../types';

// this is max z-index valid in equal to 32bits val
export const BASE_Z_INDEX = '2147483647'


export const WIDGET_ELEVATIONS = {
  [1]: '0 -5px 10px rgba(0,0,0,.2)',
  [2]: '0 -6px 12px rgba(0,0,0,.3)',
  [3]: '0 -8px 15px rgba(0,0,0,.4)',
  center: '0 0 20px rgba(0,0,0,.25)'
};

export const removeNodeRef = (ref: HTMLElement): any => {
  try {
    ref.remove();
    return true;
  } catch (e) {
    return e
  }
};

export const elementById = (id: string, dom = document): HTMLElement => {
  const element = dom.getElementById(id);
  if (element === null) {
    throw new Error(`Can not find the dom element with id: ${id}`);
  }
  return element;
};

export const getElementDomPosition = (elementId: string): DOMRect => {
  const element = elementById(elementId);
  const positionInfo = element.getBoundingClientRect();

  return positionInfo;
};

export const getElementPositionFixed = (elementId: string): rectPosition => {
  return getElementDomPosition(elementId);
};

export const getElementPositionDefault = (elementId: string, w = window): rectPosition => {
  const domPosition = getElementDomPosition(elementId);

  return {
    top: Math.floor(domPosition.top + w.scrollY),
    right: domPosition.right,
    bottom: domPosition.bottom,
    left: Math.floor(domPosition.left + w.scrollX)
  };
};

export const getElementPosition = (
  elementId: string,
  elementFloatType: ReferenceToFloat
): rectPosition => {
  switch (elementFloatType) {
    case ReferenceToFloat.default:
      return getElementPositionDefault(elementId);
    case ReferenceToFloat.fixed:
      return getElementPositionFixed(elementId);
  }
};

export const serializeBorderRadius = (
  borderRadius: string | number,
  fallback: string | boolean
): string | boolean => {
  return borderRadius
    ? typeof borderRadius === 'number'
      ? `${borderRadius}px`
      : borderRadius
    : fallback;
};

export const resetNodeToAbsolutePosition = (el: HTMLElement) => {
  const toReset = ['top', 'right', 'bottom', 'left'];
  const toUpdate = {
    top: '0px',
    right: '0px',
    position: 'absolute',
    width: '100%',
    height: '100%'
  };

  toReset.forEach((rule) => el.style.removeProperty(rule));
  forEach(toUpdate, (value, key) => el.style.setProperty(key, value));

  return el;
};

export const generateParentContainer = (
  className: string,
  frame: any,
  animation: string,
  zIndex?: number
) => {
  const { top, right, bottom, left, display, animate, height, width } = frame;
  return generateDomElement(
    className,
    'div',
    {
      // passing the widget rules to the frame
      position: display,
      transition: animate ? animation : 'none',
      ...{ width, height },
      ...[{ top }, { right }, { bottom }, { left }].reduce((acc, val) => {
        return val ? { ...acc, ...val } : acc;
      }, {}),
      // this make the magic of making the div pass through
      ['pointer-events']: 'none',
      ['z-index']: zIndex ? `${zIndex}` : BASE_Z_INDEX
    },
    null
  );
};

export type RelativeAppPositionProps = {
  addonSize: WidgetSize;
  parentSize: rectPosition & WidgetSize;
  offset: WidgetSizeOffset;
  display: ReferenceToFloat;
  styles: { [key: string]: string };
  borderRadius: string;
  zIndex: number;
  elevation: number;
};

export const getPositionRelativeToApp = (props: RelativeAppPositionProps) => {
  const {
    addonSize,
    parentSize,
    offset,
    styles,
    borderRadius,
    zIndex,
    elevation
  } = props;

  const relativePosition = getRelativePositionToApp(addonSize, parentSize, offset);
  const transformToCssKey = reduce(
    relativePosition,
    (acc, val, key) => (val !== null ? { ...acc, [key]: `${val}px` } : acc),
    {}
  );

  return {
    ...styles,
    ...transformToCssKey,
    position: 'absolute',
    width: `${addonSize.width}px`,
    height: `${addonSize.height}px`,
    ['z-index']: zIndex ? `${zIndex}` : 'inherit',
    ['border-radius']: borderRadius,
    ['box-shadow']:
      elevation && WIDGET_ELEVATIONS[elevation]
        ? WIDGET_ELEVATIONS[elevation]
        : 'none',
    // force the iframe to catch all the clicks events
    ['pointer-events']: 'all'
  };
};

export const getRelativePositionToApp = (
  size: WidgetSize,
  parent: WidgetSize,
  relativeOffset: WidgetSizeOffset
): rectPosition => {
  let offset: rectPosition = {
    top: null,
    bottom: null,
    left: null,
    right: null
  };

  switch (relativeOffset.x.relationType) {
    case relationTypeX.LL:
      offset.left = relativeOffset.x.value;
      break;
    case relationTypeX.LR:
      offset.right = (size.width - relativeOffset.x.value) *-1;
      break;
    case relationTypeX.RL:
      offset.left = (size.width - relativeOffset.x.value) *-1;
      break;
    case relationTypeX.RR:
      offset.right = relativeOffset.x.value;
      break;
    default:
      return offset;
  }

  switch (relativeOffset.y.relationType) {
    case relationTypeY.TT:
      offset.top = relativeOffset.y.value;
      break;
    case relationTypeY.BT:
      offset.top = (size.height + relativeOffset.y.value) *-1;
      break;
    case relationTypeY.TB:
      offset.bottom = (size.height + relativeOffset.y.value) *-1;
      break
    case relationTypeY.BB:
      offset.bottom = relativeOffset.y.value;
      break;
    default:
      return offset;
  }

  return offset;
};

export type RelativePositionProps = {
  rect: rectPosition;
  size: WidgetSize;
  offset: WidgetSizeOffset;
  display: ReferenceToFloat;
  styles: { [key: string]: string };
  elevation: number;
  fullSize: boolean;
  animate: string | false;
  borderRadius: boolean | string | number;
  zIndex: number;
};

export const getPositionRelativeToViewport = (props: RelativePositionProps) => {
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
  } = props;

  const relativePosition = getRelativePosition(rect, offset);
  const transformToCssKey = fullSize
    ? { top: 0, left: 0 }
    : reduce(
        relativePosition,
        (acc, val, key) => (val !== null ? { ...acc, [key]: `${val}px` } : acc),
        {}
      );
  const parseBorderRadius =
    borderRadius && typeof borderRadius !== 'boolean'
      ? (serializeBorderRadius(borderRadius, '0') as string)
      : 'none';

  return {
    ...styles,
    ...transformToCssKey,
    // I don't if make possible change the position value from the setting (see line below) or defined that always is fixed like now, in this casemake totally sense because the position is relative to the viewport no the page content aka fixed
    position: 'fixed',
    // position: display === `${ReferenceToFloat.fixed}` ? 'relative' : display,
    width: `${fullSize ? window.innerWidth : size.width}px`,
    height: `${fullSize ? window.innerHeight : size.height}px`,
    ['z-index']: zIndex ? `${zIndex}` : 'inherit',
    ['border-radius']: parseBorderRadius,
    ['box-shadow']:
      elevation && WIDGET_ELEVATIONS[elevation]
        ? WIDGET_ELEVATIONS[elevation]
        : 'none',
    transition: animate ? animate : 'none',
    // force the iframe to catch all the clicks events
    ['pointer-events']: 'all'
  };
};

export const getRelativePosition = (
  gridDimensions: rectPosition,
  relativeOffset: WidgetSizeOffset,
): rectPosition => {
  const { top, right, bottom, left } = gridDimensions;
  const { innerHeight, innerWidth } = window;

  let offset: rectPosition = {
    top: null,
    bottom: null,
    left: null,
    right: null
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
      return offset;
  }

  switch (relativeOffset.y.relationType) {
    case relationTypeY.TT:
      offset.top = top + relativeOffset.y.value;
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
      return offset;
  }

  return offset;
};

export const generateUrlFromParams = (
  urlParams: UrlSourceParams,
  slugKey = 'appName',
): URL => {
  const { src, extra } = urlParams;
  const url = new URL(src);
  const params = new URLSearchParams(url.search);

  params.append(slugKey, extra.slug);
  if (extra.params) {
    forEach(extra.params, (v, k) => params.append(v, k));
  }

  url.search = params.toString();
  return url;
};

export const generateDomElement = (
  id: string,
  element: WidgetType,
  styles: { [key: string]: string } | null,
  iframeSettings: {
    src: string;
    type?: IframeType;
  } | null,
  className?: string
): HTMLDivElement | HTMLIFrameElement => {
  const src = iframeSettings ? iframeSettings.src : undefined;
  const type = iframeSettings ? iframeSettings.type : undefined;
  const el = document.createElement(element);

  el.id = id;
  el.className = className ? className : '';

  if (element === 'iframe') {
    (el as HTMLIFrameElement).src = src;
  }

  if (
    element === 'iframe' &&
    type &&
    ['lt-basic-container-multimedia', 'lt-webrtc'].indexOf(type) !== -1
  ) {
    (el as HTMLIFrameElement).allow = 'microphone *; camera *';
  }

  if (styles) {
    forEach(styles, (value, key) => el.style.setProperty(key, value));
  }

  return el as any;
};

export const appendNodeToParent = (parent: Node, children: Node): Node =>
  parent.appendChild(children);

// export const updateWidgetNode = (ref: Node) => {};
