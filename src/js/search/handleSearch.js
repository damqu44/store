export async function handleSearch(event) {
  event.preventDefault()

  const form = event.target
  const query = form.querySelector('input[type="text"]').value.trim()
  if (query === "" || !query) return
  const queryParams = new URLSearchParams()
  queryParams.append("query", query)

  window.location.href = `/search.html?${queryParams.toString()}`
}
