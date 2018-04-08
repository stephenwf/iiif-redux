import striptags from 'striptags';

const filterHtmlTags = (
  str,
  allowed = ['a', 'b', 'br', 'i', 'img', 'p'],
  replacement = ''
) =>
  Array.isArray(str)
    ? str.map(s => filterHtmlTags(s, allowed, replacement))
    : striptags(str, allowed, replacement);

export default filterHtmlTags;
