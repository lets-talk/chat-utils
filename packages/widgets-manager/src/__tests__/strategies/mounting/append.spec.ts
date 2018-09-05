import { AppendAppStrategy } from './../../../strategies/mounting/append';
import { App } from './../../../types';

const mockApp1: App = {
  id: 1,
  name: 'Test App1',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: {} as any,
  },
  organization_id: 1,
}

const mockApp2: App = {
  id: 2,
  name: 'Test App2',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: {} as any,
  },
  organization_id: 1,
}

describe('AppendAppStrategy', () => {
  it('Can create a AppendAppStrategy', () => {
    const strategy = new AppendAppStrategy();
    const initialApps = [mockApp1];
    const finalApps = strategy.add(mockApp2, initialApps);
    expect(finalApps.length).toBe(2);
    expect(finalApps).toContainEqual(mockApp1);
    expect(finalApps).toContainEqual(mockApp2);
  });
});