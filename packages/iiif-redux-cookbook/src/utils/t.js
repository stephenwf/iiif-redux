export default function t(str) {
  if (!str) {
    return '';
  }
  if (Array.isArray(str)) {
    return str && str[0] ? str[0]['@value'] || '' : '';
  }
  return str[Object.keys(str)[0]][0] || '';
}
