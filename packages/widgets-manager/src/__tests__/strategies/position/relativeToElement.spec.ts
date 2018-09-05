import { RelativeToElementPositionStrategy } from './../../../strategies/position/relativeToElement';
import { AppPosition, HTMLFloatType, App } from './../../../types';

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
  it('Can create a RelativeToElementPosition', () => {
    const strategy = new RelativeToElementPositionStrategy();
    const postionProps = strategy.getPositionProps(mockApp);
    expect(strategy.shouldAddNewPosition()).toBeTruthy();
    expect(postionProps).toMatchObject({
      left: '0px',
      top: 'calc(200px - 20px)',
    })
  });

  it('Can not create a RelativeToElementPositionStrategy for an app that is not configured with another type', () => {
    const strategy = new RelativeToElementPositionStrategy();
    expect(() => strategy.getPositionProps(mockFailingApp)).toThrow();
  });

});