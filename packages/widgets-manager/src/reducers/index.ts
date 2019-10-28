import { combineReducers } from 'redux';
import appsReducer from './apps';
import mountedAppsReducer from './mounted_apps';
import userReducer from './user';

const rootReducer = combineReducers({
  apps: appsReducer,
  mounted_apps: mountedAppsReducer,
  user: userReducer,
})

export {
  rootReducer,
}