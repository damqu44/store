import '../../../index.css'

import { fetchProductById } from '../../product/fetchProductById'
import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  const productId = new URLSearchParams(window.location.search).get('id')
  if (productId) {
    fetchProductById(productId)
  }
  loadFooter()
  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
