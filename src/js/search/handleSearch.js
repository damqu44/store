import { navigateToSearchPage } from './navigateToSearchPage'
export async function handleSearch(event) {
  event.preventDefault()

  const form = event.target
  const query = form.querySelector('input[type="text"]').value

  try {
    const response = await fetch(
      `http://localhost:3000/search?content=${encodeURIComponent(query)}`
    )
    if (!response.ok) {
      throw new Error('Error:' + response.statusText)
    }

    const products = await response.json()
    navigateToSearchPage(products)
  } catch (error) {
    console.error('Error:', error)
  }
}
