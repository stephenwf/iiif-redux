export default function mapAllById(list, mappedList) {
  return list.map(id => mappedList[id]);
}
