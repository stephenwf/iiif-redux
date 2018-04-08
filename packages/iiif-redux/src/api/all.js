const getAllCollections = state => state.resources.collections;
const getAllExternalResources = state => state.resources.externalResources;
const getAllLayers = state => state.resources.layers;
const getAllServices = state => state.resources.services;
const getAllManifests = state => state.resources.manifests;
const getAllSequences = state => state.resources.sequences;
const getAllRanges = state => state.resources.ranges;
const getAllCanvases = state => state.resources.canvases;
const getAllImages = state => state.resources.imageResources;
const getAllAnnotations = state => state.resources.annotations;
const getAllAnnotationLists = state => state.resources.annotationLists;

export {
  getAllCollections,
  getAllExternalResources,
  getAllLayers,
  getAllServices,
  getAllManifests,
  getAllSequences,
  getAllRanges,
  getAllCanvases,
  getAllImages,
  getAllAnnotationLists,
  getAllAnnotations,
};
