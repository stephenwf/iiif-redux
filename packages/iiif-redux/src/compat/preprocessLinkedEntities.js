import normalizeLinkedResources from './normalizeLinkedResources';
import normalizeLanguageProperty from './normalizeLanguageProperty';
import normalizeMetadataProperty from './normalizeMetadataProperty';

const preprocessLinkedEntities = value => {
  return Object.entries(value).reduce((acc, [entryKey, entryValue]) => {
    switch (entryKey) {
      // Descriptive
      case 'label':
      case 'description':
      case 'attribution':
        acc[entryKey] = normalizeLanguageProperty(entryValue, 'en');
        break;

      case 'metadata':
        acc[entryKey] = normalizeMetadataProperty(entryValue, 'en');
        break;

      case 'seeAlso':
      case 'service':
      case 'related':
      case 'rendering':
      case 'within':
        acc[entryKey] = normalizeLinkedResources(entryValue);
        break;

      case 'startCanvas':
      case 'first':
      case 'last':
      case 'next':
      case 'prev':
        const resource = normalizeLinkedResources(entryValue);
        acc[entryKey] = resource ? resource[0] : null;
        break;

      default:
        acc[entryKey] = entryValue;
        break;
    }
    return acc;
  }, {});
};

export default preprocessLinkedEntities;
