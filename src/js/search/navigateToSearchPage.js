export function navigateToSearchPage(query) {
  const queryParams = new URLSearchParams()
  queryParams.append("query", query)

  window.location.href = `/search.html?${queryParams.toString()}`
}
