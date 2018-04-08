import memoize from 'lodash.memoize';
import filterHtmlTags from './filterHtmlTags';
import normalizeSingleLanguageProperty from './normalizeSingleLanguageProperty';

const normalizeLanguageProperty = memoize((property, defaultLanguage) => {
  if (!property) {
    return [];
  }
  if (typeof property === 'string') {
    return [
      { '@language': defaultLanguage, '@value': filterHtmlTags(property) },
    ];
  }
  if (Array.isArray(property)) {
    return property
      .map(prop => normalizeSingleLanguageProperty(prop, defaultLanguage))
      .reduce((a, b) => a.concat(b), [])
      .filter(e => e);
  }
  return normalizeSingleLanguageProperty(property, defaultLanguage);
});

export default normalizeLanguageProperty;
