import {
  rootEpic,
} from "../index";

import {
  syncDataSuccess,
} from "../../store/actions";

import { createEpicMiddleware } from 'redux-observable';
// import configureMockStore from 'redux-mock-store';
import configureMockStore from '@jedmao/redux-mock-store';
const mockApps = [
  { id: 1, slug: 'App1'},
  { id: 2, slug: 'App2'},
  { id: 3, slug: 'App3'},
];
const mockMountedApps = { 'App1': false, 'App2': true, 'App3': false };
const mockSelectCurrentUserId = () => 'uid-12345';
const mockSelectApps = () => (mockApps);
const mockSelectMountedApps = () => (mockMountedApps);
const mockSelectAppsInitialData = () => ({ 'App1': { metadata: { vip: true }}});
const mockUpdateDocument = jest.fn();
const mockMountApp = jest.fn();
const mockUnMountApp = jest.fn();

const makeMockStore = () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      selectors: {
        selectCurrentUserUid: mockSelectCurrentUserId,
        selectApps: mockSelectApps,
        selectMountedApps: mockSelectMountedApps,
        selectAppsInitialData: mockSelectAppsInitialData,
      },
      sideEffects: {
        updateDocument: mockUpdateDocument,
        mountApp: mockMountApp,
        unMountApp: mockUnMountApp,
      }
    }
  });
  const mockStore: any = configureMockStore([epicMiddleware])();
  epicMiddleware.run(rootEpic);
  return mockStore;
};

describe('syncDataSuccessEpic', () => {
  beforeEach(() => {
    mockUpdateDocument.mockClear();
    mockMountApp.mockClear();
    mockUnMountApp.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const mockSyncApps = [
        { id: 1, slug: 'App1' },
        { id: 4, slug: 'App4' }
      ];
      
      const mockSyncMountedApps = { 'App1': false, 'App4': true };

      const syncDataSuccessAction = syncDataSuccess({
        apps: mockSyncApps,
        mounted_apps: mockSyncMountedApps,
      });
      store.dispatch(syncDataSuccessAction);
      const [dispatchedSetAppsAction] = store.getActions();

      expect(dispatchedSetAppsAction).toBe(syncDataSuccessAction);
  });

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const mockSyncApps = [
      { id: 1, slug: 'App1' },
      { id: 4, slug: 'App4' }
    ];
    
    const mockSyncMountedApps = { 'App1': false, 'App4': true };

    const syncDataSuccessAction = syncDataSuccess({
      apps: mockSyncApps,
      mounted_apps: mockSyncMountedApps,
    });
    store.dispatch(syncDataSuccessAction);
    const [, , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

  it('Calls updateDocument sideEffect for updating apps', () => {
    const store = makeMockStore();

    const mockSyncApps = [
      { id: 1, slug: 'App1' },
      { id: 4, slug: 'App4' }
    ];
    
    const mockSyncMountedApps = { 'App1': false, 'App4': true };

    const syncDataSuccessAction = syncDataSuccess({
      apps: mockSyncApps,
      mounted_apps: mockSyncMountedApps,
    });
    store.dispatch(syncDataSuccessAction);

    expect(mockUpdateDocument).toBeCalledWith(
      'users', 'uid-12345', { 'apps': mockApps }
    );
  });

  it('Calls updateDocument sideEffect for updating mounted_apps', () => {
    const store = makeMockStore();

    const mockSyncApps = [
      { id: 1, slug: 'App1' },
      { id: 4, slug: 'App4' }
    ];
    
    const mockSyncMountedApps = { 'App1': false, 'App4': true };

    const syncDataSuccessAction = syncDataSuccess({
      apps: mockSyncApps,
      mounted_apps: mockSyncMountedApps,
    });
    store.dispatch(syncDataSuccessAction);

    expect(mockUpdateDocument).toBeCalledWith(
      'users', 'uid-12345', { 'mounted_apps': mockMountedApps }
    );
  });

  describe('Calls mountApp sideEffect for mounting necessary apps', () => {
    beforeEach(() => {
      const store = makeMockStore();

      const syncDataSuccessAction = syncDataSuccess({
        apps: mockApps,
        mounted_apps: mockMountedApps,
      });
      store.dispatch(syncDataSuccessAction);
    });
    
    it('Calls mountApp sideEffect only the number of mounted apps', () => {
      expect(mockMountApp).toBeCalledTimes(1);
    });

    it('Calls mountApp sideEffect for mounting necessary apps', () => {
      expect(mockMountApp).toBeCalledWith('App2', {});
    });
  });

  describe('Calls unMountApp sideEffect for mounting necessary apps', () => {
    beforeEach(() => {
      const store = makeMockStore();
      const syncDataSuccessAction = syncDataSuccess({
        apps: mockApps,
        mounted_apps: mockMountedApps,
      });
      store.dispatch(syncDataSuccessAction);
    });
    
    it('Calls unMountApp sideEffect for each app that requires unmount', () => {
      expect(mockUnMountApp).toBeCalledTimes(2);
    });

    it('Calls unMount sideEffect for mounting necessary apps', () => {
      expect(mockUnMountApp).toBeCalledWith('App1');
    });
    
    it('Calls unMount sideEffect for mounting necessary apps', () => {
      expect(mockUnMountApp).toBeCalledWith('App3');
    });
  });
});
