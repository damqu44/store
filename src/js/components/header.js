import $ from 'jquery'
import { isAuthenticated } from '../utils/auth'
import { getCart } from '../cart/getCart'

export async function loadHeader() {
  const app = document.getElementById('app')
  const header = document.createElement('div')
  let dataCart = []
  try {
    dataCart = await getCart()

    if (
      (!dataCart && !Array.isArray(dataCart.CartItems)) ||
      !Array.isArray(dataCart)
    ) {
      console.warn('cart is empty', dataCart)
    }
  } catch (error) {
    console.error('Error loading cart data:', error)
  }

  header.classList.add(
    'w-full',
    'px-10',
    'py-3',
    'flex',
    'justify-between',
    'bg-white',
    'dark:bg-[#222222]'
  )

  const authStatus = isAuthenticated()

  header.innerHTML = `
      <div class="font-mono text-2xl text-primary">
        <a href="/">chow chow</a>
      </div>
      <div class="hidden sm:flex w-[25%]">
        <form id="search-form" class="w-full flex justify-center items-center">
          <input type="text" placeholder="czego szukasz?" class="bg-transparent rounded-l-md border border-[#6d6d6d] px-3 py-1 w-full text-sm h-[35px] outline-none" />
          <button class="bg-primary hover:bg-primary_dark rounded-r-md border-l-0 h-full px-3 text-md text-white outline-none">
            SZUKAJ
          </button>
        </form>
      </div>
      <div class="flex justify-center items-center">
        <div class="pr-6 cursor-pointer hover:text-primary transition-colors">KONTAKT</div>
        <div class="pr-6 relative group  cursor-pointer transition-colors">
          <a href="/cart.html">
            <i class="fas fa-shopping-cart group-hover:text-primary"></i>
            <div id="cart-count" class="absolute left-2.5 top-2.5 text-xs font-bold rounded-full w-[20px] h-[20px]  bg-primary text-white group-hover:bg-primary_dark flex justify-center items-center"></div>
          </a>
        </div>
        <div id="account-button" class="relative pr-6">
            <i class="fas fa-user cursor-pointer hover:text-primary transition-colors"></i>
        </div>
        <div id="dark-mode-button">
            <i class="fa-solid fa-moon cursor-pointer text-black dark:text-white hover:text-primary transition-colors"></i>
        </div>
        </div>
    `
  app.prepend(header)

  updateCartCount(dataCart)

  const accountButton = document.getElementById('account-button')
  accountButton.addEventListener('click', () => {
    if (authStatus) {
      window.location.href = '/account.html'
    } else {
      window.location.href = '/login.html'
    }
  })

  $(function () {
    if (localStorage.getItem('theme') === 'dark') {
      $('body').addClass('dark')
    }

    $('#dark-mode-button').on('click', function () {
      $('body').toggleClass('dark')
      const isDarkMode = $('body').hasClass('dark')
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    })
  })
}

export function updateCartCount(cartItems) {
  const cartCountElement = document.getElementById('cart-count')
  if (cartCountElement) {
    const totalItems = cartItems.reduce(
      (sum, item) => sum + item.cartInfo.Amount,
      0
    )
    if (totalItems === 0 || isNaN(totalItems)) {
      cartCountElement.classList.add('hidden')
    } else {
      cartCountElement.textContent = totalItems
      cartCountElement.classList.remove('hidden')
      cartCountElement.classList.add('animate-pulse')
      setTimeout(() => {
        cartCountElement.classList.remove('animate-pulse')
      }, 2000)
    }
  }
}
