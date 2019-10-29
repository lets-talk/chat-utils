import { ActionCreator } from "./types";
import { action } from "./utils";
import { App } from "../types";

/**
 * Here we declare the application action names
 */
export enum ActionType {
  UPDATE_USER_DATA = "@@actions/UPDATE_USER_DATA",
  SYNC_DATA = "@@actions/SYNC_DATA",
  SYNC_DATA_SUCCESS = "@@actions/SYNC_DATA_SUCCESS",
  MOUNT_APP = "@@actions/MOUNT_APP",
  MOUNT_APP_SUCCESS = "@@actions/MOUNT_APP_SUCCESS",
  UNMOUNT_APP = "@@actions/UNMOUNT_APP",
  UNMOUNT_APP_SUCCESS = "@@actions/UNMOUNT_APP_SUCCESS",
  GET_APPS = "@@actions/GET_APPS",
  GET_APPS_SUCCESS = "@@actions/GET_APPS_SUCCESS",
  SET_APPS = "@@actions/SET_APPS",
}

/**
 * Action creators
 */
export const mountApp: ActionCreator<string> = (appId: number, initialData: any) =>
  action<string>(ActionType.MOUNT_APP, { appId, initialData });

export const mountAppSuccess: ActionCreator<string> = (appId: number) =>
  action<string>(ActionType.MOUNT_APP_SUCCESS, { appId });

export const unMountApp: ActionCreator<string> = (appId: number) =>
  action<string>(ActionType.UNMOUNT_APP, appId);

export const unMountAppSuccess: ActionCreator<string> = (appId: number) =>
  action<string>(ActionType.UNMOUNT_APP_SUCCESS, appId);

export const syncData: ActionCreator<string> = (data: any) =>
  action<string>(ActionType.SYNC_DATA, data);

export const syncDataSuccess: ActionCreator<string> = (data: any) =>
  action<string>(ActionType.SYNC_DATA_SUCCESS, data);

export const getApps: ActionCreator<void> = () =>
  action<void>(ActionType.GET_APPS);

export const getAppsSuccess: ActionCreator<App[]> = (apps: App[]) =>
  action<any[]>(ActionType.GET_APPS_SUCCESS, apps);

export const setApps: ActionCreator<string> = (apps: App[]) =>
  action<string>(ActionType.SET_APPS, apps);

export const updateUserData: ActionCreator<string> = (firebaseUser: any) => {
  return action<string>(ActionType.UPDATE_USER_DATA, {
      uid: firebaseUser.uid,
      isAnonymous: firebaseUser.isAnonymous,
      metadata: firebaseUser.metadata,
  });
}