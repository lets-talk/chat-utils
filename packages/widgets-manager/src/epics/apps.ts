import { Action, EpicDependencies } from "../store/types";
import { Observable, empty, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActionType, mountAppSuccess, unMountAppSuccess } from "../store/actions";
import { Epic, ofType } from "redux-observable";

export const disposableMountAppEpic = (
  _state$: any,
  action: any,
  _dependencies: EpicDependencies
) : Observable<any> => {
  // In the future we can do some side effect before just dispatching success
  return from([mountAppSuccess(action.payload.appName)]);
}

export const disposableUnMountAppEpic = (
  _state$: any,
  action: any,
  dependencies: any
) : Observable<any> => {
  const { sideEffects } = dependencies;
  const { unMountApp } = sideEffects;
  unMountApp(action.payload);
  // In the future we can do some side effect before just dispatching success
  return from([unMountAppSuccess(action.payload)]);
}

export const disposableMountAppUpdateEpic = (
  _state$: any,
  action: any,
  dependencies: EpicDependencies
) : Observable<any> => {
  const { sideEffects } = dependencies;
  const { mountApp } = sideEffects;

  // Call side effect
  mountApp(action.payload.appName);

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
) => {
  return action$.pipe(
    ofType(ActionType.MOUNT_APP_SUCCESS),
    switchMap((action) => disposableMountAppUpdateEpic(state$, action, dependencies))
  );
}

export const unMountAppSuccessEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) => {
  return action$.pipe(
    ofType(ActionType.UNMOUNT_APP_SUCCESS),
    switchMap((action) => disposableMountAppUpdateEpic(state$, action, dependencies))
  );
}
