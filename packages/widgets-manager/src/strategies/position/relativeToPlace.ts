import { POSITION_RELATIVE_TO_PLACE } from './../../constants';
import { GridCell } from './../../types';
import { App, ObjectIndex, PositionStrategy } from "../../types";

export class RelativeToPlacePositionStrategy implements PositionStrategy {
  public getPositionProps(app: App, cell: GridCell): ObjectIndex {
    const { position } = app.settings;
    if (position.type !== POSITION_RELATIVE_TO_PLACE) {
      throw Error('Can not get position props from an element that does not implement relativeToPlace strategy');
    }
    const x = cell.position.x + position.payload.offset.x;
    const y = cell.position.y + position.payload.offset.y;
    return {
      top: `${y}px`,
      left: `${x}px`
    }
  };
}