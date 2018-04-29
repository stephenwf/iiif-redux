import memoize from 'lodash.memoize';
import filterHtmlTags from './filterHtmlTags';

const normalizeSingleLanguageProperty = memoize((property, defaultLanguage) => {
  if (!property) {
    return null;
  }
  if (typeof property === 'string') {
    return [
      { '@language': defaultLanguage, '@value': filterHtmlTags(property) },
    ];
  }
  if (Array.isArray(property)) {
    return null; // Invalid.
  }
  if (property['@value']) {
    property['@value'] = filterHtmlTags(property['@value']);
    // presentation 2.
    return [property];
  } else {
    // presentation 3.
    return Object.keys(property).reduce((acc, language) => {
      if (Array.isArray(property[language])) {
        return [
          ...acc,
          ...property[language].map(value => ({
            '@language': language === '@none' ? defaultLanguage : language,
            '@value': filterHtmlTags(value),
          })),
        ];
      }
      return [
        ...acc,
        {
          '@language': language === '@none' ? defaultLanguage : language,
          '@value': filterHtmlTags(property[language]),
        },
      ];
    }, []);
  }
});

export default normalizeSingleLanguageProperty;
