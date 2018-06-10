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
  Array.from(
    new Set([
      ...alwaysArray(resource.collections)
        .filter(collection => collection.schema === 'collection')
        .map(collection => collection.id),
      ...alwaysArray(resource.members)
        .filter(member => member.schema === 'collection')
        .map(member => member.id),
    ])
  );

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

const getRangeMembers = resource =>
  Array.from(
    new Set([
      ...alwaysArray(resource.members).map(member => member.id),
      ...(resource.canvases || []),
      ...(resource.ranges || []),
    ])
  );

const getRangeRanges = resource =>
  Array.from(
    new Set([
      ...alwaysArray(resource.members)
        .filter(member => member.schema === 'range')
        .map(member => member.id),
      ...(resource.ranges || []),
    ])
  );

const getRangeCanvases = resource =>
  Array.from(
    new Set([
      ...alwaysArray(resource.members)
        .filter(member => member.schema === 'canvas')
        .map(member => member.id),
      ...(resource.canvases || []),
    ])
  );

const getSequences = resource => alwaysArray(resource.sequences);

const getCanvases = resource => alwaysArray(resource.canvases);

const getStructures = resource => alwaysArray(resource.structures);

const getRanges = getStructures;

const getOtherContent = resource =>
  alwaysArray(resource.otherContent).map(otherContent => otherContent.id);

const getImages = resource => alwaysArray(resource.images);

const getResource = resource =>
  resource ? (resource.resource ? resource.resource.id : null) : null;

const getResources = resource => alwaysArray(resource.resources);

export {
  getSequences,
  getCanvases,
  getCollections,
  getImages,
  getManifests,
  getMembers,
  getOtherContent,
  getRanges,
  getRangeCanvases,
  getRangeMembers,
  getRangeRanges,
  getStructures,
  getResource,
  getResources,
};
