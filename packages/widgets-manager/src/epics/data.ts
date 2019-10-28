import { Action, EpicDependencies } from "../store/types";
import { Observable, from, empty } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActionType, syncDataSuccess } from "../store/actions";
import { Epic, ofType } from "redux-observable";
import * as _ from "lodash";

const debug = require('debug')('widgets-manager:epics:data');

/**
 * This Epic help to call a side effect if
 * required when we detect that:
 *  - The stream is in one of the streams we currently have
 * 
 * @param {ActionsObservable<any>} action$
 * @param {Observable<Store>} store$
 * @param {Object} dependencies
 * @return {Observable<any>} Returns a stream that contains an array of actions or an empty stream
 */
const disposableSyncDataSuccessEpic = (state$: any, action: any, dependencies: any): Observable<any> => {
  const { sideEffects, selectors } = dependencies;
  const { selectApps, selectCurrentUserUid, selectMountedApps } = selectors;
  const { updateDocument, unMountApp, mountApp } = sideEffects;

  const uid = selectCurrentUserUid(state$.value);
  const currentApps = selectApps(state$.value);
  const currentMountedApps = selectMountedApps(state$.value);

  const receivedApps = action.payload && action.payload.apps ? action.payload.apps : false;
  const receivedMountedApps = action.payload && action.payload.mounted_apps ? action.payload.mounted_apps : false;

  debug('disposableSyncAppsEpic. action, currentApps', action, currentApps);

  if (receivedApps) {
    // Call side effect
    updateDocument('users', uid, { apps: currentApps });
  }

  if (receivedMountedApps) {
    // Call side effect
    updateDocument('users', uid, { mounted_apps: currentMountedApps });

    const addappsIds = Object.keys(currentMountedApps)
        .filter((k) => currentMountedApps[k])
        .map(Number);

    const removeappsIds = Object.keys(currentMountedApps)
        .filter((k) => !currentMountedApps[k])
        .map(Number);


    debug('disposableSyncDataEpic addapps, removeapps: ', addappsIds, removeappsIds);

    removeappsIds.map((appId: number) => unMountApp(appId));
    addappsIds.map((appId: number) => mountApp(appId));
  }


  return empty();
}

const disposableSyncDataEpic = (state$: any, action: any, dependencies: EpicDependencies): Observable<any> => {
  const { selectors, sideEffects } = dependencies;
  const { selectApps } = selectors;
  const { executeAppMethod } = sideEffects;

  const currentApps = selectApps(state$.value);
  const receivedApps = action.payload && action.payload.apps ? action.payload.apps : false;

  debug('disposableSyncAppsEpic. action, currentApps', action, currentApps);

  if (receivedApps) {
    const difference = _.differenceBy(receivedApps, currentApps, 'payload')
    debug('Difference is:', receivedApps, currentApps, difference);
    difference.forEach((updatedApp: any) => {
      executeAppMethod(updatedApp.slug, 'updateSettings', updatedApp);
    });
  }

  return from([syncDataSuccess(action.payload)]);
}

export const syncDataEpic: Epic = (
  action$: Observable<Action<void>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.SYNC_DATA),
    switchMap((action) => disposableSyncDataEpic(state$, action, dependencies))
  );

export const syncDataSuccessEpic: Epic = (
  action$: Observable<Action<void>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.SYNC_DATA_SUCCESS),
    switchMap((action) => disposableSyncDataSuccessEpic(state$, action, dependencies))
  );
