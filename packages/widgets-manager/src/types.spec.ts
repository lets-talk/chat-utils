import { makeHTMLFloatType, HTMLFloatType } from './types';

describe('makeHTMLFloatType', () => {
  it('Creates a fixed type', () => {
    const fixedType = makeHTMLFloatType('fixed');
    expect(fixedType).toBe(HTMLFloatType.fixed);
  });

  it('Creates a default type', () => {
    const defaultType = makeHTMLFloatType('default');
    expect(defaultType).toBe(HTMLFloatType.default);
  });

  it('Throws with an invalid value', () => {
    expect(() => makeHTMLFloatType('invalidValue')).toThrow();
  });
})