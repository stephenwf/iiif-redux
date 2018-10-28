import { iiifResourceRequestUnknownAsync } from 'iiif-redux/es/spaces/iiif-resource';
import collection from 'iiif-redux/es/api/collection';
import manifest from 'iiif-redux/es/api/manifest';
import { doesResourceExist } from 'iiif-redux/es/api/dereferenced';
import presentation2Collection from 'iiif-redux/es/api/2.x/collection';
import presentation3Collection from 'iiif-redux/es/api/3.x/collection';
import { getSchemaVersionForResource } from 'iiif-redux/es/api/schema-version';

// To get this working.
// 1) Single function that goes from ID + FIELD to value
// 2) Data loader that will load a resource if not already loaded (single promise)
// 3) Wrapper function that load a resource if a value doesn't exist (lazy)
// 4) Function that will sort out entities of different types
// 5) Figure out what nested entities will look like in code.
//
// Bugs:
// - Presentation 2 getMemberIds needs to return the schema
//
// Things to note:
//  - Only Manifests, Collections and annotation collections may be dereferenced
//  - Data loading may result in more than
//
// Single field example
// - Check if resource exists
// - If not, send request and await promise
// - Check if field exists on resource
// - If not, check if dereferenced
// - If not, send request and await promise
// - Return field
//
// Multiple field example
// - All of the above for parent resource
// - Return resources as simple objects with ID field (and schema/type). Maybe?

function loadResource(id, type) {}

function resourceExists(id, type) {}

function fieldExists(id, type, field) {}

function resourceDereferenced(id, type) {}

function getFieldValue(id, type, field) {}

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

const reduxResolver = (typeFunc, stateType) => apiFunc => (
  data,
  opt,
  context
) => {
  return typeFunc(s => s.resources[stateType][data.id], api => api[apiFunc])(
    context.store.getState()
  );
};

const collectionSelector = api => ({
  id: api.getId,
  type: api.getType,
  viewingDirection: api.getViewingDirection,
  behavior: api.getBehavior,
  label: api.getLabel,
  metadata: api.getMetadata,
  summary: api.getSummary,
  thumbnailId: api.getThumbnailId,
  thumbnail: api.getThumbnail,
  posterCanvasId: api.getPosterCanvasId,
  posterCanvas: api.getPosterCanvas,
  requiredStatement: api.getRequiredStatement,
  rights: api.getRights,
  navDate: api.getNavDate,
  seeAlsoIds: api.getSeeAlsoIds,
  seeAlso: api.getSeeAlso,
  serviceIds: api.getServiceIds,
  service: api.getService,
  logoIds: api.getLogoIds,
  logo: api.getLogo,
  homepageId: api.getHomepageId,
  homepage: api.getHomepage,
  renderingIds: api.getRenderingIds,
  rendering: api.getRendering,
  partOfId: api.getPartOfId,
  partOf: api.getPartOf,
  itemIds: api.getMemberIds,
  items: api.getMembers,
  manifestIds: api.getManifestIds,
  manifests: api.getManifests,
  collectionIds: api.getCollectionIds,
  collections: api.getCollections,
  annotationIds: api.getAnnotationIds,
  annotations: api.getAnnotations,
});

const manifestSelector = api => ({
  id: api.getId,
  type: api.getType,
  viewingDirection: api.getViewingDirection,
  behavior: api.getBehavior,
  label: api.getLabel,
  metadata: api.getMetadata,
  summary: api.getSummary,
  thumbnailId: api.getThumbnailId,
  thumbnail: api.getThumbnail,
  posterCanvasId: api.getPosterCanvasId,
  posterCanvas: api.getPosterCanvas,
  requiredStatement: api.getRequiredStatement,
  rights: api.getRights,
  navDate: api.getNavDate,
  seeAlsoIds: api.getSeeAlsoIds,
  seeAlso: api.getSeeAlso,
  serviceIds: api.getServiceIds,
  service: api.getService,
  logoIds: api.getLogoIds,
  logo: api.getLogo,
  homepageId: api.getHomepageId,
  homepage: api.getHomepage,
  renderingIds: api.getRenderingIds,
  rendering: api.getRendering,
  partOfId: api.getPartOfId,
  partOf: api.getPartOf,
  startId: api.getStartId,
  start: api.getStart,
  itemIds: api.getItemIds,
  items: api.getItems,
  canvasIds: api.getCanvasIds,
  canvases: api.getCanvases,
  structureIds: api.getStructureIds,
  structures: api.getStructures,
  annotationIds: api.getAnnotationIds,
  annotations: api.getAnnotations,
});

const collectionResolver = reduxResolver(collection, 'collections');
const manifestResolver = reduxResolver(manifest, 'manifests');

const resolvers = {
  Query: {
    collection: async (root, args, context, info) => {
      const { id } = await context.store.dispatch(
        iiifResourceRequestUnknownAsync(args.id)
      );

      return context.query(
        collection(s => s.resources.collections[id], collectionSelector)
      );
    },
    manifest: async (root, args, context, info) => {
      const { id } = await context.store.dispatch(
        iiifResourceRequestUnknownAsync(args.id)
      );
      return context.query(
        manifest(s => s.resources.manifests[id], manifestSelector)
      );
    },
  },
  RangeItem: {
    __resolveType(obj) {
      return obj.schema || obj.type;
    },
  },
  CollectionItem: {
    __resolveType(obj, context, info) {
      const types = {
        'sc:Collection': 'Collection',
        'sc:Manifest': 'Manifest',
      };
      return obj.type || types[obj['@type']];
    },
    // label: (obj, context) => context.collectionApi.getLabel(context.store.getState()),
    // label: withApi(api => api.getLabel),
  },

  Manifest: {
    type: () => 'Manifest',
    summary: manifestResolver('getSummary'),
  },
  Collection: {
    type: () => 'Collection',
    viewingDirection: collectionResolver('getViewingDirection'),
    behaviour: collectionResolver('getBehaviour'),
    items(obj, _, context) {
      console.log(obj);

      return obj.items;
    },
  },
};

export default resolvers;
