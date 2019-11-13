import userReducer, { initialState } from '../user';
import { updateUserData } from '../../store/actions';

describe('When it recieves updateUserData action', () => {
  it('Should update the user in the app', () => {
    const mockUser = {
      uid: 'uid123',
      name: 'Sandino',
      metadata: { vip: true },
      isAnonymous: true,
      extra_param1: 'something1',
      extra_param2: 'something2',
    };
    const actionToTest = updateUserData(mockUser);

    const stateAfterReducer = userReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual({
      uid: 'uid123',
      isAnonymous: true,
      metadata: { vip: true },
    });
  });
});

describe('When invalid action type', () => {
  it('Should not change the state', () => {
    const actionToTest = { type: 'INVALID' };

    const stateAfterReducer = userReducer(initialState, actionToTest);

    expect(stateAfterReducer).toEqual(initialState);
  });
});
