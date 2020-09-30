import {
  HTMLFloatType,
  rectPosition,
  WidgetSizeOffset,
  relationTypeX,
  relationTypeY,
  UrlSourceParams,
  IframeType,
} from "../types";
import { forEach } from "lodash";

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

