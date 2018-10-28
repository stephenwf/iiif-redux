import memoize from 'lodash.memoize';

function optional(func, msg) {
  if (func) return func;
  return () => {
    throw new Error(msg);
  };
}

function nullable(func) {
  if (func) return func;
  return () => null;
}

function fallbacks(options) {
  // Find first non-null option.
  return options.find(Boolean);
}

function alias(from, to, obj) {
  obj[to] = obj[from];
}

export function standardFieldMappingFactory(apiFactory, aliases = true) {
  return memoize(selector => {
    const api = apiFactory(selector);

    const fieldMapping = {
      // Technical properties.
      id: api.getId,
      type: api.getType,
      format: optional(api.getFormat),
      profile: optional(api.getProfile),
      height: optional(api.getHeight),
      width: optional(api.getWidth),
      height: optional(api.getHeight),
      duration: optional(api.getDuration),
      viewingDirection: optional(api.getViewingDirection),
      behaviour: optional(api.getBehaviour),
      timeMode: optional(api.getTimeMode),
      // Descriptive properties.
      label: api.getLabel,
      metadata: api.getMetadata,
      summary: fallbacks([api.getSummary, api.getDescription]),
      thumbnailId: api.getThumbnailId,
      thumbnail: api.getThumbnail,
      posterCanvas: optional(api.getPosterCanvas),
      requiredStatement: fallbacks([
        api.getRequiredStatement,
        api.getAttribution,
      ]),
      rights: fallbacks([api.getRights, api.getLicense]),
      navDate: optional(api.getNavDate),
      language: optional(api.getLanguage),
      // Linking properties
      seeAlsoIds: api.getSeeAlsoIds,
      seeAlso: api.getSeeAlso,
      serviceIds: api.getServiceIds,
      service: api.getService,
      logoId: api.getLogoIds,
      logo: api.getLogo,
      homepageIds: fallbacks([api.getHomepageId, api.getRelatedIds]),
      homepage: fallbacks([api.getHomepage, api.getRelated]),
      renderingIds: api.getRenderingIds,
      rendering: api.getRendering,
      partOfId: fallbacks([api.getPartOfId, api.getWithinIds]),
      partOf: fallbacks([api.getPartOf, api.getWithin]),
      startId: optional(fallbacks([api.getStartId, api.getStartCanvasId])),
      start: optional(fallbacks([api.getStart, api.getStartCanvas])),
      supplementary: nullable(api.getSupplementary), // No equivelent in Presentation 2.
      // Structural.
      itemIds: optional(
        fallbacks([
          api.getItems,
          api.getMembers,
          api.getSequences,
          api.getCanvases,
          api.getResources,
          api.getImages,
          api.getRanges,
        ])
      ),
      items: optional(
        fallbacks([
          api.getItems,
          api.getMembers,
          api.getSequences,
          api.getCanvases,
          api.getResources,
          api.getImages,
          api.getRanges,
        ])
      ),
      // Part of the core API, as items isn't as descriptive.
      collectionIds: optional(api.getCollectionIds),
      collections: optional(api.getCollections),
      manifestIds: optional(api.getManifestIds),
      manifests: optional(api.getManifests),
      canvasIds: optional(api.getCanvasIds),
      canvases: optional(api.getCanvases),

      structreIds: optional(fallbacks([api.getStructureIds, api.getRangeIds])),
      structures: optional(fallbacks([api.getStructures, api.getRanges])),
      // This may conflict (painting vs non-painting between 2.x to 3.x)
      annotationIds: optional(api.getAnnotationIds),
      annotations: optional(api.getAnnotations),
    };

    if (aliases) {
      // QoL aliases.
      alias('service', 'services', fieldMapping);
      alias('rights', 'license', fieldMapping);
      alias('rights', 'licence', fieldMapping);
      alias('homepage', 'homepages', fieldMapping);
      alias('rendering', 'renderings', fieldMapping);
      alias('structures', 'ranges', fieldMapping);
      alias('structureIds', 'rangeIds', fieldMapping);
    }

    return fieldMapping;
  });
}
