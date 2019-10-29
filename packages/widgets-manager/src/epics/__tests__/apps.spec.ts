import {
  rootEpic,
} from "../index";

import {
  setApps,
  mountAppSuccess,
  unMountAppSuccess,
  mountApp,
} from "../../store/actions";

import { createEpicMiddleware } from 'redux-observable';
// import configureMockStore from 'redux-mock-store';
import configureMockStore from '@jedmao/redux-mock-store';
const mockApps = [
  { id: 1, slug: 'App1'},
  { id: 2, slug: 'App2'},
  { id: 3, slug: 'App3'},
]
const mockSelectCurrentUserId = () => 'uid-12345';
const mockSelectApps = () => (mockApps);
const mockUpdateDocument = jest.fn();

const makeMockStore = () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      selectors: {
        selectCurrentUserUid: mockSelectCurrentUserId,
        selectApps: mockSelectApps,
      },
      sideEffects: {
        updateDocument: mockUpdateDocument,
      }
    }
  });
  const mockStore: any = configureMockStore([epicMiddleware])();
  epicMiddleware.run(rootEpic);
  return mockStore;
};

describe('setAppsEpic', () => {
  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const setAppsAction = setApps(mockApps);
      store.dispatch(setAppsAction);
      const [dispatchedSetAppsAction] = store.getActions();

      expect(dispatchedSetAppsAction).toBe(setAppsAction);
  });

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const setAppsAction = setApps(mockApps);
    store.dispatch(setAppsAction);
    const [, , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

  it('Calls updateDocument sideEffect', () => {
    const store = makeMockStore();

    const setAppsAction = setApps(mockApps);
    store.dispatch(setAppsAction);

    expect(mockUpdateDocument).toBeCalledWith(
      'users', 'uid-12345', { 'apps': mockApps }
    );
  });
});

describe('mountAppSuccessEpic', () => {

  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const mountAppSuccessAction = mountAppSuccess(1);
      store.dispatch(mountAppSuccessAction);
      const [dispatchedMountAppSuccessAction] = store.getActions();

      expect(dispatchedMountAppSuccessAction).toBe(mountAppSuccessAction);
  });

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const setAppsAction = mountAppSuccess(1);
    store.dispatch(setAppsAction);
    const [, , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

  it('Calls updateDocument sideEffect', () => {
    const store = makeMockStore();

    const setAppsAction = mountAppSuccess(1);
    store.dispatch(setAppsAction);

    expect(mockUpdateDocument).toBeCalledWith(
      'users', 'uid-12345', { 'mounted_apps': { 1: true } }
    );
  });
});

describe('unMountAppSuccessEpic', () => {

  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const mockAppId = 2;
      const unMountAppSuccessAction = unMountAppSuccess(mockAppId);
      store.dispatch(unMountAppSuccessAction);
      const [dispatchedUnMountAppSuccessAction] = store.getActions();

      expect(dispatchedUnMountAppSuccessAction).toBe(unMountAppSuccessAction);
  });

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const mockAppId = 2;
    const unMountAppSuccessAction = unMountAppSuccess(mockAppId);
    store.dispatch(unMountAppSuccessAction);
    const [, , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

  it('Calls updateDocument sideEffect', () => {
    const store = makeMockStore();

    const mockAppId = 2;
    const unMountAppSuccessAction = unMountAppSuccess(mockAppId);
    store.dispatch(unMountAppSuccessAction);

    expect(mockUpdateDocument).toBeCalledWith(
      'users', 'uid-12345', { 'mounted_apps': { 2: false } }
    );
  });
});

describe('mountAppEpic', () => {

  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const mockAppId = 1;
      const mountAppAction = mountApp(mockAppId);
      store.dispatch(mountAppAction);
      const [dispatchedmountAppAction] = store.getActions();

      expect(dispatchedmountAppAction).toBe(mountAppAction);
  });

  it('Dispatches the extra action indicating success', () => {
    const store = makeMockStore();

    const mockAppId = 1;
    const mountAppAction = mountApp(mockAppId);
    store.dispatch(mountAppAction);
    const [ , dispatchesMountAppSuccessAction] = store.getActions();

    expect(dispatchesMountAppSuccessAction).toMatchObject(
      mountAppSuccess(1)
    );
});

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const mockAppId = 1;
    const mountAppAction = mountApp(mockAppId);
    store.dispatch(mountAppAction);
    const [, , , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

  it('Calls updateDocument sideEffect', () => {
    const store = makeMockStore();

    const setAppsAction = mountAppSuccess(1);
    store.dispatch(setAppsAction);

    expect(mockUpdateDocument).toBeCalledWith(
      'users', 'uid-12345', { 'mounted_apps': { 1: true } }
    );
  });
});