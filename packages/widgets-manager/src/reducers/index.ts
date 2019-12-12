import { combineReducers } from 'redux';
import appsReducer from './apps';
import mountedAppsReducer from './mounted_apps';
import userReducer from './user';
import initialDataReducer from './initial_data';

const rootReducer = combineReducers({
  apps: appsReducer,
  mounted_apps: mountedAppsReducer,
  user: userReducer,
  initial_data: initialDataReducer,
})

export {
  rootReducer,
}