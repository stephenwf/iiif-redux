import { createSelector } from 'reselect';
import * as descriptive from './iiif-descriptive';

const getCurrentCollectionId = state => state.routing.currentCollection;
const getCollections = state => state.collections;
const getDefaultLanguage = state => state.config.defaultLanguage;

const getCurrentCollection = createSelector(
  getCurrentCollectionId,
  getCollections,
  (id, collections) => collections[id]
);

const getLabel = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getLabel(language)(collection)
);

const getDescription = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getDescription(language)(collection)
);

const getMetadata = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getMetadata(language)(collection)
);

export { getLabel, getDescription, getMetadata };
