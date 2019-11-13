import mountedAppReducer, { initialState } from '../mounted_apps';
import {
  syncData,
  mountAppSuccess,
  unMountAppSuccess,
} from '../../store/actions';

describe('When it recieves syncData action', () => {
  it('Should set the received mounted_apps', () => {
    const mockMountedApps = {
      1: true,
      2: false,
      3: true,
    };

    const actionToTest = syncData({ mounted_apps: mockMountedApps });

    const stateAfterReducer = mountedAppReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual(mockMountedApps);
  });
});

describe('When it recieves mountAppSuccess action', () => {
  describe('When app first mounted', () => {
    it('Should correctly set the mounted App', () => {
      const mockInitialState = {};
  
      const actionToTest = mountAppSuccess(2);
  
      const stateAfterReducer = mountedAppReducer(mockInitialState, actionToTest);
  
      expect(stateAfterReducer).toEqual({
        2: true,
      });
    });
  });

  describe('When app was previously unmounted', () => {
    it('Should correctly set the mounted App', () => {
      const mockInitialState = {
        1: true,
        2: false,
        3: true,
      };
  
      const actionToTest = mountAppSuccess(2);
  
      const stateAfterReducer = mountedAppReducer(mockInitialState, actionToTest);
  
      expect(stateAfterReducer).toEqual({
        1: true,
        2: true,
        3: true,
      });
    });
  });
});

describe('When it recieves unMountAppSuccess action', () => {
  describe('When app first unmounted', () => {
    it('Should correctly set the unmounted App', () => {
      const mockInitialState = {};
  
      const actionToTest = unMountAppSuccess(2);
  
      const stateAfterReducer = mountedAppReducer(mockInitialState, actionToTest);
  
      expect(stateAfterReducer).toEqual({
        2: false,
      });
    });
  });

  describe('When app was previously unmounted', () => {
    it('Should correctly set the unmounted App', () => {
      const mockInitialState = {
        1: true,
        2: true,
        3: true,
      };
  
      const actionToTest = unMountAppSuccess(2);
  
      const stateAfterReducer = mountedAppReducer(mockInitialState, actionToTest);

      expect(stateAfterReducer).toEqual({
        1: true,
        2: false,
        3: true,
      });
    });
  });
});

describe('When invalid action type', () => {
  it('Should not change the state', () => {
    const actionToTest = { type: 'INVALID' };

    const stateAfterReducer = mountedAppReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual(initialState);
  });
});
