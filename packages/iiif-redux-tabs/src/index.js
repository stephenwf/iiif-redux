import { createStore } from 'iiif-redux';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

const debug = require('debug')('iiif-redux');

// Development debugging.
if (window.localStorage && process.env.NODE_ENV === 'development') {
  window.localStorage.debug = process.env.DEBUG;
}
if (process.env.NODE_ENV === 'development') {
  debug(
    'Running in development',
    `v${process.env.__VERSION__} (${process.env.HASH.slice(0, 7)})`
  );
  debug('Debug level:', process.env.DEBUG);
}

if (process.env.NODE_ENV === 'production') {
  console.log(
    `Running in production v${process.env.__VERSION__}`,
    `(${process.env.HASH.slice(0, 7)})`
  );
}

const store = createStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
