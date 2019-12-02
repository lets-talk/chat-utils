import { Action } from "../store/types";
import { ActionType } from "../store/actions";
import { App, ObjectIndex } from "../types";

export const initialState = {};

const syncMountedAppsReducer: any = (
  previousState: ObjectIndex<App> = initialState,
  action: Action<any>// action.payload = app object
): App[] => {
  return action.payload.mounted_apps ? action.payload.mounted_apps : previousState;
};

const mountAppSuccessReducer: any = (
  previousState: ObjectIndex<App> = initialState,
  action: Action<{ appId: number }>// action.payload = app id
): App[] => {
  const updatedData: any = {}
  if (action.payload) {
    updatedData[`${action.payload.appId}`] = true;
  }

  const newMountedApps = { ...previousState, ...updatedData };

  return newMountedApps;
};

const unmountAppSuccessReducer: any = (
  previousState: ObjectIndex<App> = initialState,
  action: Action<number>// action.payload = appId
): App[] => {
  const updatedData: any = {}
  if (action.payload) {
    updatedData[`${action.payload}`] = false;
  }

  const newMountedApps = { ...previousState, ...updatedData };

  return newMountedApps;
};

/**
 * The Application Reducer
 * @param state: current application state
 * @param action: the current action fired in the application
 * @returns state: the new application state
 */
const reducer: any = (
  prevState: ObjectIndex<App> = initialState,
  action: Action
): ObjectIndex<App> => {
  switch (action.type) {
    case ActionType.SYNC_DATA:
      return syncMountedAppsReducer(prevState, action);
    case ActionType.MOUNT_APP_SUCCESS:
      return mountAppSuccessReducer(prevState, action);
    case ActionType.UNMOUNT_APP_SUCCESS:
      return unmountAppSuccessReducer(prevState, action);
  }

  return prevState;
};

export default reducer;

