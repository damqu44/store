import { fetchSortedProducts } from './fetchSortedProducts'
import { getActiveCategory } from '../category/utils'

export function setupSortOptions() {
  const sortDropdown = document.getElementById('sort-dropdown')
  const sortOptions = document.getElementById('sort-options')

  sortDropdown.addEventListener('click', (event) => {
    event.stopPropagation()
    sortOptions.classList.toggle('hidden')
  })

  document.addEventListener('click', (event) => {
    if (
      !sortOptions.classList.contains('hidden') &&
      !sortDropdown.contains(event.target)
    )
      sortOptions.classList.add('hidden')
  })

  sortOptions.addEventListener('click', (event) => {
    if (event.target.matches('#sort-price-asc')) {
      fetchSortedProducts('price_asc', getActiveCategory())
    } else if (event.target.matches('#sort-price-desc')) {
      fetchSortedProducts('price_desc', getActiveCategory())
    } else if (event.target.matches('#sort-random')) {
      fetchSortedProducts('random', getActiveCategory())
    }
  })
}
