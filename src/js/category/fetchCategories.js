import { populateCategoryList } from './utils'

export async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:3000/categories')
    if (!response.ok) {
      throw new Error('Network response failes ' + response.statusText)
    }
    const categories = await response.json()
    const categoryList = document.getElementById('category-list')
    populateCategoryList(categories, categoryList)
  } catch (error) {
    console.error('There has neem a problem with your fetch operation: ', error)
  }
}
