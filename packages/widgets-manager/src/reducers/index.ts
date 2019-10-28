import { combineReducers } from 'redux';
import appsReducer from './apps';
import mountedAppsReducer from './mounted_apps';
const rootReducer = combineReducers({
  apps: appsReducer,
  mounted_apps: mountedAppsReducer,
})

export {
  rootReducer,
}