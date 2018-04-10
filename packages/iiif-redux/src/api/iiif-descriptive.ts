export interface LanguageValue {
  [key: string]: Array<string>;
}

export type Language = Array<LanguageValue>;

export interface Logo {
  '@id': string;
}

interface DescriptiveProperties {
  label: Language;
  description: Language;
  attribution: Language;
  metadata: Language;
  thumbnail: string | Array<string>;
  license: Array<string>;
  logo: Logo | Array<Logo> | string | Array<string>;
}

const getLabel = (resource: DescriptiveProperties): Language => resource.label;

const getDescription = (resource: DescriptiveProperties): Language =>
  resource.description;

const getAttribution = (resource: DescriptiveProperties): Language =>
  resource.attribution;

const getMetadata = (resource: DescriptiveProperties): Language =>
  resource.metadata;

// Returns ID to service.
const getThumbnailId = (resource: DescriptiveProperties): string => {
  if (Array.isArray(resource.thumbnail)) {
    return resource.thumbnail[0];
  }
  return resource.thumbnail;
};

const getLicense = (resource: DescriptiveProperties) => {
  if (!resource.license) {
    return [];
  }
  if (Array.isArray(resource.license)) {
    return resource.license;
  }
  return [resource.license];
};

const getLogo = (resource: DescriptiveProperties): string => {
  if (Array.isArray(resource.logo)) {
    return resource.logo[0]['@id'] || resource.logo[0];
  }
  return resource.logo['@id'] || resource.logo;
};

export {
  getLabel,
  getMetadata,
  getDescription,
  getThumbnailId,
  getAttribution,
  getLicense,
  getLogo,
};
