import { RelativeToPlacePositionStrategy } from './relativeToPosition';
import { AppPosition, App, GridCell } from '../../types';

const mockPositionRelativeToPosition: AppPosition = {
  type: 'relative-to-position',
  payload: {
    positionId: 'mid-center',
    offset: { x: 0, y: 0 },
  }
};

const mockCell: GridCell = {
  id: 'top-left',
  apps: [],
  position: { x: 0, y: 0},
  size: { width: 100, height: 100 },
}

const mockApp: App = {
  id: 3,
  name: 'Test App3',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionRelativeToPosition,
  },
  organization_id: 1,
}

const mockFailingApp: App = {
  id: 1,
  name: 'Test App',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: {} as any,
  },
  organization_id: 1,
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