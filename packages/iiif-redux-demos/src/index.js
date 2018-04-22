import { createStore } from 'iiif-redux';
import { Provider } from 'react-redux';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

const store = createStore();

render(
  <Provider store={store}>
    <App collection="https://view.nls.uk/collections/top.json" />
    {/*<App collection="http://iiif.io/api/presentation/2.1/example/fixtures/collection.json" />*/}
    {/*<App collection="https://iiif-fixtures.stephen.wf/collection.json" />*/}
  </Provider>,
  document.querySelector('#app')
);
