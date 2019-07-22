import { POSITION_RELATIVE_TO_PLACE } from './../../constants';
import { GridCell } from './../../types';
import { App, ObjectIndex, PositionStrategy } from "../../types";
import { ReplaceAppStrategy } from '../mounting/replace';
import { getRelativePosition } from '../../utils';

export class RelativeToPlacePositionStrategy implements PositionStrategy {
  public getPositionProps(app: App, cell: GridCell): ObjectIndex<any> {
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_PLACE) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    
    const relativeInfo = { offsetX: position.payload.offsetX, offsetY: position.payload.offsetY };
    const relativePosition = getRelativePosition(cell.position, relativeInfo);

    return relativePosition;
  };
  
  public shouldAddNewPosition = () => false;

  public mountStrategy = () => new ReplaceAppStrategy;

  public getNameId = (app: App) => {
    const { slug: appName } = app;
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_PLACE) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    return `lt.${appName}.absolute-${position.payload.positionId}`;
  };
}