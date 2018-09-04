import { RelativeToPlacePositionStrategy } from './../../../strategies/position/relativeToPosition';
import { AppPosition, App, GridCell } from '../../../types';

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

describe('RelativeToPlacePositionStrategycle', () => {
  it('Can create a RelativeToPlacePositionStrategy', () => {
    const strategy = new RelativeToPlacePositionStrategy();
    const postionProps = strategy.getPositionProps(mockApp, mockCell);
    expect(strategy.shouldAddNewPosition()).toBeFalsy();
    expect(postionProps).toMatchObject({
      top: '0px',
      left: '0px',
    })
  });

  it('Can not create a RelativeToPlacePositionStrategy for an app that is not configured with another type', () => {
    const strategy = new RelativeToPlacePositionStrategy();
    expect(() => strategy.getPositionProps(mockFailingApp, mockCell)).toThrow();
  });

});