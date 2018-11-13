import { RelativeToElementPositionStrategy } from './relativeToElement';
import { AppPosition, HTMLFloatType, App } from './../../types';

const mockPositionRelativeToElement: AppPosition = {
  type: 'relative-to-element',
  payload: {
    floatType: HTMLFloatType.fixed,
    relativeId: 'mockElement',
    offsetX: {
      relationType: 'LL',
      value: 0,
    },
    offsetY: {
      relationType: 'BT',
      value: 0,
    }
  }
};

const mockApp: App = {
  id: 1,
  name: 'Test App',
  slug: 'test-app',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    size: {
      width: '100%',
      height: '20px',
    },
    position: mockPositionRelativeToElement,
  },
  organization_id: 1,
  source: '',
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
    size: { 
      width: '0px',
      height: '0px'
    }
  },
  organization_id: 1,
  source: '',
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
        bottom: '568px',
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