/**
 * Presentation version branch
 *
 * Usage:
 *
 * const myVersionedSelector = presentationVersionBranch({
 *  2: myPresentation3SelectorApi,
 *  3: myPresentation2SelectorApi,
 * });
 *
 * const mySelector = myVersionedSelector(api => ({
 *  label: api.getLabel,
 * }))
 *
 * const selectById = mySelector((state, props) => state.collections[props.id]);
 *
 * console.log(selectById(state, props)); // { label: 'something' }
 */
export default function presentationVersionBranch(versionMap) {
  return apiSelection => selector => (state, props) => {
    const entity = selector(state, props);
    const id = entity.id || entity['@id'] || null;
    // Maybe?
    if (!id) {
      // @todo will be `return null;` in 1.0.0
      return apiSelection(versionMap[2])(selector)(state, props);
    }
    const version = state.schemaVersions[id];
    if (!versionMap[version]) {
      // @todo will be `return null;` in 1.0.0
      return apiSelection(versionMap[2])(selector)(state, props);
    }
    return apiSelection(versionMap[version])(selector)(state, props);
  };
}
