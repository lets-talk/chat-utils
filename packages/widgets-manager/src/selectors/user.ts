import { createSelector } from 'reselect';

const selectUser = (state: any) => state.user;

const selectCurrentUserUid = createSelector(
  selectUser,
  (user) => user.uid,
);

export {
  selectCurrentUserUid,
}
