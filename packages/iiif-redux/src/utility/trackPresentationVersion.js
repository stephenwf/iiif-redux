export default function trackPresentationVersion(
  version,
  { entities, ...props }
) {
  return {
    entities: {
      ...entities,
      schemaVersions: Object.keys(entities).reduce((acc, next) => {
        return Object.keys(entities[next]).reduce((innerAcc, nextKey) => {
          innerAcc[nextKey] = version;
          return innerAcc;
        }, acc);
      }, {}),
    },
    ...props,
  };
}
