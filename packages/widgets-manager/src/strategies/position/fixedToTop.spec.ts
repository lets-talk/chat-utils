import { AppPosition, App } from './../../types';
import { FixedToTopPositionStrategy } from './fixedToTop';

const mockPositionFixedToTop: AppPosition = {
  type: 'fixed-to-top-position',
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
  slug: 'test-ap2',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionFixedToTop,
    size: {} as any,
    queryParams: {} as any,
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
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