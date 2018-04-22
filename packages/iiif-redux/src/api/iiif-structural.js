/**
 * IIIF Structural properties
 *
 * - getCollections
 * - getManifests
 * - getMembers
 * - getSequences
 * - getCanvases
 * - getStructures / getRanges
 * - getOtherContent
 * - getImages
 */

const alwaysArray = maybeArray =>
  Array.isArray(maybeArray) ? maybeArray : maybeArray || [];

const getCollections = resource =>
  alwaysArray(resource.collections)
    .filter(collection => collection.schema === 'collection')
    .map(collection => collection.id);

const getManifests = resource => [
  ...alwaysArray(resource.manifests),
  ...alwaysArray(resource.collections)
    .filter(collection => collection.schema === 'manifest')
    .map(manifest => manifest.id),
];

const getMembers = resource =>
  Array.from(
    new Set([
      ...alwaysArray(resource.members).map(member => member.id),
      ...alwaysArray(resource.collections)
        .filter(collection => collection.schema === 'collection')
        .map(collection => collection.id),
      ...(resource.manifests || []),
      ...alwaysArray(resource.collections)
        .filter(collection => collection.schema === 'manifest')
        .map(collection => collection.id),
    ])
  );

const getSequences = resource => alwaysArray(resource.sequences);

const getCanvases = resource => alwaysArray(resource.canvases);

const getStructures = resource => alwaysArray(resource.structures);

const getRanges = getStructures;

const getOtherContent = resource =>
  alwaysArray(resource.otherContent).map(otherContent => otherContent.id);

const getImages = resource => alwaysArray(resource.images);

export {
  getSequences,
  getCanvases,
  getCollections,
  getImages,
  getManifests,
  getMembers,
  getOtherContent,
  getRanges,
  getStructures,
};
