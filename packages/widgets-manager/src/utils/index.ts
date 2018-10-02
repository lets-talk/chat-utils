import { RELATIVE_X_LEFT_LEFT, RELATIVE_X_LEFT_RIGHT, RELATIVE_X_RIGHT_LEFT, RELATIVE_X_RIGHT_RIGHT, RELATIVE_Y_TOP_TOP, RELATIVE_Y_TOP_BOTTOM, RELATIVE_Y_BOTTOM_BOTTOM, RELATIVE_Y_BOTTOM_TOP } from './../constants';
import { Position, HTMLFloatType, ObjectIndex, RelativeToElementPosition } from './../types';

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
const getElementDomPosition = (elementId: string) => {
  const element = elementById(elementId);
  const positionInfo = element.getBoundingClientRect();
  
  return positionInfo;
}

/**
 * Gets position of a fixed floating element
 * @param elementId The id of the dom element
 */
export const getElementPositionFixed = (elementId: string): Position => {
  const domPosition = getElementDomPosition(elementId);
  return domPosition;
}

/**
 * Gets position of a default floating element
 * @param elementId The id of the dom element
 */
export const getElementPositionDefault = (elementId: string): Position => {
  const domPosition = getElementDomPosition(elementId);

  return {
    top: domPosition.top + window.scrollY,
    right: domPosition.right,
    bottom: domPosition.bottom,
    left: domPosition.left + window.scrollX,
  };
}

/**
 * Get the element position of an element knowing how it is floating
 * @param elementId The id of the dom element
 * @param elementFloatType The float type element (supports: fixed, default)
 */
export const getElementPosition = (elementId: string, elementFloatType: HTMLFloatType): Position => {
  switch (elementFloatType) {
    case HTMLFloatType.default:
      return getElementPositionDefault(elementId);
    case HTMLFloatType.fixed:
      return getElementPositionFixed(elementId);
  }
}

export const getRelativePosition = (elementPositon: Position, positionConfig: RelativeToElementPosition): ObjectIndex => {
    const { top, right, bottom, left } = elementPositon;
    const { innerHeight, innerWidth } = window
    let offset: ObjectIndex = {};
    switch (positionConfig.payload.offsetX.relationType) {
      case RELATIVE_X_LEFT_LEFT:
        offset.left = `${left + positionConfig.payload.offsetX.value}px`
        break;
      case RELATIVE_X_LEFT_RIGHT:
        offset.left = `${right + positionConfig.payload.offsetX.value}px`
        break;
      case RELATIVE_X_RIGHT_LEFT:
        offset.right = `${innerWidth - left + positionConfig.payload.offsetX.value}px`
        break;
      case RELATIVE_X_RIGHT_RIGHT:
        offset.right = `${innerWidth - right + positionConfig.payload.offsetX.value}px`
        break;
    
      default:
        break;
    }

    switch (positionConfig.payload.offsetY.relationType) {
      case RELATIVE_Y_TOP_TOP:
        offset.top = `${top + positionConfig.payload.offsetY.value}px`
        break;
      case RELATIVE_Y_TOP_BOTTOM:
        offset.top = `${bottom + positionConfig.payload.offsetY.value}px`
        break;
      case RELATIVE_Y_BOTTOM_TOP:
        offset.bottom = `${innerHeight - top + positionConfig.payload.offsetY.value}px`
        break;
      case RELATIVE_Y_BOTTOM_BOTTOM:
        offset.bottom = `${innerHeight - bottom + positionConfig.payload.offsetY.value}px`
        break;
    
      default:
        break;
    }

    return offset;
}

/**
 * function to compare 2 arrays of elements using a predicate function
 * @param pred A predicate function to compare individual elements
 */
export const diffBy = <T>(pred: (x: T, y: T) => boolean) =>
  (a: T[], b: T[]) =>
    a.filter(x =>
      b.every(y => !pred(x, y))
    );
