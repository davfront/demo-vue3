export function getBooks(params) {
  const url = new URL('https://www.googleapis.com/books/v1/volumes')

  for (const key in params) {
    url.searchParams.append(key, params[key])
  }

  return fetch(url).then((response) => response.json())
}
