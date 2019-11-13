import { ActionType } from "./actions";
import { Action } from "./types";

/**
 * Function which helps to create actions without mistakes
 * @param type
 * @param payload
 */
export const action = <T>(type: ActionType, payload?: any): Action<T> => ({
  type,
  payload
});