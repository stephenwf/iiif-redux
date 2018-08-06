export default function mapByIdOrId(id, resources) {
  return typeof resources[id] === 'undefined' ? id || null : resources[id];
}
