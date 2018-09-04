import { Position, HTMLFloatType } from './../types';

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
 * Helper function to get an element bounding position 
 * @param elementId The id of the dom element (it must exist)
 */
const getElementDomPosition = (elementId: string) => {
  const element = elementById(elementId);
  const positionInfo = element.getBoundingClientRect();
  
  return positionInfo;
}

/**
 * Specialized function to calculate the position of a fixed floating element
 * @param elementId The id of the dom element
 */
export const getElementPositionFixed = (elementId: string): Position => {
  const domPosition = getElementDomPosition(elementId);

  return {
    x: domPosition.left,
    y: domPosition.top
  };
}

/**
 * Specialized function to calculate the position of a default floating element
 * @param elementId The id of the dom element
 */
export const getElementPositionDefault = (elementId: string): Position => {
  const domPosition = getElementDomPosition(elementId);

  return {
    x: domPosition.left + window.scrollX,
    y: domPosition.top + window.scrollY
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
/**
 * function to compare 2 arrays of elements using a predicate function
 * @param pred A predicate function to compare individual elements
 */
export const diffBy = <T>(pred: (x: T, y: T) => boolean) =>
  (a: T[], b: T[]) =>
    a.filter(x =>
      b.every(y => !pred(x, y))
    );
