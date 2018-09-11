
import { POSITION_FIXED_TO_TOP } from './../../constants';
import { App, ObjectIndex, PositionStrategy } from "../../types";

export class FixedToTopPositionStrategy implements PositionStrategy {
  public getPositionProps(app: App): ObjectIndex {
    const { position } = app.settings;
    if (position.type !== POSITION_FIXED_TO_TOP) {
      throw Error('Can not get position props from an element that does not implement fixedToTop strategy');
    }

    const left = 0 + position.payload.offset.x;
    const top = 0 + position.payload.offset.y;

    return {
      top: `${top}px`,
      left: `${left}px`,
    }
  };
  public shouldAddNewPosition = () => true;
}