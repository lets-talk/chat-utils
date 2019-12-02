import { combineEpics } from 'redux-observable';
import { setAppsEpic, mountAppEpic, mountAppSuccessEpic, unMountAppEpic, unMountAppSuccessEpic } from "./apps";
import { syncDataEpic, syncDataSuccessEpic } from './data';

export const rootEpic = combineEpics(
  mountAppEpic,
  unMountAppEpic,
  mountAppSuccessEpic,
  unMountAppSuccessEpic,
  setAppsEpic,
  syncDataEpic,
  syncDataSuccessEpic,
);
