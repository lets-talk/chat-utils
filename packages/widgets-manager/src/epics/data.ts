import { Action, EpicDependencies } from "../store/types";
import { Observable, from, empty } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActionType, syncDataSuccess } from "../store/actions";
import { Epic, ofType } from "redux-observable";
import { differenceBy } from "lodash";

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
  const { selectApps, selectCurrentUserUid, selectMountedApps, selectAppsInitialData } = selectors;
  const { updateDocument, unMountApp, mountApp } = sideEffects;

  const uid = selectCurrentUserUid(state$.value);
  const currentApps = selectApps(state$.value);
  const currentMountedApps = selectMountedApps(state$.value);
  const appsInitialData = selectAppsInitialData(state$.value);

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

    const addAppsNames = Object.keys(currentMountedApps)
        .filter((k) => currentMountedApps[k]);

    const removeAppsNames = Object.keys(currentMountedApps)
        .filter((k) => !currentMountedApps[k]);


    debug('disposableSyncDataEpic addAppsNames, removeAppsNames: ', addAppsNames, removeAppsNames);

    removeAppsNames.map((appName: string) => unMountApp(appName));
    addAppsNames.map((appName: string) => {
      const appInitialData = appsInitialData[appName] || {};
      mountApp(appName, appInitialData)
    });
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
    const difference = differenceBy(receivedApps, currentApps, 'payload')
    debug('Difference is:', receivedApps, currentApps, difference);
    difference.forEach((updatedApp: any) => {
      executeAppMethod(updatedApp.slug, 'updateSettings', updatedApp);
    });
  }

  return from([syncDataSuccess(action.payload)]);
}

export const syncDataEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.SYNC_DATA),
    switchMap((action) => disposableSyncDataEpic(state$, action, dependencies))
  );

export const syncDataSuccessEpic: Epic = (
  action$: Observable<Action<any>>,
  state$: any,
  dependencies: EpicDependencies,
) =>
  action$.pipe(
    ofType(ActionType.SYNC_DATA_SUCCESS),
    switchMap((action) => disposableSyncDataSuccessEpic(state$, action, dependencies))
  );
