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
const mockMountApp = jest.fn();

const makeMockStore = () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      selectors: {
        selectCurrentUserUid: mockSelectCurrentUserId,
        selectApps: mockSelectApps,
      },
      sideEffects: {
        updateDocument: mockUpdateDocument,
        mountApp: mockMountApp,
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
});

describe('mountAppSuccessEpic', () => {

  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const mountAppSuccessAction = mountAppSuccess('App1');
      store.dispatch(mountAppSuccessAction);
      const [dispatchedMountAppSuccessAction] = store.getActions();

      expect(dispatchedMountAppSuccessAction).toBe(mountAppSuccessAction);
  });

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const setAppsAction = mountAppSuccess('App1');
    store.dispatch(setAppsAction);
    const [, , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

});

describe('unMountAppSuccessEpic', () => {

  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const unMountAppSuccessAction = unMountAppSuccess('App2');
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
});

describe('mountAppEpic', () => {

  beforeEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('Dispatches the action correctly', () => {
      const store = makeMockStore();

      const mountAppAction = mountApp('App1');
      store.dispatch(mountAppAction);
      const [dispatchedmountAppAction] = store.getActions();

      expect(dispatchedmountAppAction).toBe(mountAppAction);
  });

  it('Dispatches the extra action indicating success', () => {
    const store = makeMockStore();

    const mountAppAction = mountApp('App1');
    store.dispatch(mountAppAction);
    const [ , dispatchesMountAppSuccessAction] = store.getActions();

    expect(dispatchesMountAppSuccessAction).toMatchObject(
      mountAppSuccess('App1')
    );
});

  it('Does not dispatch extra actions', () => {
    const store = makeMockStore();

    const mountAppAction = mountApp('App1');
    store.dispatch(mountAppAction);
    const [, , , ...rest] = store.getActions();

    expect(rest.length).toBe(0);
  });

  it('Calls mountApp sideEffect', () => {
    const store = makeMockStore();

    const setAppsAction = mountApp('App1');
    store.dispatch(setAppsAction);

    expect(mockMountApp).toBeCalledWith('App1');
  });
});