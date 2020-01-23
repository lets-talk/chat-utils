import { createSelector } from "reselect"
import { selectAppsInitialData } from "./initial_data";
import { App } from "../types";
import { selectMountedApps } from "./mounted_apps";

const debug = require('debug')('widgets-manager:selectors:apps');

const getAllApps = (state: any) => state.apps;

const selectApps = createSelector(
  getAllApps,
  selectAppsInitialData,
  (apps, appsInitialData) => {
    return apps.map((app: App) => {
      const appInitialData = appsInitialData[app.slug] || {};
      debug('selectApps. app, appsInitialData, appInitialData:', app, appsInitialData, appInitialData);
      return ({ ...app, initialData: appInitialData});
    });
  }
);

const selectCurrentlyMountedApps = createSelector(
  getAllApps,
  selectAppsInitialData,
  selectMountedApps,
  (apps, appsInitialData, mountedApps) => {
    return apps
    .filter((app:App) => Boolean(mountedApps[app.slug]))
    .map((app: App) => {
      const appInitialData = appsInitialData[app.slug] || {};
      debug('selectApps. app, appsInitialData, appInitialData:', app, appsInitialData, appInitialData);
      return ({ ...app, initialData: appInitialData});
    });
  }
);


export {
  selectApps,
  selectCurrentlyMountedApps,
}
