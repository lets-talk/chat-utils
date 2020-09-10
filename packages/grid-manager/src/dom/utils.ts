import {
  HTMLFloatType,
  rectPosition,
  WidgetSizeOffset,
  relationTypeX,
  relationTypeY
} from "../types";

/**
 * Return an element by its id or throws an error if it can not find one
 * @param id The dom element id
 */
const elementById = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (element === null) throw Error('Can not find the dom element with id: ' + id);
  return element;
}

/**
 * Gets an element bounding position
 * @param elementId The id of the dom element (it must exist)
 */
const getElementDomPosition = (elementId: string): DOMRect => {
  const element = elementById(elementId);
  const positionInfo = element.getBoundingClientRect();

  return positionInfo;
}

/**
 * Gets position of a fixed floating element
 * @param elementId The id of the dom element
 */
export const getElementPositionFixed = (elementId: string): rectPosition => {
  const domPosition = getElementDomPosition(elementId);
  return domPosition;
}

/**
 * Gets position of a default floating element
 * @param elementId The id of the dom element
 */
export const getElementPositionDefault = (elementId: string): rectPosition => {
  const domPosition = getElementDomPosition(elementId);

  return {
    top: Math.floor(domPosition.top + window.scrollY),
    right: domPosition.right,
    bottom: domPosition.bottom,
    left: Math.floor(domPosition.left + window.scrollX),
  };
}

/**
 * Get the element position of an element knowing how it is floating
 * @param elementId The id of the dom element
 * @param elementFloatType The float type element (supports: fixed, default)
 */
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