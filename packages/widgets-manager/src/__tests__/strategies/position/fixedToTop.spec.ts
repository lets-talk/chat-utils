import { AppPosition, App } from './../../../types';
import { FixedToTopPositionStrategy } from './../../../strategies/position/fixedToTop';

const mockPositionFixedToTop: AppPosition = {
  type: 'fixed-to-top-position',
  payload: {
    offset: { x: 0, y: 0 },
  }
};

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

const mockApp: App = {
  id: 2,
  name: 'Test App2',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionFixedToTop,
  },
  organization_id: 1,
}


describe('FixedToTopPositionStrategy', () => {
  it('Can create a FixedToTopPositionStrategy', () => {
    const strategy = new FixedToTopPositionStrategy();
    const postionProps = strategy.getPositionProps(mockApp);
    expect(strategy.shouldAddNewPosition()).toBeTruthy();
    expect(postionProps).toMatchObject({
      top: '0px',
      left: '0px',
    })
  });

  it('Can not create a FixedToTopPositionStrategy for an app that is not configured with another type', () => {
    const strategy = new FixedToTopPositionStrategy();
    expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
  });

});