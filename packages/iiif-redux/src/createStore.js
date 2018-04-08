import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduceReducers from 'reduce-reducers';
import {
  DEFAULT_STATE,
  reducer as resourceReducer,
} from './spaces/iiif-resource';

import * as reducers from './reducers';
import sagas from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createCustomStore(
  customReducers = {},
  extraMiddleware = [],
  customSagas = [],
  defaultState = {}
) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    // Object.keys(reducers).length !== 0 ||
    // Object.keys(customReducers).length !== 0
    //   ? reduceReducers(
    //       resourceReducer,
    //       combineReducers({ ...reducers, ...customReducers })
    //     )
    //   : resourceReducer,
    resourceReducer,
    { ...DEFAULT_STATE, ...defaultState },
    composeEnhancers(applyMiddleware(sagaMiddleware, ...extraMiddleware))
  );

  sagas.map(saga => sagaMiddleware.run(saga));
  // customSagas.map(saga => sagaMiddleware.run(saga));

  return store;
}
