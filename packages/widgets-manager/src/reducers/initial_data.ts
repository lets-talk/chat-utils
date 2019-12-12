import { Action } from "../store/types";
import { ActionType } from "../store/actions";
import { ObjectIndex } from "../types";

type State = ObjectIndex<any>;
export const initialState = {};

const mountAppReducer = (
  previousState: {} = initialState,
  action: Action<any>// action.payload = app object
): State => {
  const { appName, initialData } = action.payload;
  const newState: State = { ...previousState };
  newState[appName] = { ...newState[appName], ...initialData };
  return newState;
};

const setAppsInitialDataReducer = (
  previousState: State = initialState,
  action: Action<any>// action.payload = app object
): State => {
  return { ...previousState, ...action.payload };
};

/**
 * The Application Reducer
 * @param state: current application state
 * @param action: the current action fired in the application
 * @returns state: the new application state
 */
const reducer = (
  prevState: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.MOUNT_APP:
      return mountAppReducer(prevState, action);
    case ActionType.SET_APPS_INITIAL_DATA:
      return setAppsInitialDataReducer(prevState, action);
  }

  return prevState;
};

export default reducer;

