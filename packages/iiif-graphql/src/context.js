import { createStore } from 'iiif-redux';

const store = createStore();

const context = req => ({
  store,
  query: selector => {
    return selector(store.getState());
  },
});

export default context;
