import { combineReducers } from 'redux';
import appsReducer from './apps';
const rootReducer = combineReducers({
  apps: appsReducer,
})
export {
  rootReducer,
}