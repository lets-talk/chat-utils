import { Action } from "../store/types";
import { ActionType } from "../store/actions";
import { App } from "../types";

export const initialState = false;

const updateUserDataReducer: any = (
  _previousState: any = initialState,
  action: Action<any>// action.payload = app object
): App[] => {
  return action.payload;
};

/**
 * The User Reducer
 * @param state: current application state
 * @param action: the current action fired in the application
 * @returns state: the new application state
 */
const reducer: any = (
  prevState: any = initialState,
  action: Action
): any => {
  switch (action.type) {
    case ActionType.UPDATE_USER_DATA:
      return updateUserDataReducer(prevState, action);
  }

  return prevState;
};

export default reducer;

