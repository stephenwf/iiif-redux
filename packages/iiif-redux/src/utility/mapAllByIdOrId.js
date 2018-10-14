export default function mapAllByIdOrId(list, mappedList) {
  return list.map(id => mappedList[id] || id);
}
