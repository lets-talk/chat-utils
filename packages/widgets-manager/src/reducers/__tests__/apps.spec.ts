import appsReducer, { initialState } from '../apps';
import {
  setApps,
  syncDataSuccess
} from '../../store/actions';

describe('When it recieves setApps action', () => {
  it('Should set the received apps', () => {
    const mockApps = [
      { id: 1, name: 'app1' },
      { id: 2, name: 'app2' },
      { id: 3, name: 'app3' },
    ];
    const actionToTest = setApps(mockApps);

    const stateAfterReducer = appsReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual(expect.arrayContaining(mockApps));
  });
});

describe('When it recieves syncDataSuccess action', () => {
  it('Should sync the received apps', () => {
    const mockApps = [
      { id: 1, name: 'app1' },
      { id: 2, name: 'app2' },
      { id: 3, name: 'app3' },
    ];
    const actionToTest = syncDataSuccess({ apps: mockApps });

    const stateAfterReducer = appsReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual(expect.arrayContaining(mockApps));
  });
});

describe('When invalid action type', () => {
  it('Should not change the state', () => {
    const actionToTest = { type: 'INVALID' };

    const stateAfterReducer = appsReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual(initialState);
  });
});
