import {
  decoder,
} from '../url';

describe('Testing the url helper', () => {
  describe('decoder function', () => {
    describe('When boolean values', () => {
      it('Decodes truly value', () => {
        const decoded = decoder('true');
      
        expect(decoded).toBeTruthy();
      });


      it('Decodes falsy value', () => {
        const decoded = decoder('false');
      
        expect(decoded).toBeFalsy();
      });
    });

    describe('When float values', () => {
      it('Decodes a flot without decimals', () => {
        const decoded = decoder('12');
      
        expect(decoded).toBe(12);
      });

      it('Decodes a float with decimal', () => {
        const decoded = decoder('12.12');
      
        expect(decoded).toBe(12.12);
      });
    });

    describe('When null values', () => {
      it('Decodes null value to null', () => {
        const decoded = decoder('null');
      
        expect(decoded).toBeNull();
      });
    });

    describe('When undefined values', () => {
      it('Decodes undefined value to undefined', () => {
        const decoded = decoder('undefined');
      
        expect(decoded).toBeUndefined();
      });
    });

    describe('When String values', () => {
      it('Keep the string same way', () => {
        const decoded = decoder('aBc123');
      
        expect(decoded).toBe('aBc123');
      });
    });
  });
});
