import '../../../index.css'

import { handleSearch } from '../../search/handleSearch'
import { getCart } from '../../cart/getCart'
import { createCartItem } from '../../cart/createCartItem'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

document.addEventListener('DOMContentLoaded', async () => {
  loadHeader()
  loadFooter()

  try {
    const dataCart = await getCart()

    dataCart.forEach((product) => {
      createCartItem(product)
    })
  } catch (error) {
    console.error('Error loading cart data:', error)
  }

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
