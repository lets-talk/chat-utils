import { WidgetRelativePosition } from "../types";
import { RELATIVE_RENDER_POSITION } from "../grid/utils";

export const makePostionStrategy = (type: WidgetRelativePosition): Promise<any> => {
  switch (type) {
    case RELATIVE_RENDER_POSITION.toDomEl:
      return new Promise(res => {})
    case RELATIVE_RENDER_POSITION.toViewport:
      return new Promise(res => {})
    case RELATIVE_RENDER_POSITION.toApp:
      return new Promise(res => {})
    case RELATIVE_RENDER_POSITION.toCenter:
      return new Promise(res => {})
    default:
      throw Error('Invalid position type configuration');
  }
}
