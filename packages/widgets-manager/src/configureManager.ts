import { GridManager } from './grid';
import { AppManager } from './manager';
import { App, ObjectIndex } from "./types";
import { ReplaceAppStrategy } from './strategies/mounting/replace';

import { selectCurrentUserUid } from './selectors/user';
import { selectApps } from './selectors/apps';
import { selectMountedApps } from './selectors/mounted_apps';
import { selectAppsInitialData } from './selectors/initial_data';
import { configureStore } from './configureStore';
import { initialState } from './store/initialState';
import { mountApp, unMountApp, setAppsInitialData } from './store/actions';

export const setupManager = async (
  registeredApps: App[],
  appsInitialData: ObjectIndex<any>,
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
  const appManager = new AppManager(gridManager);

  // @ts-ignore
  const store = configureStore({ ...initialState, apps: registeredApps }, {
    selectors: {
      selectApps,
      selectMountedApps,
      selectCurrentUserUid,
      selectAppsInitialData,
    },
    sideEffects: {
      // Apps
      mountApp: appManager.mountApp,
      unMountApp: appManager.unMountApp,
      executeAppMethod: sideEffects.executeAppMethod,
    }
  });

  appManager.initialize(store);

  store.dispatch(setAppsInitialData(appsInitialData));

  return {
    mountApp: (appName: string, initialData: any) => store.dispatch(mountApp(appName, initialData)),
    unMountApp: (appName: string) => store.dispatch(unMountApp(appName)),
    getAppByName: appManager.getAppByName,
    getAllAppsForNamespace: appManager.getAllAppsForNamespace,
    getMountedApps: appManager.getMountedApps,
    updateAllAppSettings: appManager.updateAllAppSettings,
  };
};
