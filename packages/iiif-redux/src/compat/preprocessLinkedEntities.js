import normalizeLinkedResources from './normalizeLinkedResources';
import normalizeLanguageProperty from './normalizeLanguageProperty';
import normalizeMetadataProperty from './normalizeMetadataProperty';
import traverse from 'traverse';

const preprocessLinkedEntities = value => {
  traverse(value).forEach(function(entryValue) {
    switch (this.key) {
      // Descriptive
      case 'label':
      case 'description':
      case 'attribution':
        this.update(normalizeLanguageProperty(entryValue, 'en'));
        break;

      case 'metadata':
        this.update(normalizeMetadataProperty(entryValue, 'en'));
        break;

      case 'seeAlso':
      case 'service':
      case 'related':
      case 'rendering':
      case 'within':
      case 'logo':
        this.update(
          preprocessLinkedEntities(normalizeLinkedResources(entryValue))
        );
        break;

      case 'startCanvas':
      case 'first':
      case 'last':
      case 'next':
      case 'prev': {
        const linkedResources = normalizeLinkedResources(entryValue);
        this.update(
          linkedResources && linkedResources.length ? linkedResources[0] : null
        );
        break;
      }

      default:
        break;
    }
  });
  return value;
};

export default preprocessLinkedEntities;
