import { 
  POSITION_RELATIVE_TO_ELEMENT,
} from './../../constants';
import { getElementPosition, getRelativePosition } from './../../utils/index';
import { AppendAppStrategy } from '../mounting/append';

import { App, PositionStrategy, makeHTMLFloatType, ObjectIndex } from "../../types";

export class RelativeToElementPositionStrategy implements PositionStrategy {
  public getPositionProps(app: App): ObjectIndex<any> {
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_ELEMENT) {
      throw Error('Can not get position props from an element that does not implement relativeToElement strategy');
    }

    const relativeToId = position.payload.relativeId;
    const htmlFloatType = makeHTMLFloatType(position.payload.floatType);
    const elementPositon = getElementPosition(relativeToId, htmlFloatType);
    const relativeInfo = { offsetX: position.payload.offsetX, offsetY: position.payload.offsetY };
    const relativePosition = getRelativePosition(elementPositon, relativeInfo);

    return relativePosition;
  };

  public shouldAddNewPosition = () => true;

  public mountStrategy = () => new AppendAppStrategy;

  public getNameId = (app: App) => {
    const { slug: appName } = app;
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_ELEMENT) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    return `lt.${appName}.relative-${position.payload.relativeId}-${position.payload.offsetX.relationType}-${position.payload.offsetY.relationType}`;
  };
}
