import forEach from 'lodash/forEach';
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
  AddonsReferencePosition,
  WidgetRules
} from '../types';
import { RELATIVE_RENDER_POSITION } from '../grid/utils';
import {
  generateUrlFromParams,
  generateDomElement,
  appendNodeToParent,
  getPositionRelativeToViewport,
  serializeBorderRadius,
  elementById,
  generateParentContainer,
  resetNodeToAbsolutePosition,
  getPositionRelativeToApp,
  RelativeAppPositionProps,
  RelativePositionProps,
  WIDGET_ELEVATIONS
} from './utils';

const IFRAME_BASIC_STYLES = {
  width: '100%',
  height: '100%',
  border: 'none'
};

const WRAPPER_DIV_STYLES = {
  display: 'block',
  padding: '0',
  margin: '0',
  border: 'none',
  ['pointer-events']: 'none'
};

const CONTAINER_FRAME_STYLES = {
  overflow: 'hidden!important',
  opacity: '1!important'
};

export const WIDGET_ANIMATIONS = {
  linear: 'all .2s linear',
  ease: 'all 0.2s ease'
};

export const createWindowBlankWidget = (
  id: string,
  urlParams: UrlSourceParams,
  size: WidgetSize,
  windowName = 'popup',
  windowFeatures = 'scrollbars=no,resizable=no'
): Window | Error => {
  const url = generateUrlFromParams(urlParams);
  try {
    return window.open(
      url.href,
      `${id}-${windowName}`,
      `width=${size.width},height=${size.height},${windowFeatures}`
    );
  } catch (e) {
    throw Error(e);
  }
};

export const makePositionStrategy = (
  type: WidgetRelativePosition,
  data: RelativeAppPositionProps | RelativePositionProps
): any => {
  switch (type) {
    case RELATIVE_RENDER_POSITION.toDomEl:
      return false;
    case RELATIVE_RENDER_POSITION.toViewport:
      return getPositionRelativeToViewport(data as RelativePositionProps);
    case RELATIVE_RENDER_POSITION.toApp:
      return getPositionRelativeToApp(data as RelativeAppPositionProps);
    case RELATIVE_RENDER_POSITION.toCenter:
      return false;
    default:
      throw Error('Invalid position type configuration review app settings');
  }
};

export const createIframeWidget = (
  id: string,
  urlParams: UrlSourceParams,
  position: ReferencePosition,
  dimensions: WidgetDimensions,
  iframeType: IframeType | undefined,
  kind: WidgetType,
  viewportPositions: GridPositionsInViewport
): any => {
  const { positions, availablePosition, tileSize } = viewportPositions;
  const { relation, display, reference, element } = position;
  const {
    size,
    styles,
    fullSize,
    animate,
    elevation,
    offset,
    zIndex,
    borderRadius
  } = dimensions;
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
  });

  console.log({ positionAtRender: framePosition });

  if (!framePosition) {
    throw new Error('invalid position');
  }

  // create empty wrapper div
  const wrapperElClass = `lt-app__container-${id}`;
  const wrapperEl = generateDomElement(
    wrapperElClass,
    'div',
    {
      ...WRAPPER_DIV_STYLES,
      transition: animate ? WIDGET_ANIMATIONS.ease : 'none',
      ['z-index']: zIndex ? `${zIndex}` : 'inherit'
    },
    null
  );

  // we create a fiv addons composer with the rules of the frame
  // in case of be need later in a post rendered widget insert
  const fixedWrapperElClass = `lt-composer__parent-${id}`;
  // this need a little of refactor in the interface API, I feel we need to move all the display implementation to relation definition
  const fixedWrapperAddonsEl =
    display === `${ReferenceToFloat.fixed}`
      ? generateParentContainer(
          fixedWrapperElClass,
          { ...framePosition, animate, display },
          WIDGET_ANIMATIONS.ease
        )
      : false;

  const containerElClass = `lt-app__frame-${id}`;
  const containerEl = generateDomElement(
    containerElClass,
    'div',
    styles ? framePosition : { ...framePosition, ...styles },
    null
  );

  // generate widget iframe and insert src url path
  const iframeElClass = `lt-app__iframe-${id}`;
  const iframeEl = generateDomElement(
    iframeElClass,
    'iframe',
    {
      ...IFRAME_BASIC_STYLES,
      ['border-radius']: serializeBorderRadius(borderRadius, '0') as string
    },
    { src: url.href, type: iframeType }
  );

  try {
    // append iframe to container element aka #__frame
    appendNodeToParent(containerEl, iframeEl);
    // if the position is fixed we encapsulate in a composer aka #__parent
    if (fixedWrapperAddonsEl) {
      // we need to remove duplicate position values  from container
      appendNodeToParent(
        fixedWrapperAddonsEl,
        resetNodeToAbsolutePosition(containerEl)
      );
      appendNodeToParent(wrapperEl, fixedWrapperAddonsEl);
      // else we take the classic container and append to wrapper div
    } else {
      appendNodeToParent(wrapperEl, containerEl);
    }

    // append wrapperEl node to dom body
    appendNodeToParent(document.body, wrapperEl);

    // return reference and utility classes
    return ({
      id,
      ref: wrapperEl,
      iframe: iframeElClass,
      container: containerElClass,
      parent: fixedWrapperAddonsEl ? fixedWrapperElClass : null
    } as unknown) as WidgetReference;
  } catch (e) {
    throw Error(e);
  }
};

export const renderWidgetElement = (
  widget: WidgetToRender,
  viewportPositions: GridPositionsInViewport
): Promise<HTMLDivElement> | Window | Error => {
  const { id, kind, url, dimensions, iframeType, position } = widget;
  switch (kind) {
    case 'iframe':
      return createIframeWidget(
        id,
        url,
        position as ReferencePosition,
        dimensions,
        iframeType,
        kind,
        viewportPositions
      );
    case 'blank':
      return createWindowBlankWidget(id, url, dimensions.size);
    // The div case will be supported in the near future
    case 'div':
    default:
      return new Error('Invalid WidgetType review app settings');
  }
};

export const appendWidgetAddonToRef = (
  addonWidget: WidgetToRender,
  parentWidgetId: string,
  widgetRefs: WidgetReference[]
) => {
  const { dimensions, position, url, kind, iframeType, id } = addonWidget;
  const { relation, display } = position as AddonsReferencePosition;
  const {
    size,
    styles,
    fullSize,
    animate,
    elevation,
    offset,
    zIndex,
    borderRadius
  } = dimensions;

  const widgetRef = widgetRefs.find((ref) => ref.id === parentWidgetId);
  const parentWrapperEl = elementById(widgetRef.parent);

  if (!parentWrapperEl || kind !== 'iframe') {
    throw new Error(`kind can't not be ${kind} or parent wrapped not found`);
  }

  // get iframe container size and position
  const parentWidgetRect = parentWrapperEl.getBoundingClientRect();

  // generate iframe src url
  const parseUrl = generateUrlFromParams(url);

  const framePosition = makePositionStrategy(relation as any, {
    parentAppSize: parentWidgetRect,
    addonSize: size,
    offset,
    display,
    styles,
    borderRadius: serializeBorderRadius(borderRadius, '0') as string,
    zIndex,
    elevation
  });

  console.log({ positionAtAddon: framePosition });
  const containerElClass = `lt-addon_app__frame-${id}`;
  const containerEl = generateDomElement(
    containerElClass,
    'div',
    styles ? framePosition : { ...framePosition, ...styles },
    null
  );

  const iframeElClass = `lt-addon_app__iframe-${id}`;
  const iframe = generateDomElement(
    iframeElClass,
    'iframe',
    {
      ...IFRAME_BASIC_STYLES,
      width: '100%',
      height: '100%',
      ['border-radius']: serializeBorderRadius(borderRadius, '0') as string
    },
    { src: parseUrl.href, type: iframeType }
  );

  try {
    appendNodeToParent(containerEl, iframe);
    appendNodeToParent(parentWrapperEl, containerEl);
    // return reference and utility classes
    return ({
      id,
      ref: containerEl,
      iframe: iframeElClass,
      container: containerElClass
    } as unknown) as WidgetReference;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateWidgetElement = (
  widget: WidgetToUpdate,
  viewportPositions: GridPositionsInViewport
) => {
  const { isFullSize, ref, dimension, position } = widget;
  const { positions } = viewportPositions;
  const {
    size,
    offset,
    animate,
    elevation,
    styles,
    borderRadius,
    zIndex
  } = dimension;
  const { relation, display, reference } = position;

  const framePosition = makePositionStrategy(relation, {
    rect: positions[reference as ReferenceToGridPosition] as rectPosition,
    size,
    offset,
    display,
    styles,
    elevation,
    fullSize: isFullSize,
    zIndex,
    animate: animate ? WIDGET_ANIMATIONS.ease : false,
    borderRadius: serializeBorderRadius(borderRadius, false) as boolean
  });

  console.log({ positionAtUpdate: framePosition });

  if (!framePosition) {
    throw new Error('invalid resizing or positions props');
  }

  // at this moment we only support update of apps related to viewport
  if (relation === RELATIVE_RENDER_POSITION.toViewport) {
    try {
      // get ref to iframe and parents elements
      const iframe = elementById(ref.iframe);
      const container = elementById(ref.container);
      const parent = elementById(ref.parent);
      // serialize frame position and map
      const { top, right, bottom, left, height, width } = framePosition;
      const setBorderRadius = serializeBorderRadius(
        borderRadius,
        '0'
      ) as string;
      // create container css valid position
      const position = [{ top }, { right }, { bottom }, { left }].reduce(
        (acc, val) => {
          return val ? { ...acc, ...val } : acc;
        },
        {}
      );
      // map iframe to new border radius val to iframe
      iframe.style.setProperty('border-radius', setBorderRadius);
      // map box shadow and border radius in container
      forEach(
        {
          'border-radius': setBorderRadius,
          'box-shadow': WIDGET_ELEVATIONS[elevation]
            ? WIDGET_ELEVATIONS[elevation]
            : 'none'
        },
        (val, key) => container.style.setProperty(key, val)
      );
      // map the container iframe to her new position
      forEach({ ...position, height, width }, (val, key) =>
        parent.style.setProperty(key, val)
      );
    } catch (e) {
      throw new Error(e);
    }
  }
};
