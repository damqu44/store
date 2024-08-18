import '../../../index.css'
import _ from 'lodash'

import { displayProducts } from '../../product/displayProducts'
import { handleSearch } from '../../search/handleSearch'
import { fetchCategories } from '../../category/fetchCategories'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

export let allProducts = []
let activeCategory = null

function setSortOptions() {
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
    ) {
      sortOptions.classList.add('hidden')
    }
  })

  sortOptions.addEventListener('click', (event) => {
    if (event.target.matches('#sort-price-asc')) {
      sortProducts('price_asc')
    } else if (event.target.matches('#sort-price-desc')) {
      sortProducts('price_desc')
    } else if (event.target.matches('#sort-random')) {
      sortProducts('random')
    }
  })

  function sortProducts(criteria) {
    let sortedProducts = [...allProducts]
    if (activeCategory) {
      sortedProducts = sortedProducts.filter(
        (product) => product.Category.Name === activeCategory
      )
    }
    if (criteria === 'price_asc') {
      sortedProducts.sort((a, b) => a.Price - b.Price)
    } else if (criteria === 'price_desc') {
      sortedProducts.sort((a, b) => b.Price - a.Price)
    } else if (criteria === 'random') {
      sortedProducts = _.shuffle(sortedProducts)
    }
    displayProducts(sortedProducts)
  }
}

function setupCategoryFilters() {
  const categoryList = document.getElementById('category-list')

  categoryList.addEventListener('click', (event) => {
    if (event.target.matches('.category-item')) {
      activeCategory = event.target.getAttribute('data-category')
      filterProductsByCategory(activeCategory)
    }
  })
}

function filterProductsByCategory(category) {
  activeCategory = category
  const filteredProducts = allProducts.filter((product) => {
    return product.Category.Name === category
  })
  displayProducts(filteredProducts)
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()

  const queryParams = new URLSearchParams(window.location.search)
  const productsJson = queryParams.get('products')
  allProducts = JSON.parse(productsJson)

  if (allProducts.length > 0) {
    setSortOptions()
    fetchCategories()
    setupCategoryFilters()
  }

  displayProducts(allProducts)

  loadFooter()
  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
