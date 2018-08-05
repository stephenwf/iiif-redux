import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import presentation2Collection from './2.x/collection';
import { getAllCollections } from './all';

const collection = presentation2Collection;

export default collection;

export const collections = resourceListSelectorFactory(
  getAllCollections,
  collection
);

export const collectionByIdSelector = byIdSelectorFactory(
  collection,
  'collections'
);
