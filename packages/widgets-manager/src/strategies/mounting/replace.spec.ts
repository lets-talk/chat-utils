import { ReplaceAppStrategy } from './replace';
import { App } from './../../types';

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
  source: '',
}

describe('ReplaceAppStrategy', () => {
  it('can be created', () => {
    expect(() => new ReplaceAppStrategy()).not.toThrow();
  });

  it('replaces apps', () => {
    const strategy = new ReplaceAppStrategy();
    const finalApps = strategy.add(mockApp2);
    expect(finalApps.length).toBe(1);
    expect(finalApps).toContainEqual(mockApp2);
  });
});
