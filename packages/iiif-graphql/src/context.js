import { createStore } from 'iiif-redux';
import { doesResourceExist } from 'iiif-redux/es/api/dereferenced';
import { iiifResourceRequestUnknownAsync } from 'iiif-redux/es/spaces/iiif-resource';
import { mappings as presentation2Mapping } from 'iiif-redux/es/api/2.x';
import { mappings as presentation3Mapping } from 'iiif-redux/es/api/3.x';
import DataLoader from 'dataloader';

const store = createStore();

const iiifLoader = new DataLoader(keys =>
  Promise.all(
    keys.map(id => store.dispatch(iiifResourceRequestUnknownAsync(id)))
  )
);

function mapping(version) {
  if (version === 3) {
    return presentation3Mapping;
  }
  return presentation2Mapping;
}

function select(selector) {
  return selector(store.getState());
}

async function loadResource(id, type) {
  return await iiifLoader.load(id);
}

const selectById = (id, type) => {
  return state => state.resources[type][id];
};

function resourceExists(id, type) {
  return select(doesResourceExist(selectById(id, type), type));
}

function fieldExists(id, type, field) {
  const value = getFieldValue(id, type, field);

  return typeof value !== 'undefined' && value !== null;
}

function resourceDereferenced(id, type) {}

function getFieldValue(id, type, field) {
  const version = getPresentationVersionFromResource(
    select(selectById(id, type))
  );
  const api = mapping(version)(selectById(id, type));
  const singleField = api[field];
  return select(singleField);
}

const combinedResolver = (id, type, field) => {
  if (!resourceExists(id, type)) {
    return loadResource(id, type).then(() => combinedResolver(id, type, field));
  }
  if (!fieldExists(id, type, field)) {
    if (resourceDereferenced(id, type)) {
      return null;
    }
    return loadResource(id, type).then(() => combinedResolver(id, type, field));
  }
  return getFieldValue(id, type, field);
};

const context = req => ({
  store,
  query: selector => {
    return selector(store.getState());
  },
  combinedResolver,
});

export default context;
