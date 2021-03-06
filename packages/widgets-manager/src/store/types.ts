import { Observable } from "rxjs";
import { ActionType } from "./actions";
import { App, ObjectIndex } from "../types";

/**
 * The application state interface.
 * Here we declare what data will be stored in our application state.
 */
export interface ApplicationState {
  readonly apps: App[];
  readonly mounted_apps: ObjectIndex<number>;
  readonly user: any;
  readonly initial_data: ObjectIndex<any>;
}


/**
 * Reducers specify how the application's state changes in response to actions.
 * (prevState, action) => newState
 */
export type Reducer = (
  previousState: ApplicationState,
  action: Action
) => ApplicationState;

export type EpicDependencies = {
  selectors: {
    selectCurrentUserUid: (state: ApplicationState) => any,
    selectApps: (state: ApplicationState) => any,
  },
  sideEffects: {
    mountApp: (appName: string) => void,
    unMountApp: (appName: string) => void,
    updateDocument: (collectionName: string, documentId: string, data: any) => void,
    executeAppMethod: (appSlug: string, method: string, data: any) => void
  }
}
/**
 * Epic is a function which takes an Observable of actions and returns an Observable of actions.
 * Actions in, actions out, simple as that.
 */
export type Epic = (
  action$: Observable<Action>,
  state$?: Observable<ApplicationState>,
  dependencies?: EpicDependencies,
) => Observable<Action>;

/**
 * ActionCreator is a function that can take any number of arguments and must return an Action
 */
export type ActionCreator<T = any> = (
  arg1?: any,
  arg2?: any,
  arg3?: any,
  arg4?: any,
  arg5?: any,
  ...rest: any[]
) => Action<T>;

/**
 * Action interface
 */
export interface Action<T = any> {
  type: ActionType;
  payload?: T;
}

export interface ActionWithPayload<T = any> {
  type: ActionType;
  payload: T;
}

export interface MountAppAction {
  appName: string;
  initialData: ObjectIndex<any>;
}


