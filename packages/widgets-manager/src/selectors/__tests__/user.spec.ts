import { selectCurrentUserUid } from '../user';

describe('selectCurrentUserUid', () => {
  it('Get the current user uid', () => {
    const mockCurrentUser = {
      uid: '1234567',
    }

    const mockState = {
      user: mockCurrentUser,
    }

    const uuid = selectCurrentUserUid(mockState);

    expect(uuid).toEqual('1234567');
  });
});

