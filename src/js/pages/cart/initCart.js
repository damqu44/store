import '../../../index.css'
import { initializeCart } from '../../cart/initializeCart'
import { handleSearch } from '../../search/handleSearch'
import { getCart } from '../../cart/getCart'
import { createCartItem } from '../../cart/createCartItem'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  loadFooter()

  try {
    const dataCart = await getCart()
    if (
      dataCart &&
      Array.isArray(dataCart.CartItems) &&
      dataCart.CartItems.length > 0
    ) {
      dataCart.CartItems.forEach((product) => {
        createCartItem(product)
      })
    } else if (dataCart && Array.isArray(dataCart) && dataCart.length > 0) {
      dataCart.forEach((product) => {
        createCartItem(product)
      })
    } else {
      console.warn('cart is empty', dataCart)
      emptyCart()
    }
    console.log('AAAl', dataCart)

    initializeCart()

    if (dataCart) {
      const productData = dataCart.map((item) => ({
        id: item.Id,
        amount: item.cartInfo.Amount,
      }))
      sessionStorage.setItem('cartProducts', JSON.stringify(productData))

      const transactionButton = document.getElementById('transaction-button')
      transactionButton.addEventListener('click', () => {
        window.location.href = '/transaction.html'
      })
    }
  } catch (error) {
    console.error('Error loading cart data:', error)
  }

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})

export function emptyCart() {
  const cartContent = document.getElementById('cart')
  cartContent.innerHTML = `
      <div
        class="text-[#84949F] flex flex-col w-full justify-start items-center mt-[100px]"
      >
        <div>
          <div class="text-lg">Twój koszyk jest pusty</div>
          <div class="text-sm">
            Dodaj do koszyka przedmioty i kup je szybko i wygodnie.
          </div>
        </div>
      </div>
      `
}
