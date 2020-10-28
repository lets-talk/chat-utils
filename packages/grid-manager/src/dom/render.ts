import {
  WidgetRelativePosition,
  WidgetType,
  UrlSourceParams,
  WidgetSize,
  IframeType,
  WidgetDimensions,
  ReferencePosition,
  WidgetToRender
} from "../types";
import { RELATIVE_RENDER_POSITION } from "../grid/utils";
import {
  generateUrlFromParams,
  generateDomElement,
  appendNodeToParent
} from "./utils";

const IFRAME_BASIC_STYLES = {
  width: '100%',
  height: '100%',
  border: 'none'
}

const WRAPPER_DIV_STYLES = {
  display: 'block',
  padding: '0',
  margin: '0',
  border: 'none',
}

const CONTAINER_FRAME_STYLES = {
  position: 'fixed',
  overflow: 'hidden!important',
  opacity: '1!important'
}

export const createWindowBlankWidget = (
  id: string,
  urlParams: UrlSourceParams,
  size: WidgetSize,
  windowName = 'popup',
  windowFeatures = 'scrollbars=no,resizable=no'
): Window | Error => {
  const url = generateUrlFromParams(urlParams);
  try{
    return window.open(
      url.href,
      `${id}-${windowName}`,
      `width=${size.width},height=${size.height},${windowFeatures}`
    );
  } catch(e) {
    throw Error(e)
  }
}

export const makePostionStrategy = (type: WidgetRelativePosition): Promise<any> => {
  switch (type) {
    case RELATIVE_RENDER_POSITION.toDomEl:
      return new Promise(res => {})
    case RELATIVE_RENDER_POSITION.toViewport:
      return new Promise(res => {})
    case RELATIVE_RENDER_POSITION.toApp:
      return new Promise(res => {})
    case RELATIVE_RENDER_POSITION.toCenter:
      return new Promise(res => {})
    default:
      throw Error('Invalid position type configuration review app settings');
  }
}

export const createIframeWidget = async (
  id: string,
  urlParams: UrlSourceParams,
  position: ReferencePosition,
  dimensions: WidgetDimensions,
  iframeType: IframeType | undefined,
): Promise<HTMLDivElement> => {
  const {relation, reference, element} = position;
  const {size, styles, fullSize, animate, elevation, offset} = dimensions;
  // generate iframe src url
  const url = generateUrlFromParams(urlParams);
  // create empty wrapper div
  const wrapperEl = generateDomElement(
    `lt-app-container-${id}`,
    'div',
    WRAPPER_DIV_STYLES,
    null,
  );
  // generate container iframe div and pass css rules
  const baseContainerStyles = {
    ...CONTAINER_FRAME_STYLES,
    width: `${fullSize ? window.innerWidth : size.width}px`,
    height: `${fullSize ? window.innerHeight : size.height}px`,
  };
  const containerEl = generateDomElement(
    `lt-app-frame-${id}`,
    'div',
    styles ? baseContainerStyles : {...baseContainerStyles, ...styles},
    null,
  );
  // generate iframe and insert src url
  const iframeEl = generateDomElement(
    `lt-app-iframe-${id}`,
    'iframe',
    IFRAME_BASIC_STYLES,
    {src: url.href, type: iframeType}
  )

  // map dom elements and return widget in body node
  try {
    const wrappedIframe =  appendNodeToParent(containerEl, iframeEl)
    const widgetWrapper =  appendNodeToParent(wrapperEl, wrappedIframe)
    return appendNodeToParent(document.body, widgetWrapper) as HTMLDivElement
  } catch(e) {
    throw Error(e)
  }
}

export const renderWidgetElement = ({...args}: WidgetToRender): Promise<HTMLDivElement> | Window | Error => {
  const {id, kind, url, dimensions, iframeType, position} = args;
  switch(kind) {
    case 'iframe':
      return createIframeWidget(id, url, position, dimensions, iframeType);
    case 'blank':
      return createWindowBlankWidget(id, url, dimensions.size);
    // The div case will be supported in the near future
    case 'div':
    default:
      return new Error('Invalid WidgetType review app settings')
  }
}