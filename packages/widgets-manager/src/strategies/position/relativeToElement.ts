import { POSITION_RELATIVE_TO_ELEMENT } from './../../constants';
import { getElementPosition } from './../../utils/index';
import { App, ObjectIndex, PositionStrategy, makeHTMLFloatType } from "../../types";

export class RelativeToElementPositionStrategy implements PositionStrategy {
  public getPositionProps(app: App): ObjectIndex {
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_ELEMENT) {
      throw Error('Can not get position props from an element that does not implement relativeToElement strategy');
    }

    const relativeToId = position.payload.relativeId;
    const htmlFloatType = makeHTMLFloatType(position.payload.floatType);
    const { x, y } = getElementPosition(relativeToId, htmlFloatType);
    
    const left = x + position.payload.offset.x;
    const top = y + position.payload.offset.y;
    return {
      top: `calc(${top}px - ${app.settings.inlineCss.height})`,
      left: `${left}px`,
    };
    
  };
}
