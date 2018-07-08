import traverse from 'traverse';
import hash from 'object-hash';

const addMissingIds = presentationVersion => jsonLd => {
  traverse(jsonLd).forEach(function(obj) {
    // Presentation 2 has 3 optional.
    if (
      presentationVersion >= 2.0 &&
      presentationVersion <= 2.1 &&
      (obj['@type'] === 'oa:Annotation' ||
        obj['@type'] === 'sc:Sequence' ||
        obj['@type'] === 'oa:Choice') &&
      !obj['@id']
    ) {
      this.update({ ...obj, '@id': `https://${hash(obj)}` });
    }
    // Presentation 3 has only one optional.
    // But then again, some common missing ids...
    if (
      presentationVersion === 3.0 &&
      (obj.type === 'AnnotationPage' ||
        obj.type === 'Annotation' ||
        obj.format) &&
      !obj.id
    ) {
      this.update({ ...obj, id: `https://${hash(obj)}` });
    }
  });
  return jsonLd;
};

export default addMissingIds;
