import { Action } from "../store/types";
import { ActionType } from "../store/actions";
import { App } from "../types";

export const initialState = [];

const syncAppsReducer: any = (
  previousState: App[] = initialState,
  action: Action<any>// action.payload = app object
): App[] => {
  return action.payload.apps ? action.payload.apps : previousState;
};

const setAppsReducer: any = (
  _previousState: App[] = initialState,
  action: Action<any>// action.payload = app object
): App[] => {
  return action.payload;
};

/**
 * The Application Reducer
 * @param state: current application state
 * @param action: the current action fired in the application
 * @returns state: the new application state
 */
const reducer: any = (
  prevState: App[] = initialState,
  action: Action
): App[] => {
  switch (action.type) {
    case ActionType.SYNC_DATA_SUCCESS:
      return syncAppsReducer(prevState, action);
    case ActionType.SET_APPS:
      return setAppsReducer(prevState, action);
  }

  return prevState;
};

export default reducer;

