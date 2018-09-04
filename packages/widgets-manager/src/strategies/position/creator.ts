import { PositionStrategy } from '../../types';
import { FixedToTopPositionStrategy } from './fixedToTop';
import { RelativeToPlacePositionStrategy } from './relativeToPosition';
import { RelativeToElementPositionStrategy } from './relativeToElement';
import {
  POSITION_RELATIVE_TO_ELEMENT,
  POSITION_RELATIVE_TO_PLACE,
  POSITION_FIXED_TO_TOP
} from '../../constants';

export const makePostionStrategy = (type: string): PositionStrategy => {
  switch (type) {
    case POSITION_RELATIVE_TO_ELEMENT:
      return new RelativeToElementPositionStrategy();
    case POSITION_RELATIVE_TO_PLACE:
      return new RelativeToPlacePositionStrategy();
    case POSITION_FIXED_TO_TOP:
      return new FixedToTopPositionStrategy();
    default:
      throw Error('Invalid position type configuration');
  }
}
