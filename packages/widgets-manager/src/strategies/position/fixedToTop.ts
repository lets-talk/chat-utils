
import { POSITION_FIXED_TO_TOP } from './../../constants';
import { App, ObjectIndex, PositionStrategy } from "../../types";
import { ReplaceAppStrategy } from '../mounting/replace';

export class FixedToTopPositionStrategy implements PositionStrategy {
  public getPositionProps(app: App): ObjectIndex {
    const { position } = app.settings;
    if (position.type !== POSITION_FIXED_TO_TOP) {
      throw Error('Can not get position props from an element that does not implement fixedToTop strategy');
    }

    const left = 0 + position.payload.offset.left;
    const top = 0 + position.payload.offset.top;

    return {
      top: `${top}px`,
      left: `${left}px`,
    }
  };

  public shouldAddNewPosition = () => true;

  public mountStrategy = () => new ReplaceAppStrategy;
  
  public getNameId = (app: App) => {
    const { slug: appName } = app;
    const { position } = app.settings;
    if (position.type !== POSITION_FIXED_TO_TOP) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    return `lt.${appName}.fixed-to-top`;
  };
}