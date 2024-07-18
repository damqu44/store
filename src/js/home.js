import '../index.css'
import _ from 'lodash'

async function fetchProducts(sort = '', category = '') {
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

function displayProducts(products) {
  const productList = document.getElementById('product-list')
  productList.innerHTML = ''

  products.forEach((product) => {
    const productElement = document.createElement('li')
    productElement.classList.add(
      'hover:cursor-pointer',
      'hover:scale-95',
      'transition-transform'
    )

    productElement.addEventListener('click', () => {
      window.location.href = `/product.html?id=${product.Id}`
    })

    productElement.innerHTML = `
      <div class="aspect-w-1 aspect-h-1">
        <img
          src="${product.ImageLink}"
          alt="${product.Name || 'No image available'}"
          class="object-cover rounded-md"
        />
      </div>
      <div class="py-1 text-base line-clamp-2">
        ${product.Name || 'Unnamed Product'}
      </div>
      <div class="text-sm line-clamp-1">${
        product.Price + ' zł' || 'Price not available'
      }</div>
    `

    productList.appendChild(productElement)
  })
}

async function fetchCategories() {
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
function populateCategoryList(categories) {
  const categoryList = document.getElementById('category-list')
  categoryList.innerHTML = ''

  categories.forEach((category) => {
    const listItem = createCategoryListItem(category)
    categoryList.appendChild(listItem)
  })
}

function setupSortOptions() {
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
      fetchProducts('price_asc', getActiveCategory())
    } else if (event.target.matches('#sort-price-desc')) {
      fetchProducts('price_desc', getActiveCategory())
    } else if (event.target.matches('#sort-random')) {
      fetchProducts('random', getActiveCategory())
    }
  })
}

function createCategoryListItem(category) {
  const listItem = document.createElement('div')
  listItem.classList.add(
    'pb-5',
    'text-md',
    'tracking-wide',
    'cursor-pointer',
    'hover:text-[#ff5a00]',
    'transition-colors',
    'category-item'
  )
  listItem.textContent = category.Name

  if (isActiveCategory(category.Name)) {
    listItem.classList.add('font-bold')
  }

  listItem.addEventListener('click', () => {
    handleCategoryClick(listItem, category.Name)
  })

  return listItem
}

function getActiveCategory() {
  const activeCategory = document.querySelector('.category-item.font-bold')
  return activeCategory ? activeCategory.textContent.trim() : ''
}

function handleCategoryClick(listItem, categoryName) {
  const currentActive = document.querySelector('.category-item.font-bold')
  if (currentActive) {
    currentActive.classList.remove('font-bold')
  }

  listItem.classList.add('font-bold')
  fetchProducts('', categoryName)
}

function isActiveCategory(categoryName) {
  const urlParams = new URLSearchParams(window.location.search)
  const selectedCategory = urlParams.get('category')
  return selectedCategory === categoryName
}

async function handleSearch(event) {
  event.preventDefault()

  const form = event.target
  const query = form.querySelector('input[type="text"]').value

  try {
    const response = await fetch(
      `http://localhost:3000/search?content=${encodeURIComponent(query)}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }

    const products = await response.json()
    navigateToSearchPage(products)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

function navigateToSearchPage(products) {
  const queryParams = new URLSearchParams()
  queryParams.append('products', JSON.stringify(products))

  window.location.href = `/search.html?${queryParams.toString()}`
}

document.addEventListener('DOMContentLoaded', () => {
  setupSortOptions()
  fetchCategories()
  fetchProducts()

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
