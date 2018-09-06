import { RelativeToElementPositionStrategy } from './relativeToElement';
import { AppPosition, HTMLFloatType, App } from './../../types';

const mockPositionRelativeToElement: AppPosition = {
  type: 'relative-to-element',
  payload: {
    floatType: HTMLFloatType.fixed,
    relativeId: 'mockElement',
    offset: { x: 0, y: 0 },
  }
};

const mockApp: App = {
  id: 1,
  name: 'Test App',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {
      height: '20px',
    },
    position: mockPositionRelativeToElement,
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


describe('RelativeToElementPosition', () => {
  it('can be created', () => {
    expect(() => new RelativeToElementPositionStrategy()).not.toThrow();
  });

  describe('getPositionProps', () => {
    it('Works on valid app', () => {
      const strategy = new RelativeToElementPositionStrategy();
      const postionProps = strategy.getPositionProps(mockApp);
  
      expect(postionProps).toMatchObject({
        left: '0px',
        top: 'calc(200px - 20px)',
      });
    });
  
    it('Fails on invalid app', () => {
      const strategy = new RelativeToElementPositionStrategy();
      expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
    });
  });

  it('shouldAddNewPosition', () => {
    const strategy = new RelativeToElementPositionStrategy();

    expect(strategy.shouldAddNewPosition()).toBeTruthy();
  });
});