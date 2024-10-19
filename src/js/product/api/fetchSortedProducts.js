import { displayProducts } from './displayProducts'

export async function fetchSortedProducts(sort = '', category = '') {
  try {
    const response = await fetch(
      `http://localhost:3000/products?sort=${sort}&category=${category}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const products = await response.json()
    displayProducts(products)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
