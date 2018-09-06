import { diffBy, getElementPosition } from './';
import { HTMLFloatType } from '../types';

describe('utils/index', () => {
  describe('diffBy', () => {
    it('It returns the same elements', () => {
      const initialApps = [
        'app1',
      ];
    
      const finalApps = [
        'app1',
      ];
    
      const diff = diffBy((a, b) => a == b)(initialApps, finalApps);
      expect(diff).toHaveLength(0);
    });

    it('It returns union when calling changing arguments positions', () => {
      
      const initialApps = [
        {
          id: 'app1'
        },
      ];

      const finalApps = [
        {
          id: 'app2'
        },
      ];

      const diff1 = diffBy((a: any, b: any) => a.id == b.id)(initialApps, finalApps);
      const diff2 = diffBy((a: any, b: any) => a.id == b.id)(finalApps, initialApps);
      const diff = [...diff1, ...diff2];

      expect(diff).toHaveLength(2);
      expect(diff).toContainEqual({ id: 'app1' });
      expect(diff).toContainEqual({ id: 'app2' });
    });

    it('It returns only items in common', () => {
      
      const initialApps = [
        'app1',
        'app2',
      ];

      const finalApps = [
        'app2',
      ];

      const diff = diffBy((a, b) => a == b)(initialApps, finalApps);

      expect(diff).toHaveLength(1);
      expect(diff).toContainEqual('app1');
    });

    it('It returns only elements in first array when there is no intersection between items', () => {
      
      const initialApps = [
        'app1'
      ];

      const finalApps = [
        'app2'
      ];

      const diff = diffBy((a, b) => a == b)(initialApps, finalApps);

      expect(diff).toHaveLength(1);
      expect(diff).toContainEqual('app1');
    });

    it('It returns all the elements in first array when second is empty', () => {
      const initialApps: any[] = [];

      const finalApps = [
        'app1'
      ];

      const diff = diffBy((a, b) => a == b)(finalApps, initialApps);

      expect(diff).toHaveLength(1);
      expect(diff).toContainEqual('app1');
    });
  });

  describe('getElementPosition', () => {
    it('returns an element by id', () => {
      const element = getElementPosition('mockElement', HTMLFloatType.fixed);
      expect(element).toMatchObject({
        x: 0,
        y: 200,
      });
    });

    it('throws when element does not exists', () => {
      expect(() => getElementPosition('mockElementNotExists', HTMLFloatType.fixed)).toThrow;
    });
  });

});
