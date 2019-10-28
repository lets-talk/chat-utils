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
}


/**
 * Reducers specify how the application's state changes in response to actions.
 * (prevState, action) => newState
 */
export type Reducer = (
  previousState: ApplicationState,
  action: Action
) => ApplicationState;

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

