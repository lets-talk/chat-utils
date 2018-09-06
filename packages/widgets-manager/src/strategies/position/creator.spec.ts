import { makePostionStrategy } from './creator';
import { RelativeToElementPositionStrategy } from '../../strategies/position/relativeToElement';
import { RelativeToPlacePositionStrategy } from '../../strategies/position/relativeToPosition';
import { FixedToTopPositionStrategy } from '../../strategies/position/fixedToTop';

describe('creator', () => {
  it('creates a RelativeToElementPositionStrategy', () => {
    const strategy = makePostionStrategy('relative-to-element');
    expect(strategy).toBeInstanceOf(RelativeToElementPositionStrategy);
  });

  it('creates a RelativeToPlacePositionStrategy', () => {
    const strategy = makePostionStrategy('relative-to-position');
    expect(strategy).toBeInstanceOf(RelativeToPlacePositionStrategy);
  });

  it('creates a FixedToTopPositionStrategy', () => {
    const strategy = makePostionStrategy('fixed-to-top-position');
    expect(strategy).toBeInstanceOf(FixedToTopPositionStrategy);
  });

  it('Throws an error with invalid position value', () => {
    expect(() => makePostionStrategy('invalid-type')).toThrow();
  });
});
