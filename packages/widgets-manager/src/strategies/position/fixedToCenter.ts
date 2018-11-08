
import { POSITION_FIXED_TO_CENTER } from './../../constants';
import { App, ObjectIndex, PositionStrategy } from "../../types";
import { ReplaceAppStrategy } from '../mounting/replace';

export class FixedToCenterPositionStrategy implements PositionStrategy {
  public getPositionProps(app: App): ObjectIndex {
    const { position } = app.settings;
    if (position.type !== POSITION_FIXED_TO_CENTER) {
      throw Error('Can not get position props from an element that does not implement fixedToCenter strategy');
    }

    const left = 0 + position.payload.offset.left;
    const top = 0 + position.payload.offset.top;

    return {
      top: `calc(50% + ${top}px)`,
      left: `calc(50% + ${left}px)`,
    }
  };

  public shouldAddNewPosition = () => true;

  public mountStrategy = () => new ReplaceAppStrategy;
  
  public getNameId = (app: App) => {
    const { name: appName } = app;
    const { position } = app.settings;
    if (position.type !== POSITION_FIXED_TO_CENTER) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    return `lt.${appName}.fixed-to-center`;
  };
}