import { GridManager } from './grid';
import { AppManager } from './manager';
import { App, ObjectIndex } from "./types";
import { ReplaceAppStrategy } from './strategies/mounting/replace';

import { selectCurrentUserUid } from './selectors/user';
import { selectApps } from './selectors/apps';
import { selectMountedApps } from './selectors/mounted_apps';
import { initializeFirebaseApp } from './utils/firebase';
import { configureStore } from './configureStore';
import { initialState } from './store/initialState';
import { updateDocument } from "./utils/firebase";
import { setApps, mountApp, unMountApp } from './store/actions';

export const setupManager = async (
  registeredApps: App[],
  sideEffects: ObjectIndex<any>,
) => {
  const settings = {
    columns: 3,
    gutter: 10,
    padding: 10,
    positions: [
      'top-left',
      'top-center',
      'top-right',
      'mid-left',
      'mid-center',
      'mid-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]
  };
  const replaceAppStrategy = new ReplaceAppStrategy();
  const gridManager = new GridManager(settings, window, replaceAppStrategy);
  const appManager = new AppManager(registeredApps, gridManager);

  // @ts-ignore
  const store = configureStore(initialState, {
    selectors: {
      selectApps,
      selectMountedApps,
      selectCurrentUserUid,
    },
    sideEffects: {
      // Apps
      mountApp: appManager.mountApp,
      unMountApp: appManager.unMountApp,
      executeAppMethod: sideEffects.executeAppMethod,
      // Firebase
      updateDocument,
    }
  });

  await initializeFirebaseApp(store);
  store.dispatch(setApps(registeredApps));

  return {
    mountApp: (appId: number, initialData: any) => store.dispatch(mountApp(appId, initialData)),
    unMountApp: (appId: number) => store.dispatch(unMountApp(appId)),
    getAppByName: appManager.getAppByName,
    getAllAppsForNamespace: appManager.getAllAppsForNamespace,
    updateAllAppSettings: appManager.updateAllAppSettings,
  };
};