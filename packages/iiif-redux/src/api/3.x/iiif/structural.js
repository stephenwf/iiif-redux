import { getStructures } from '../../2.x/iiif/structural';

const getItems = resource => resource.items || [];

const getAnnotations = resource => resource.annotations || [];

export { getItems, getStructures, getAnnotations };
