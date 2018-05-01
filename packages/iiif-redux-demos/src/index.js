import { createStore } from 'iiif-redux';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
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
    {/*<App collection="https://raw.githubusercontent.com/ryanfb/iiif-universe/gh-pages/iiif-universe.json" />*/}
    <App collection="https://view.nls.uk/collections/top.json" />
    {/*<App collection="http://iiif.io/api/presentation/2.1/example/fixtures/collection.json" />*/}
    {/*<App collection="https://iiif-fixtures.stephen.wf/collection.json" />*/}
  </Provider>,
  document.querySelector('#app')
);
