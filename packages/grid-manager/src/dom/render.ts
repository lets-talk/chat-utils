import {
  WidgetRelativePosition,
  WidgetType,
  UrlSourceParams,
  WidgetSize,
  IframeType,
  WidgetDimensions,
  ReferencePosition,
  WidgetToRender,
  GridPositionsInViewport,
  rectPosition,
  WidgetReference,
  ReferenceToGridPosition
} from "../types";
import { RELATIVE_RENDER_POSITION } from "../grid/utils";
import {
  generateUrlFromParams,
  generateDomElement,
  appendNodeToParent,
  getPositionRelativeToViewport
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
  overflow: 'hidden!important',
  opacity: '1!important'
}

const WIDGET_ANIMATIONS = {
  linear: 'all .2s linear',
  ease: 'all 0.2s ease'
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

export const makePositionStrategy = (
  type: WidgetRelativePosition,
  data: any
): any => {
  switch (type) {
    case RELATIVE_RENDER_POSITION.toDomEl:
      return false
    case RELATIVE_RENDER_POSITION.toViewport:
      return getPositionRelativeToViewport(data)
    case RELATIVE_RENDER_POSITION.toApp:
      return false
    case RELATIVE_RENDER_POSITION.toCenter:
      return false
    default:
      throw Error('Invalid position type configuration review app settings');
  }
}

export const createIframeWidget = (
  id: string,
  urlParams: UrlSourceParams,
  position: ReferencePosition,
  dimensions: WidgetDimensions,
  iframeType: IframeType | undefined,
  kind: WidgetType,
  viewportPositions: GridPositionsInViewport,
  breakpoint: string
): any => {
  const {positions, availablePosition, tileSize} = viewportPositions;
  const {relation, display, reference, element} = position;
  const {size, styles, fullSize, animate, elevation, offset} = dimensions;
  // generate iframe src url
  const url = generateUrlFromParams(urlParams);
  // create empty wrapper div
  const wrapperEl = generateDomElement(
    `lt-app-container-${id}`,
    'div',
    {
      ...WRAPPER_DIV_STYLES,
      transition: animate ? WIDGET_ANIMATIONS.ease : 'none'
    },
    null,
  );

  const framePosition = makePositionStrategy(relation, {
    rect: positions[reference as ReferenceToGridPosition] as rectPosition,
    size,
    offset,
    display,
    styles,
    elevation,
    fullSize,
    animate: animate ? WIDGET_ANIMATIONS.ease : false
  })

  if(!framePosition) {
    throw new Error('invalid position')
  }

  const containerElClass = `lt-app-frame-${id}`
  const containerEl = generateDomElement(
    containerElClass,
    'div',
    styles ? framePosition : {...framePosition, ...styles},
    null,
  );

  // generate widget iframe and insert src url path
  const iframeElClass = `lt-app-iframe-${id}`
  const iframeEl = generateDomElement(
    iframeElClass,
    'iframe',
    IFRAME_BASIC_STYLES,
    {src: url.href, type: iframeType}
  )

  // map dom elements and return widget in body node
  try {
    appendNodeToParent(containerEl, iframeEl)
    appendNodeToParent(wrapperEl, containerEl)
    appendNodeToParent(document.body, wrapperEl)

    return {
      id,
      ref: wrapperEl,
      iframe: iframeElClass,
      container: containerElClass,
    } as unknown as WidgetReference
  } catch(e) {
    throw Error(e)
  }
}

export const renderWidgetElement = (
  widget: WidgetToRender,
  viewportPositions: GridPositionsInViewport,
  breakpoint: string,
): Promise<HTMLDivElement> | Window | Error => {
  const {id, kind, url, dimensions, iframeType, position} = widget;
  switch(kind) {
    case 'iframe':
      return createIframeWidget(
        id, url, position, dimensions, iframeType, kind, viewportPositions, breakpoint
      );
    case 'blank':
      return createWindowBlankWidget(id, url, dimensions.size);
    // The div case will be supported in the near future
    case 'div':
    default:
      return new Error('Invalid WidgetType review app settings')
  }
}