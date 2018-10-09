import { relationTypeX, relationTypeY } from './../types';
import { diffBy, getElementPosition, getRelativePosition } from './';
import { HTMLFloatType, Position, RelativeToElementPosition } from '../types';

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
        bottom: 0,
        right: 50,
        top: 200,
        left: 0,
      });
    });

    it('throws when element does not exists', () => {
      expect(() => getElementPosition('mockElementNotExists', HTMLFloatType.fixed)).toThrow;
    });
  });

  describe('getRelativePosition', () => {
    // Window size for the tests is:
    // window.innerWidth = 1024, window.innerHeight = 768

    // This element is 200px width (Goes from 400 to 600)
    // This element is 20px height (Goes from 80 to 100)
    const mockElementPosition: Position = { 
      top: 80,
      right: 600,
      left: 400,
      bottom: 100,
    };

    const generateMockPositionConfig = (relationTypeX: relationTypeX, relationTypeY: relationTypeY) => {
      const mockPositionConfig: RelativeToElementPosition = {
        type: 'relative-to-element',
        payload: {
          relativeId: 'lt-messenger-iframe',
          floatType: HTMLFloatType.fixed,
          offsetX: {
            relationType: relationTypeX,
            value: 0,
          },
          offsetY: {
            relationType: relationTypeY,
            value: 0,
          }
        }
      };
    
      return mockPositionConfig;
    }
    it('Calculate correct relative postion for LL/TB', () => {
      const mockPositionConfig = generateMockPositionConfig('LL', 'TB');
      const element = getRelativePosition(mockElementPosition, mockPositionConfig);
      // LL -> Means my Left should be in the Left of the other component (ie: 400px)
      // TB -> Means my Top should be in the Bottom of the other component (ie: 100px)
      const expectedResult = {
        top: '100px',
        left: '400px',
      };
      expect(element).toMatchObject(expectedResult);
    });

    it('Calculate correct relative postion for LL/BT', () => {
      const mockPositionConfig = generateMockPositionConfig('LL', 'BT');
      const element = getRelativePosition(mockElementPosition, mockPositionConfig);
      // LL -> Means my Left should be in the Left of the other component (ie: 400px)
      // BT -> Means my Bottom should be in the Top of the other component (ie: 768px-80px = 688px)
      const expectedResult = {
        bottom: '688px',
        left: '400px',
      };
      expect(element).toMatchObject(expectedResult);
    });

    it('Calculate correct relative postion for LL/BB', () => {
      const mockPositionConfig = generateMockPositionConfig('LL', 'BB');
      const element = getRelativePosition(mockElementPosition, mockPositionConfig);
      // LL -> Means my Left should be in the Left of the other component (ie: 400px)
      // BB -> Means my Bottom should be in the Bottom of the other component (ie: 100px = 668px)
      const expectedResult = {
        bottom: '668px',
        left: '400px',
      };
      expect(element).toMatchObject(expectedResult);
    });

    it('Calculate correct relative postion for RR/BB', () => {
      const mockPositionConfig = generateMockPositionConfig('RR', 'BB');
      const element = getRelativePosition(mockElementPosition, mockPositionConfig);
      // RR -> Means my Right should be in the Right of the other component (ie: 1024px - 600px)
      // BB -> Means my Bottom should be in the Bottom of the other component (ie: 768px - 100px)
      const expectedResult = {
        right: '424px',
        bottom: '668px',
      };
      expect(element).toMatchObject(expectedResult);
    });

    it('Calculate correct relative postion for LR/BB', () => {
      const mockPositionConfig = generateMockPositionConfig('LR', 'BB');
      const element = getRelativePosition(mockElementPosition, mockPositionConfig);
      // LR -> Means my Left should be in the Right of the other component (ie: 600px)
      // BB -> Means my Bottom should be in the Bottom of the other component (ie: 768px - 100px)
      const expectedResult = {
        left: '600px',
        bottom: '668px',
      };
      expect(element).toMatchObject(expectedResult);
    });

    it('Calculate correct relative postion for RL/BB', () => {
      const mockPositionConfig = generateMockPositionConfig('RL', 'BB');
      const element = getRelativePosition(mockElementPosition, mockPositionConfig);
      // RL -> Means my Right should be in the Left of the other component (ie: 1024px - 600px)
      // BB -> Means my Bottom should be in the Bottom of the other component (ie: 768px - 100px)
      const expectedResult = {
        right: '624px',
        bottom: '668px',
      };
      expect(element).toMatchObject(expectedResult);
    });
  });
});
