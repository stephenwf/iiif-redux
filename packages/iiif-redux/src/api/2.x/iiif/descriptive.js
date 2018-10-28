const getLabel = resource => resource.label || null;

const getDescription = resource => resource.description || null;

const getAttribution = resource => resource.attribution || null;

const getMetadata = resource => resource.metadata || [];

// Returns ID to service.
const getThumbnailId = resource => {
  if (Array.isArray(resource.thumbnail)) {
    return resource.thumbnail[0];
  }
  return resource.thumbnail || null;
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
    return [];
  }
  return resource.logo;
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
