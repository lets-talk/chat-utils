import { POSITION_RELATIVE_TO_PLACE } from './../../constants';
import { GridCell } from './../../types';
import { App, ObjectIndex, PositionStrategy } from "../../types";
import { ReplaceAppStrategy } from '../mounting/replace';

export class RelativeToPlacePositionStrategy implements PositionStrategy {
  public getPositionProps(app: App, cell: GridCell): ObjectIndex {
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_PLACE) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    const left = cell.position.left + position.payload.offset.left;
    const top = cell.position.top + position.payload.offset.top;
    return {
      top: `${top}px`,
      left: `${left}px`
    }
  };
  
  public shouldAddNewPosition = () => false;

  public mountStrategy = () => new ReplaceAppStrategy;

  public getNameId = (app: App) => {
    const { name: appName } = app;
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_PLACE) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    return `lt.${appName}.absolute-${position.payload.positionId}`;
  };
}