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

export interface MemberItem {
  id: string;
  schema: 'collection' | 'manifest';
}

export interface OtherContentItem {
  id: string;
}

export interface CollectionStructure extends HasMembers {
  collections?: Array<MemberItem>;
  manifests?: Array<string>;
}

export interface ManifestStructure {
  sequences?: Array<string>;
}

export interface SequenceStructure {
  canvases?: Array<string>;
}

export interface HasStructures {
  structures?: Array<string>;
}

export interface HasOtherContent {
  otherContent?: Array<OtherContentItem>;
}

export interface HasImages {
  images?: Array<string>;
}

export interface HasMembers {
  members?: Array<MemberItem>;
}

function alwaysArray<T>(maybeArray?: Array<T> | T): Array<T> {
  return maybeArray
    ? Array.isArray(maybeArray) ? maybeArray : [maybeArray]
    : [];
}

const getCollections = (resource: CollectionStructure): Array<string> =>
  alwaysArray<MemberItem>(resource.collections)
    .filter(collection => collection.schema === 'collection')
    .map(collection => collection.id);

const getManifests = (resource: CollectionStructure): Array<string> => [
  ...alwaysArray<string>(resource.manifests),
  ...alwaysArray<MemberItem>(resource.collections)
    .filter(collection => collection.schema === 'manifest')
    .map(manifest => manifest.id),
];

const getMembers = (resource: CollectionStructure): Array<string> =>
  Array.from(
    new Set([
      ...alwaysArray<MemberItem>(resource.members).map(member => member.id),
      ...alwaysArray<MemberItem>(resource.collections)
        .filter(collection => collection.schema === 'collection')
        .map(collection => collection.id),
      ...(resource.manifests || []),
      ...alwaysArray<MemberItem>(resource.collections)
        .filter(collection => collection.schema === 'manifest')
        .map(collection => collection.id),
    ])
  );

const getSequences = (resource: ManifestStructure): Array<string> =>
  alwaysArray<string>(resource.sequences);

const getCanvases = (resource: SequenceStructure): Array<string> =>
  alwaysArray(resource.canvases);

const getStructures = (resource: HasStructures): Array<string> =>
  alwaysArray(resource.structures);

const getRanges = getStructures;

const getOtherContent = (resource: HasOtherContent): Array<string> =>
  alwaysArray<OtherContentItem>(resource.otherContent).map(
    otherContent => otherContent.id
  );

const getImages = (resource: HasImages): Array<string> =>
  alwaysArray(resource.images);

export {
  alwaysArray,
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
