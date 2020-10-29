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
} from "../types";
import forEach from "lodash/forEach";
import { ExtendedWidgetsRules } from "../widgetsMachine/machine";

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

export const getElementPosition = (elementId: string, elementFloatType: HTMLFloatType): rectPosition => {
  switch (elementFloatType) {
    case HTMLFloatType.default:
      return getElementPositionDefault(elementId);
    case HTMLFloatType.fixed:
      return getElementPositionFixed(elementId);
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
  element: 'div' | 'iframe',
  styles: {[key:string]: string} | null,
  iframeSettings: {
    src: string
    type?: IframeType,
  } | null,
  className?: string,
): HTMLDivElement | HTMLIFrameElement => {
  const {src, type} = iframeSettings;
  const el = document.createElement(element);

  el.id = id;
  el.className = className ? className : '';

  if(element === 'iframe') {
    (el as HTMLIFrameElement).src = src;
  }

  if(type && ["lt-basic-container-multimedia",  "lt-webrtc"].indexOf(type) !== -1) {
    (el as HTMLIFrameElement).allow = "microphone *; camera *";
  }

  if(styles) {
    forEach(styles, (v,k) => el.style.setProperty(v, k))
  }

  return el
}

export const appendNodeToParent = (parent: Node, children: Node): Node => (
  parent.appendChild(children)
)

export const mapWidgetToRenderProps = (
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
  const widgetToRender: WidgetToRender=  {
    id: widget.id,
    isFullSize: dimensions.fullSize ? dimensions.fullSize : false,
    kind: widget.kind,
    url: {
      src: widget.src,
      extra: widget.extra
    },
    dimensions,
    iframeType: widget.iframeType,
    position: widget.position
  }

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