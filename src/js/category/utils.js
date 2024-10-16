import { allProducts, ifProductsThenDisplay } from "../pages/search/initSearch"

export function populateCategoryList(categories) {
  const categoryList = document.getElementById("category-list")
  categoryList.innerHTML = ""

  categories.forEach((category) => {
    const listItem = createCategoryListItem(category)
    categoryList.appendChild(listItem)
  })
}

export function getActiveCategory() {
  const activeCategory = document.querySelector(".category-item.font-bold")
  return activeCategory ? activeCategory.textContent.trim() : ""
}

export function createCategoryListItem(category) {
  const listItem = document.createElement("div")
  listItem.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "w-full",
    "py-3",
    "text-md",
    "tracking-wide",
    "cursor-pointer",
    "hover:text-[#ff5a00]",
    "transition-colors",
    "category-item",
    "border",
    "border-x-0",
    "border-t-0",
    "border-[#6d6d6d]"
  )
  listItem.textContent = category.Name
  listItem.setAttribute("data-category", category.Name)

  if (isActiveCategory(category.Name)) {
    listItem.classList.add("font-bold")
  }

  listItem.addEventListener("click", () => {
    handleCategoryClick(listItem, category.Name)
  })

  return listItem
}

export function handleCategoryClick(listItem, categoryName) {
  const currentActive = document.querySelector(".category-item.font-bold")
  if (currentActive) {
    currentActive.classList.remove("font-bold")
  }

  listItem.classList.add("font-bold")
  filterProductsByCategory(categoryName)
}

function filterProductsByCategory(category) {
  const filteredProducts = allProducts.filter(
    (product) => product.Category === category
  )
  const productList = document.getElementById("product-list")
  console.log(productList)
  ifProductsThenDisplay(filteredProducts)
}

export function isActiveCategory(categoryName) {
  const urlParams = new URLSearchParams(window.location.search)
  const selectedCategory = urlParams.get("category")
  return selectedCategory === categoryName
}
