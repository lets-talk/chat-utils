import { combineEpics } from 'redux-observable';
import { mountAppEpic, mountAppSuccessEpic, unMountAppEpic, unMountAppSuccessEpic } from "./apps";

export const rootEpic = combineEpics(
  mountAppEpic,
  unMountAppEpic,
  mountAppSuccessEpic,
  unMountAppSuccessEpic,
);
