import forEach from 'lodash/forEach'
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
  ReferenceToGridPosition,
  WidgetToUpdate,
  ReferenceToFloat,
  AddonsReferencePosition
} from "../types";
import { RELATIVE_RENDER_POSITION } from "../grid/utils";
import {
  generateUrlFromParams,
  generateDomElement,
  appendNodeToParent,
  getPositionRelativeToViewport,
  serializeBorderRadius,
  elementById,
  generateParentContainer,
  resetNodeToAbsolutePosition
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
  ['pointer-events']: 'none',
}

const CONTAINER_FRAME_STYLES = {
  overflow: 'hidden!important',
  opacity: '1!important'
}

export const WIDGET_ANIMATIONS = {
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
): any => {
  const {positions, availablePosition, tileSize} = viewportPositions;
  const {relation, display, reference, element} = position;
  const {size, styles, fullSize, animate, elevation, offset, zIndex, borderRadius} = dimensions;
  // generate iframe src url
  const url = generateUrlFromParams(urlParams);

  const framePosition = makePositionStrategy(relation, {
    rect: positions[reference as ReferenceToGridPosition] as rectPosition,
    size,
    offset,
    display,
    styles,
    elevation,
    fullSize,
    zIndex,
    animate: animate ? WIDGET_ANIMATIONS.ease : false,
    borderRadius: serializeBorderRadius(borderRadius, false) as boolean
  })

  console.log({framePosition})

  if(!framePosition) {
    throw new Error('invalid position')
  }

  // create empty wrapper div
  const wrapperElClass = `lt-app__container-${id}`
  const wrapperEl = generateDomElement(
    wrapperElClass,
    'div',
    {
      ...WRAPPER_DIV_STYLES,
      transition: animate ? WIDGET_ANIMATIONS.ease : 'none',
      ['z-index']: zIndex ? `${zIndex}` : 'inherit',
    },
    null,
  );

  // we create a fiv addons composer with the rules of the frame
  // in case of be need later in a post rendered widget insert
  const fixedWrapperElClass = `lt-composer__parent-${id}`
  const fixedWrapperAddonsEl = display === `${ReferenceToFloat.fixed}` ?
    generateParentContainer(
        fixedWrapperElClass,
        {...framePosition, display, animate},
        WIDGET_ANIMATIONS.ease
    ) : false

  const containerElClass = `lt-app__frame-${id}`
  const containerEl = generateDomElement(
    containerElClass,
    'div',
    styles ? framePosition : {...framePosition, ...styles},
    null,
  );

  // generate widget iframe and insert src url path
  const iframeElClass = `lt-app__iframe-${id}`
  const iframeEl = generateDomElement(
    iframeElClass,
    'iframe',
    {
      ...IFRAME_BASIC_STYLES,
      ['border-radius']: serializeBorderRadius(borderRadius, '0') as string
    },
    {src: url.href, type: iframeType}
  )

  try {
    // append iframe to container element aka #__frame
    appendNodeToParent(containerEl, iframeEl)
    // if the position is fixed we encapsulate in a composer aka #__parent
    if(fixedWrapperAddonsEl) {
      // we need to remove duplicate position values  from container
      appendNodeToParent(
        fixedWrapperAddonsEl,
        resetNodeToAbsolutePosition(containerEl)
      )
      appendNodeToParent(wrapperEl, fixedWrapperAddonsEl)
    // else we take the classic container and append to wrapper div
    } else {
      appendNodeToParent(wrapperEl, containerEl)
    }

    // append wrapperEl node to dom body
    appendNodeToParent(document.body, wrapperEl)

    // return reference and utility classes
    return {
      id,
      ref: wrapperEl,
      iframe: iframeElClass,
      container: containerElClass,
      parent: fixedWrapperAddonsEl ? fixedWrapperElClass : null
    } as unknown as WidgetReference
  } catch(e) {
    throw Error(e)
  }
}

export const renderWidgetElement = (
  widget: WidgetToRender,
  viewportPositions: GridPositionsInViewport,
): Promise<HTMLDivElement> | Window | Error => {
  const {id, kind, url, dimensions, iframeType, position} = widget;
  switch(kind) {
    case 'iframe':
      return createIframeWidget(
        id,
        url,
        position as ReferencePosition,
        dimensions,
        iframeType,
        kind,
        viewportPositions,
      );
    case 'blank':
      return createWindowBlankWidget(id, url, dimensions.size);
    // The div case will be supported in the near future
    case 'div':
    default:
      return new Error('Invalid WidgetType review app settings')
  }
}


export const updateWidgetElement = (widget: WidgetToUpdate, viewportPositions: GridPositionsInViewport): any => {
  console.log({widget, viewportPositions})

  const {id, isFullSize, ref, dimension, position} = widget
  const {positions} = viewportPositions;
  const {size, offset, animate, elevation, styles, borderRadius, zIndex} = dimension
  const {relation, display, reference, element} = position;

  const framePosition = makePositionStrategy(relation, {
    rect: positions[reference as ReferenceToGridPosition] as rectPosition,
    size,
    offset,
    display,
    styles,
    elevation,
    isFullSize,
    zIndex,
    animate: animate ? WIDGET_ANIMATIONS.ease : false,
    borderRadius: serializeBorderRadius(borderRadius, false) as boolean
  })

  console.log({framePosition})

  if(!framePosition) {
    throw new Error('invalid resizing or positions props')
  }

  try {
    const iframe = elementById(ref.iframe)
    const container = elementById(ref.container)

    // map iframe to new border radius val if exit
    iframe.style.setProperty(
      'border-radius', serializeBorderRadius(borderRadius, '0') as string
    )

    // map the container iframe to her new position
    forEach(framePosition, (val, key) => {
      container.style.setProperty(key, val)
    });
  } catch(e) {
    throw new Error(e)
  }
}

