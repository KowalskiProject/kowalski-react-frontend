export function parseQueryParam(search, key) {
  return new URLSearchParams(search).get(key);
}
