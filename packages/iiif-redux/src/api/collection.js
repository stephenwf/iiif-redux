/**
 * Collection API
 *
 * Usage:
 *
 * To use collection on its own, we must define an API to define it
 * and also a selector to activate it.
 *
 *    const someCollectionLabel = collection(selector, api => api.getLabel);
 *    console.log(someCollectionLabel(state));
 *
 *
 * Selector in this case is provided for us, and is driven by props.
 *
 *    const collectionLabel = collectionByIdSelector(api => api.getLabel);
 *    console.log(collectionLabel(state, { id: '...' }));
 *
 *
 * Selector in this case must return collection objects.
 *
 *    const allCollectionLabels = collections(selector, api => api.getLabel);
 *    console.log(allCollectionLabels(state));
 */

import { PRESENTATION_2, PRESENTATION_3 } from '../constants/presentation';
import resourceSelectorFactory from '../utility/new/resourceSelectorFactory';
import resourceListSelectorFactory from '../utility/new/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/new/byIdSelectorFactory';
import presentation2Collection from './2.x/collection';
import presentation3Collection from './3.x/collection';
import { getAllCollections } from './all';

const collection = resourceSelectorFactory(
  'collections',
  {
    [PRESENTATION_2]: presentation2Collection,
    [PRESENTATION_3]: presentation3Collection,
  },
  PRESENTATION_2
);

export default collection;

export const collections = resourceListSelectorFactory(
  getAllCollections,
  collection
);

export const collectionByIdSelector = byIdSelectorFactory(
  collection,
  'collections'
);
