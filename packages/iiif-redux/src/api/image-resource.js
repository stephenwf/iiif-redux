import { getAllImages } from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import presentation2ImageResource from './2.x/image-resource';

const imageResource = presentation2ImageResource;

export default imageResource;

export const imageResources = resourceListSelectorFactory(
  getAllImages,
  imageResource
);

export const imageResourceByIdSelector = byIdSelectorFactory(
  imageResource,
  'imageResources'
);
