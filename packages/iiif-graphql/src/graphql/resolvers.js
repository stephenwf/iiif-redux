import { iiifResourceRequestUnknownAsync } from 'iiif-redux/es/spaces/iiif-resource';
import collection from 'iiif-redux/es/api/collection';

const resolvers = {
  Query: {
    sayHello: (root, args, context, info) => ({ message: 'hello-world' }),
    getCollection: async (root, args, context, info) => {
      const id = args.collectionId;
      const state = await context.store.dispatch(
        iiifResourceRequestUnknownAsync(id)
      );
      return state.resources.collections[id];
    },
    getManifest: async (root, args, context, info) => {
      const id = args.manifestId;
      const state = await context.store.dispatch(
        iiifResourceRequestUnknownAsync(id)
      );
      return state.resources.manifests[id];
    },
  },
  InCollection: {
    __resolveType(obj, context, info) {
      return obj.type;
    },
  },
  Manifest: {},
  Collection: {
    // label: (data, opt, context) => {
    //   return collection(
    //     s => s.resources.collections[data.id],
    //     api => api.getLabel
    //   )(context.store.getState());
    // },
    items: () => {
      return [
        {
          id: 'http://example.org/manifest/1',
          type: 'Manifest',
          label: { en: ['Test manifest 1'] },
        },
        {
          id: 'http://example.org/manifest/2',
          type: 'Manifest',
          label: { en: ['Test manifest 2'] },
        },
        {
          id: 'http://example.org/collection/2',
          type: 'Collection',
          label: { en: ['Test collection 2'] },
        },
      ];
    },
  },
};

export default resolvers;
