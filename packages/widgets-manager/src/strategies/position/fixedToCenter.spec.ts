import { AppPosition, App } from './../../types';
import { FixedToCenterPositionStrategy } from './fixedToCenter';

const mockPositionFixedToCenter: AppPosition = {
  type: 'fixed-to-center-position',
  payload: {
    offset: { top: 0, right: 0, bottom: 0, left: 0 },
  }
};

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

const mockApp: App = {
  id: 2,
  name: 'Test App2',
  slug: 'test-app2',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionFixedToCenter,
    size: {} as any,
    queryParams: {} as any,
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}


describe('FixedToCenterPositionStrategy', () => {

  it('can be created', () => {
    expect(() => new FixedToCenterPositionStrategy()).not.toThrow();
  });
  describe('getPositionProps', () => {
    it('Works on valid app', () => {
      const strategy = new FixedToCenterPositionStrategy();
      
      const postionProps = strategy.getPositionProps(mockApp);
      expect(postionProps).toMatchObject({
        top: 'calc(50% + 0px)',
        left: 'calc(50% + 0px)',
      });
    });

    it('Fails on invalid app', () => {
      const strategy = new FixedToCenterPositionStrategy();
      expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
    });
  });

  it('Can not create a FixedToCenterPositionStrategy for an app that is not configured with another type', () => {
    const strategy = new FixedToCenterPositionStrategy();
    expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
  });

  it('shouldAddNewPosition', () => {
    const strategy = new FixedToCenterPositionStrategy();

    expect(strategy.shouldAddNewPosition()).toBeTruthy();
  });

});