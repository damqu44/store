import home from './js/home'
import product from './js/product'
import search from './js/search'

function initHomePage() {
  home.init()
}

function initProductPage() {
  product.init()
}

function initSearchPage() {
  search.init()
}

function initPage() {
  const path = window.location.pathname

  const productPageRegex = /^\/product\.html\?id=\d+$/
  const searchPageRegex = /^\/search\.html\?content=\w+$/

  if (path === '/' || path === '/home') {
    initHomePage()
  } else if (productPageRegex.test(path)) {
    initProductPage()
  } else if (searchPageRegex.test(path)) {
    initSearchPage()
  } else {
    console.error('Nieznana ścieżka URL')
  }
}

document.addEventListener('DOMContentLoaded', initPage)
