import "../../../index.css"
import "../../../css/pagination.css"
import "../../../css/skeleton.css"
import _ from "lodash"

import { displayProducts } from "../../product/displayProducts"
import { fetchCategories } from "../../category/fetchCategories"
import { getProducts } from "../../search/api/getProducts"

export let allProducts = []
let activeCategory = null
let currentPage = 1
let totalPages = 1
const productsPerPage = 12

function setSortOptions() {
  const sortDropdown = document.getElementById("sort-dropdown")
  const sortOptions = document.getElementById("sort-options")

  sortDropdown.addEventListener("click", (event) => {
    event.stopPropagation()
    sortOptions.classList.toggle("hidden")
  })

  document.addEventListener("click", (event) => {
    if (
      !sortOptions.classList.contains("hidden") &&
      !sortDropdown.contains(event.target)
    ) {
      sortOptions.classList.add("hidden")
    }
  })

  sortOptions.addEventListener("click", (event) => {
    if (event.target.matches("#sort-price-asc")) {
      sortProducts("price_asc")
    } else if (event.target.matches("#sort-price-desc")) {
      sortProducts("price_desc")
    } else if (event.target.matches("#sort-random")) {
      sortProducts("random")
    }
  })

  function sortProducts(criteria) {
    let sortedProducts = [...allProducts]
    if (activeCategory) {
      sortedProducts = sortedProducts.filter(
        (product) => product.Category.Name === activeCategory
      )
    }
    if (criteria === "price_asc") {
      sortedProducts.sort((a, b) => a.Price - b.Price)
    } else if (criteria === "price_desc") {
      sortedProducts.sort((a, b) => b.Price - a.Price)
    } else if (criteria === "random") {
      sortedProducts = _.shuffle(sortedProducts)
    }
    displayProducts(sortedProducts)
  }
}

function setupCategoryFilters() {
  const categoryList = document.getElementById("category-list")

  categoryList.addEventListener("click", (event) => {
    if (event.target.matches(".category-item")) {
      activeCategory = event.target.getAttribute("data-category")
      filterProductsByCategory(activeCategory)
    }
  })
}

function filterProductsByCategory(category) {
  activeCategory = category
  const filteredProducts = allProducts.filter((product) => {
    return product.Category.Name === category
  })
  ifProductsThenDisplay(filteredProducts)
}

function loadSkeletons() {
  const skeletonCards = document.getElementById("skeleton-cards")
  const productList = document.getElementById("product-list")
  skeletonCards.classList.add("grid")
  skeletonCards.classList.remove("hidden")
  productList.classList.add("hidden")

  let skeletonCount
  if (window.innerWidth < 768) {
    skeletonCount = 3
  } else if (window.innerWidth < 1024) {
    skeletonCount = 6
  } else if (window.innerWidth < 1280) {
    skeletonCount = 9
  } else {
    skeletonCount = 12
  }

  skeletonCards.innerHTML = ""

  for (let i = 0; i < skeletonCount; i++) {
    const skeletonItem = document.createElement("div")
    skeletonItem.classList.add("skeleton")
    skeletonItem.innerHTML = `
      <div class="image"></div>
      <div class="content">
        <h2></h2>
        <p></p>
      </div>
    `
    skeletonCards.appendChild(skeletonItem)
  }
}

function hideSkeletons() {
  const skeletonCards = document.getElementById("skeleton-cards")
  const productList = document.getElementById("product-list")
  skeletonCards.classList.add("fade-out")
  setTimeout(() => {
    skeletonCards.classList.add("hidden")
    skeletonCards.classList.remove("grid", "fade-out")
  }, 300)
  productList.classList.remove("hidden")
}

function updatePaginationControls() {
  const paginationControls = document.getElementById("pagination-controls")
  paginationControls.innerHTML = ""

  const prevPageButton = document.createElement("button")
  prevPageButton.id = "prev-page"
  prevPageButton.textContent = "POPRZEDNIA"
  if (currentPage === 1) {
    prevPageButton.disabled = true
  } else {
    prevPageButton.addEventListener("click", goToPreviousPage)
  }
  paginationControls.appendChild(prevPageButton)

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("span")
    pageButton.textContent = i
    if (i === currentPage) {
      pageButton.classList.add("active")
    } else {
      pageButton.addEventListener("click", () => {
        currentPage = i
        scrollUp()
        loadProducts()
      })
    }
    paginationControls.appendChild(pageButton)
  }

  const nextPageButton = document.createElement("button")
  nextPageButton.id = "next-page"

  nextPageButton.textContent = "NASTĘPNA"
  if (currentPage === totalPages) {
    nextPageButton.disabled = true
  } else {
    nextPageButton.addEventListener("click", goToNextPage)
  }
  paginationControls.appendChild(nextPageButton)
}

function goToNextPage() {
  currentPage++
  scrollUp()
  loadProducts()
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--
    scrollUp()
    loadProducts()
  }
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function setupPaginationControls() {
  document
    .getElementById("prev-page")
    .addEventListener("click", goToPreviousPage)
  document.getElementById("next-page").addEventListener("click", goToNextPage)
}

function clearProducts() {
  const productList = document.getElementById("product-list")
  productList.innerHTML = ""
}

async function loadProducts() {
  clearProducts()
  loadSkeletons()

  const urlParams = new URLSearchParams(window.location.search)
  const content = urlParams.get("query") || ""
  const category = urlParams.get("category") || ""

  const { products, totalProductCount } = await getProducts(
    currentPage,
    productsPerPage,
    content,
    category
  )

  allProducts = products
  totalPages = Math.ceil(totalProductCount / productsPerPage)

  hideSkeletons()
  ifProductsThenDisplay(allProducts)
  updatePaginationControls(products.length)
}

export function ifProductsThenDisplay(products) {
  const productList = document.getElementById("product-list")
  const noProductsContainer = document.getElementById("no-products-container")

  if (!products || products.length === 0) {
    productList.innerHTML = ""
    noProductsContainer.classList.remove("hidden")
    return
  } else {
    noProductsContainer.classList.add("hidden")
    displayProducts(products)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  setSortOptions()
  fetchCategories()
  setupCategoryFilters()
  setupPaginationControls()
  await loadProducts()
})
