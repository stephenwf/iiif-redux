import memoize from 'lodash.memoize';
import normalizeLanguageProperty from './normalizeLanguageProperty';

const normalizeMetadataProperty = memoize(
  (metadata, defaultLanguage) =>
    Array.isArray(metadata)
      ? metadata
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
          .filter(e => e)
      : []
);

export default normalizeMetadataProperty;
