export default function mapAllResources(items, resources) {
  return items
    ? items.map(
        ({ schema, id }) =>
          resources[schema.endsWith('s') ? `${schema}es` : `${schema}s`][id]
      )
    : null;
}
