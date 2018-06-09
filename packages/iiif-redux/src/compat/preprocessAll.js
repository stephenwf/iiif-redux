import traverse from 'traverse';

export default function preprocessAll(jsonLd) {
  traverse(jsonLd).forEach(obj => {
    const key = this.key;

    if (
      (obj['@type'] === 'oa:Annotation' ||
        obj['@type'] === 'sc:Sequence' ||
        obj['@type'] === 'oa:Choice') &&
      !obj['@id']
    ) {
      this.update({ ...obj, '@id': `https://${hash(obj)}` });
    }
  });
  return jsonLd;
}
