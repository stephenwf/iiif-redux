import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
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
    combineReducers(reducers),
    defaultState,
    composeEnhancers(applyMiddleware(sagaMiddleware, thunk, ...extraMiddleware))
  );

  sagas.map(saga => sagaMiddleware.run(saga));
  // customSagas.map(saga => sagaMiddleware.run(saga));

  return store;
}
