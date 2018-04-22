import { createStore } from 'iiif-redux';
import { Provider } from 'react-redux';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

const store = createStore();

render(
  <Provider store={store}>
    <App collection="https://view.nls.uk/collections/top.json" />
  </Provider>,
  document.querySelector('#app')
);
