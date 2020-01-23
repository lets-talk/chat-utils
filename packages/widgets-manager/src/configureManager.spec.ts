import { App } from "./types";
import { setupManager, } from './configureManager';

describe('configureManager', () => {
  it('Returns an object with all the required public methods', async () => {
    const mockRegisteredApps: App[] = [];
    const mockInitialData = {};
    const mockSideEffects = {};

    const manager = await setupManager(mockRegisteredApps, mockInitialData, mockSideEffects);
    expect(manager).toMatchObject({
      mountApp: expect.any(Function),
      unMountApp: expect.any(Function),
      getAppByName: expect.any(Function),
      getAllAppsForNamespace: expect.any(Function),
      getMountedApps: expect.any(Function),
      updateAllAppSettings: expect.any(Function),
    })
  });
});
