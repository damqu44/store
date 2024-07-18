import { fetchSortedProducts } from '../product/fetchSortedProducts'
import { displayProducts } from '../product/displayProducts'
import { allProducts } from '../pages/search/initSearch'
export function populateCategoryList(categories) {
  const categoryList = document.getElementById('category-list')
  categoryList.innerHTML = ''

  categories.forEach((category) => {
    const listItem = createCategoryListItem(category)
    categoryList.appendChild(listItem)
  })
}

export function getActiveCategory() {
  const activeCategory = document.querySelector('.category-item.font-bold')
  return activeCategory ? activeCategory.textContent.trim() : ''
}

export function createCategoryListItem(category) {
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
  listItem.setAttribute('data-category', category.Name)

  if (isActiveCategory(category.Name)) {
    listItem.classList.add('font-bold')
  }

  listItem.addEventListener('click', () => {
    handleCategoryClick(listItem, category.Name)
  })

  return listItem
}

export function handleCategoryClick(listItem, categoryName) {
  const currentActive = document.querySelector('.category-item.font-bold')
  if (currentActive) {
    currentActive.classList.remove('font-bold')
  }

  listItem.classList.add('font-bold')
  filterProductsByCategory(categoryName)
}

function filterProductsByCategory(category) {
  const filteredProducts = allProducts.filter(
    (product) => product.Category === category
  )
  displayProducts(filteredProducts)
}

export function isActiveCategory(categoryName) {
  const urlParams = new URLSearchParams(window.location.search)
  const selectedCategory = urlParams.get('category')
  return selectedCategory === categoryName
}
