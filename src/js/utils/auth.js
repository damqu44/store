export function isAuthenticated() {
  return !!document.cookie
    .split('; ')
    .find((row) => row.startsWith('authToken='))
}
