import { Action, EpicDependencies } from "../store/types";
import { Observable, empty, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActionType, mountAppSuccess, unMountAppSuccess } from "../store/actions";
import { Epic, ofType } from "redux-observable";

const debug = require('debug')('widgets-manager:epics:apps');

export const disposableMountAppEpic = (
  _state$: any,
  action: any,
  _dependencies: EpicDependencies
) : Observable<any> => {
  // In the future we can do some side effect before just dispatching success
  return from([mountAppSuccess(action.payload.appId)]);
}

export const disposableUnMountAppEpic = (
  _state$: any,
  action: any,
  _dependencies: any
) : Observable<any> => {
  // In the future we can do some side effect before just dispatching success
  return from([unMountAppSuccess(action.payload)]);
}

export const disposableMountAppSuccessEpic = (
  state$: any,
  action: any,
  dependencies: EpicDependencies
) : Observable<any> => {
  const { selectors, sideEffects } = dependencies;
  const { selectCurrentUserUid, selectApps } = selectors;
  const { updateDocument } = sideEffects;

  const uid = selectCurrentUserUid(state$.value);
  const apps = selectApps(state$.value);

  debug('disposableMountApp: ', uid, action, apps);
  // Call side effect
  const updatedMountedApps: any = {}
  updatedMountedApps[`${action.payload.appId}`] = true;

  updateDocument('users', uid, { 'mounted_apps': updatedMountedApps });

  return empty();
}

export const disposableUnMountAppSuccessEpic = (
  state$: any,
  action: any,
  dependencies: EpicDependencies
) : Observable<any> => {
  const { selectors, sideEffects } = dependencies;
  const { selectCurrentUserUid, selectApps } = selectors;
  const { updateDocument } = sideEffects;

  const uid = selectCurrentUserUid(state$.value);
  const apps = selectApps(state$.value);

  debug('disposableUnMountApp: ', uid, action, apps);
  const updatedMountedApps: any = {}
  updatedMountedApps[`${action.payload}`] = false;

  updateDocument('users', uid, { 'mounted_apps': updatedMountedApps });

  return empty();
}

export const disposableSetAppsEpic = (
  state$: any,
  action: any,
  dependencies: EpicDependencies
) : Observable<any> => {
  const { selectors, sideEffects } = dependencies;
  const { selectCurrentUserUid } = selectors;
  const { updateDocument } = sideEffects;

  const uid = selectCurrentUserUid(state$.value);

  updateDocument('users', uid, { 'apps': action.payload });

  return empty();
}

export const mountAppEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.MOUNT_APP),
    switchMap((action) => disposableMountAppEpic(state$, action, dependencies))
  );

export const unMountAppEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.UNMOUNT_APP),
    switchMap((action) => disposableUnMountAppEpic(state$, action, dependencies))
  );

export const mountAppSuccessEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.MOUNT_APP_SUCCESS),
    switchMap((action) => disposableMountAppSuccessEpic(state$, action, dependencies))
  );

export const unMountAppSuccessEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.UNMOUNT_APP_SUCCESS),
    switchMap((action) => disposableUnMountAppSuccessEpic(state$, action, dependencies))
  );

export const setAppsEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.SET_APPS),
    switchMap((action) => disposableSetAppsEpic(state$, action, dependencies))
  );
