export default function selectorError(message, fetched = false) {
  return {
    error: true,
    fetched,
    message,
  };
}
