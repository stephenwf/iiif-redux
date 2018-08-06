export default function mapById(id, mappedList) {
  return typeof mappedList[id] === 'undefined' ? null : mappedList[id];
}
