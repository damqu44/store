export function navigateToSearchPage(products) {
  const queryParams = new URLSearchParams()
  queryParams.append('products', JSON.stringify(products))

  window.location.href = `/search.html?${queryParams.toString()}`
}
