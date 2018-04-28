import traverse from 'traverse';
import hash from 'object-hash';

export default function addMissingIds(jsonLd) {
  traverse(jsonLd).forEach(function(obj) {
    if (
      (obj['@type'] === 'oa:Annotation' || obj['@type'] === 'sc:Sequence') &&
      !obj['@id']
    ) {
      this.update({ ...obj, '@id': `https://${hash(obj)}` });
    }
  });
  return jsonLd;
}
