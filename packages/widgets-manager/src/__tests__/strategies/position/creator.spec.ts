import { makePostionStrategy } from './../../../strategies/position/creator';
import { RelativeToElementPositionStrategy } from '../../../strategies/position/relativeToElement';
import { RelativeToPlacePositionStrategy } from '../../../strategies/position/relativeToPosition';
import { FixedToTopPositionStrategy } from '../../../strategies/position/fixedToTop';

describe('creator', () => {
  it('Can create a strategy using makePostionStrategy', () => {
    const strategy = makePostionStrategy('relative-to-element');
    expect(strategy).toBeInstanceOf(RelativeToElementPositionStrategy);

    const strategy2 = makePostionStrategy('relative-to-position');
    expect(strategy2).toBeInstanceOf(RelativeToPlacePositionStrategy);

    const strategy3 = makePostionStrategy('fixed-to-top-position');
    expect(strategy3).toBeInstanceOf(FixedToTopPositionStrategy);

    expect(() => makePostionStrategy('invalid-type')).toThrow;
  });

  it('Throws an error with invalid position value', () => {
    expect(() => makePostionStrategy('invalid-type')).toThrow();
  });
});