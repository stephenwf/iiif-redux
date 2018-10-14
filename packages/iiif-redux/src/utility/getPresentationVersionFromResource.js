export default function getPresentationVersionFromResource(resource) {
  if (!resource) {
    throw new Error('Resource cannot be null or undefined');
  }

  const context = Array.isArray(resource['@context'])
    ? resource['@context']
    : [resource['@context']];

  // The proper method for presentation 2:
  if (
    context.indexOf('http://iiif.io/api/presentation/2/context.json') !== -1
  ) {
    return 2;
  }

  // The proper method for presentation 3:
  if (
    context.indexOf('http://iiif.io/api/presentation/3/context.json') !== -1
  ) {
    return 3;
  }

  // Fallback method for presentation 2:
  if (resource['@id']) {
    return 2;
  }

  // Default to 3.
  return 3;
}
