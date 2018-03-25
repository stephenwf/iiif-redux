import memoize from 'lodash.memoize';

const normalizeSingleLanguageProperty = memoize((property, defaultLanguage) => {
  if (!property) {
    return null;
  }
  if (typeof property === 'string') {
    return [{ '@language': defaultLanguage, '@value': property }];
  }
  if (Array.isArray(property)) {
    return null; // Invalid.
  }
  if (property['@value']) {
    // presentation 2.
    return [property];
  } else {
    // presentation 3.
    return Object.keys(property).map(language => {
      return {
        '@language': language === '@none' ? defaultLanguage : language,
        '@value': Array.isArray(property[language])
          ? property[language][0]
          : property[language],
      };
    });
  }
});

const normalizeLanguageProperty = memoize((property, defaultLanguage) => {
  if (!property) {
    return [];
  }
  if (typeof property === 'string') {
    return [{ '@language': defaultLanguage, '@value': property }];
  }
  if (Array.isArray(property)) {
    return property
      .map(prop => normalizeSingleLanguageProperty(prop, defaultLanguage))
      .reduce((a, b) => a.concat(b), [])
      .filter(e => e);
  }
  return normalizeSingleLanguageProperty(property, defaultLanguage);
});

// Below are fields that can be translated.
const getLabel = defaultLanguage => resource =>
  normalizeLanguageProperty(resource.label, defaultLanguage);

const getDescription = defaultLanguage => resource =>
  normalizeLanguageProperty(resource.description, defaultLanguage);

const getAttribution = defaultLanguage => resource =>
  normalizeLanguageProperty(resource.attribution, defaultLanguage);

const getMetadata = defaultLanguage => resource => {
  if (!Array.isArray(resource.metadata)) {
    return [];
  }
  return resource.metadata
    .map(
      metadataItem =>
        metadataItem.value
          ? {
              label: normalizeLanguageProperty(
                metadataItem.label,
                defaultLanguage
              ),
              value: normalizeLanguageProperty(
                metadataItem.value,
                defaultLanguage
              ),
            }
          : null
    )
    .filter(e => e);
};

// Returns ID to service.
const getThumbnail = resource => {
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
  if (Array.isArray(resource.logo)) {
    return resource.logo[0]['@id'] || resource.logo[0];
  }
  return resource.logo['@id'] || resource.logo;
};

export {
  getLabel,
  getMetadata,
  getDescription,
  getThumbnail,
  getAttribution,
  getLicense,
  getLogo,
  normalizeLanguageProperty,
  normalizeSingleLanguageProperty,
};
