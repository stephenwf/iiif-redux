import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import sagas from './sagas';

function getWindow() {
  try {
    return window;
  } catch (err) {
    return null;
  }
}

const composeEnhancers = getWindow()
  ? getWindow().__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

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
