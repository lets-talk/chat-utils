import { AppPosition, App } from './../../types';
import { FixedToTopPositionStrategy } from './fixedToTop';

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

  it('can be created', () => {
    expect(() => new FixedToTopPositionStrategy()).not.toThrow();
  });
  describe('getPositionProps', () => {
    it('Works on valid app', () => {
      const strategy = new FixedToTopPositionStrategy();
      
      const postionProps = strategy.getPositionProps(mockApp);
      expect(postionProps).toMatchObject({
        top: '0px',
        left: '0px',
      });
    });

    it('Fails on invalid app', () => {
      const strategy = new FixedToTopPositionStrategy();
      expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
    });
  });

  it('Can not create a FixedToTopPositionStrategy for an app that is not configured with another type', () => {
    const strategy = new FixedToTopPositionStrategy();
    expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
  });

  it('shouldAddNewPosition', () => {
    const strategy = new FixedToTopPositionStrategy();

    expect(strategy.shouldAddNewPosition()).toBeTruthy();
  });

});