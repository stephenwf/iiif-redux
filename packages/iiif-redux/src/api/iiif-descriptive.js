const getLabel = resource => resource.label;

const getDescription = resource => resource.description;

const getAttribution = resource => resource.attribution;

const getMetadata = resource => resource.metadata;

// Returns ID to service.
const getThumbnailId = resource => {
  if (Array.isArray(resource.thumbnail)) {
    return resource.thumbnail[0];
  }
  return resource.thumbnail;
};

const getLicense = resource => {
  if (!resource.license) {
    return null;
  }
  if (Array.isArray(resource.license)) {
    return resource.license;
  }
  return [resource.license];
};

const getLogo = resource => {
  if (!resource.logo) {
    return null;
  }
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
