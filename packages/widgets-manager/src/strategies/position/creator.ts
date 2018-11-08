import { PositionStrategy } from '../../types';
import { FixedToTopPositionStrategy } from './fixedToTop';
import { FixedToCenterPositionStrategy } from './fixedToCenter';
import { RelativeToPlacePositionStrategy } from './relativeToPosition';
import { RelativeToElementPositionStrategy } from './relativeToElement';
import {
  POSITION_RELATIVE_TO_ELEMENT,
  POSITION_RELATIVE_TO_PLACE,
  POSITION_FIXED_TO_TOP,
  POSITION_FIXED_TO_CENTER,
} from '../../constants';

export const makePostionStrategy = (type: string): PositionStrategy => {
  switch (type) {
    case POSITION_RELATIVE_TO_ELEMENT:
      return new RelativeToElementPositionStrategy();
    case POSITION_RELATIVE_TO_PLACE:
      return new RelativeToPlacePositionStrategy();
    case POSITION_FIXED_TO_TOP:
      return new FixedToTopPositionStrategy();
    case POSITION_FIXED_TO_CENTER:
      return new FixedToCenterPositionStrategy();
    default:
      throw Error('Invalid position type configuration');
  }
}
