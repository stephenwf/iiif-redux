import { createSelector } from 'reselect';
import { getDefaultLanguage } from './config';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';

const getCurrentCollectionId = state => state.routing.currentCollection;
const getCollections = state => state.collections;

const getCurrentCollection = createSelector(
  getCurrentCollectionId,
  getCollections,
  (id, collections) => collections[id]
);

const getId = createSelector(getCurrentCollection, technical.getId);
const getType = createSelector(getCurrentCollection, technical.getType);
const getViewingHint = createSelector(getCurrentCollection, collection => {
  const viewingHint = technical.getViewingHint(collection);
  if (viewingHint !== 'individuals' && viewingHint !== 'multi-part') {
    // @todo only return if URI
    return null;
  }
  return viewingHint;
});
const getNavDate = createSelector(getCurrentCollection, technical.getNavDate);

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

const getAttribution = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getAttribution(language)(collection)
);

const getLogo = createSelector(getCurrentCollection, descriptive.getLogo);

const getLicense = createSelector(getCurrentCollection, descriptive.getLicense);

const getThumbnail = createSelector(
  getCurrentCollection,
  descriptive.getThumbnail
);

export {
  getId,
  getType,
  getViewingHint,
  getNavDate,
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLogo,
  getLicense,
  getThumbnail,
};
