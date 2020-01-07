import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnly';
import { rootReducer } from './reducers';

export const configureStore = (initialState: any) => {
  // Create the store with three middlewares (the order here is important)
  const middlewares = [];

  const enhancers: any[] = [];

  // Ignore next for collection coverage as is something only for DEV environment
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    // Define redux logger
    const logger: any = createLogger({
      // ...options
    });

    middlewares.push(logger);
  }

  enhancers.push(applyMiddleware(...middlewares));

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [], // Do not send this actions
    })
    : composeWithDevTools({ // Use logOnly minimalist version of Redux DevTools Extension is installed use it, otherwise use Redux compose
      // options like actionSanitizer, stateSanitizer
    });
  /* eslint-enable */

  /* Then create Store */
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  return store;
}