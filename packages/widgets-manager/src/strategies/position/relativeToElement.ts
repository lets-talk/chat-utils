import { POSITION_RELATIVE_TO_ELEMENT } from './../../constants';
import { getElementPosition } from './../../utils/index';
import { App, PositionStrategy, makeHTMLFloatType, ObjectIndex } from "../../types";

export class RelativeToElementPositionStrategy implements PositionStrategy {
  public getPositionProps(app: App): ObjectIndex {
    const { position, size } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_ELEMENT) {
      throw Error('Can not get position props from an element that does not implement relativeToElement strategy');
    }

    const relativeToId = position.payload.relativeId;
    const htmlFloatType = makeHTMLFloatType(position.payload.floatType);
    const { top, right, bottom, left } = getElementPosition(relativeToId, htmlFloatType);
    const { width, height } = size;

    const { offset } = app.settings.position.payload;

    const result = {
      ...(offset.top !== undefined && { top: `calc(${top}px - ${height}  + ${offset.top}px)`}),
      ...(offset.left !== undefined && { left: `calc(${left}px + ${offset.left}px)` }),
      ...(offset.bottom !== undefined && { bottom: `calc(${bottom}px + ${offset.bottom}px)` }),
      ...(offset.right !== undefined && { left: `calc(${right}px - ${width} + ${offset.right}px)` }),
    } as ObjectIndex;

    console.log('getPositionProps elementSize, elementPosition, offset, result', getElementPosition(relativeToId, htmlFloatType), offset, result);
    return result;
  };

  public shouldAddNewPosition = () => true;
}
