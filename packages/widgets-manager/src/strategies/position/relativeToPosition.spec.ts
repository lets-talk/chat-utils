import { RelativeToPlacePositionStrategy } from './relativeToPosition';
import { AppPosition, App, GridCell } from '../../types';

const mockPositionRelativeToPosition: AppPosition = {
  type: 'relative-to-position',
  payload: {
    positionId: 'mid-center',
    offsetX: {
      relationType: 'LL',
      value: 0,
    },
    offsetY: {
      relationType: 'TB',
      value: 0,
    }
  }
};

const mockCell: GridCell = {
  id: 'top-left',
  apps: [],
  position: { top: 0, right: 0, bottom: 0, left: 0 },
  size: { width: 100, height: 100 },
}

const mockApp: App = {
  id: 3,
  name: 'Test App3',
  slug: 'test-app3',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionRelativeToPosition,
    size: {} as any,
    queryParams: {} as any
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}

const mockFailingApp: App = {
  id: 1,
  name: 'Test App',
  slug: 'test-app',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: {} as any,
    size: {} as any,
    queryParams: {} as any,
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}

describe('RelativeToPlacePositionStrategy', () => {

  it('can be created', () => {
    expect(() => new RelativeToPlacePositionStrategy()).not.toThrow();
  });

  describe('getPositionProps', () => {
    it('Works on valid app', () => {
      const strategy = new RelativeToPlacePositionStrategy();
      const postionProps = strategy.getPositionProps(mockApp, mockCell);
      expect(strategy.shouldAddNewPosition()).toBeFalsy();
      expect(postionProps).toMatchObject({
        top: '0px',
        left: '0px',
      })
    });

    it('Fails on invalid app', () => {
      const strategy = new RelativeToPlacePositionStrategy();
      expect(() => strategy.getPositionProps(mockFailingApp, mockCell)).toThrow();
    });
  });

  it('shouldAddNewPosition', () => {
    const strategy = new RelativeToPlacePositionStrategy();

    expect(strategy.shouldAddNewPosition()).toBeFalsy();
  });

});