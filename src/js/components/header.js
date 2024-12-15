import $ from "jquery"
import { checkAuth } from "../utils/auth"
import { getCart } from "../cart/api/getCart"
import { handleSearch } from "../search/handleSearch"

export async function loadHeader() {
  const app = document.getElementById("app")
  const header = document.createElement("div")
  let cart = null

  try {
    let cartType = null

    const isAuthenticated = await checkAuth()
    if (isAuthenticated) {
      cartType = ""
    } else {
      cartType = "cookies"
    }

    cart = await getCart(cartType)
  } catch (error) {
    console.error("Error loading cart data:", error)
  }

  header.id = "header"
  header.classList.add(
    "w-full",
    "px-10",
    "py-3",
    "flex",
    "justify-between",
    "sticky",
    "top-0",
    "left-0",
    "bg-white",
    "z-[33]",
    "dark:bg-[#222222]"
  )

  const isAuthenticated = await checkAuth()

  header.innerHTML = `
      <div class="font-mono text-base sm:text-2xl text-primary">
        <a href="/">Maître d'outils</a>
      </div>
      <div id="search-area" class="hidden w-full fixed top-0 left-0 py-4 sm:p-0 z-[34]  bg-white dark:bg-background_dark sm:bg-auto sm:static sm:flex sm:w-[40%] sm:max-w-[600px] shadow-sm">
        <form id="search-form" class="w-full h-[35px] flex justify-center items-center ml-3 sm:ml-0">
          <i id="close-search-area-button" class="sm:hidden fa-solid fa-arrow-left mr-2 cursor-pointer hover:text-primary transition-colors text-base"></i>
          <input type="text" placeholder="czego szukasz?" class="bg-transparent rounded-l-md border border-[#6d6d6d] px-3 py-1 w-full h-full text-sm  outline-none" />
          <button class="bg-primary hover:bg-primary_dark rounded-r-md border-l-0 h-full px-3 mr-3 sm:mr-0 text-md text-white outline-none" />
            SZUKAJ
          </button>
        </form>
      </div>
      <div class="flex justify-center items-center">
        <div id="open-search-area-button" class="flex sm:hidden w-[25%] mr-4 cursor-pointer hover:text-primary transition-colors text-base sm:text-xl"><i class="fa-solid fa-magnifying-glass"></i></div>
        <div class="mr-4 cursor-pointer hover:text-primary transition-colors text-base sm:text-xl"><i class="fa-solid fa-headset"></i></div>
        <div class="mr-6 relative group  cursor-pointer transition-colors text-base sm:text-xl">
          <a href="/cart.html">
            <i class="fas fa-shopping-cart group-hover:text-primary"></i>
            <div id="cart-count" class="absolute left-2.5 top-2.5 text-xs font-bold rounded-full w-[20px] h-[20px]  bg-primary text-white group-hover:bg-primary_dark flex justify-center items-center"></div>
          </a>
        </div>
        <div id="account-button" class="relative pr-4 text-base sm:text-xl">
            <i class="fas fa-user cursor-pointer hover:text-primary transition-colors"></i>
        </div>
        <div id="dark-mode-button">
            <i class="fa-solid fa-moon cursor-pointer text-black dark:text-white hover:text-primary transition-colors text-base sm:text-xl"></i>
        </div>
        </div>
    `
  app.prepend(header)

  updateCartCount(cart.cartData)

  const accountButton = document.getElementById("account-button")
  accountButton.addEventListener("click", () => {
    if (isAuthenticated) {
      window.location.href = "/account.html"
    } else {
      window.location.href = "/login.html"
    }
  })

  const openSearchAreaButton = document.getElementById(
    "open-search-area-button"
  )

  const closeSearchAreaButton = document.getElementById(
    "close-search-area-button"
  )

  openSearchAreaButton.addEventListener("click", () => {
    const searchArea = document.getElementById("search-area")
    searchArea.classList.remove("hidden")
  })

  closeSearchAreaButton.addEventListener("click", () => {
    const searchArea = document.getElementById("search-area")
    searchArea.classList.add("hidden")
  })

  const searchForm = document.getElementById("search-form")
  searchForm.addEventListener("submit", handleSearch)

  $(function () {
    if (localStorage.getItem("theme") === "dark") {
      $("body").addClass("dark")
    }

    $("#dark-mode-button").on("click", function () {
      $("body").toggleClass("dark")
      const isDarkMode = $("body").hasClass("dark")
      localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    })
  })
}

export function updateCartCount(cartItems) {
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement && cartItems && cartItems.length > 0) {
    const totalItems = cartItems.reduce(
      (sum, item) => sum + item.cartInfo.Amount,
      0
    )
    cartCountElement.textContent = totalItems
    cartCountElement.classList.remove("hidden")
    cartCountElement.classList.add("animate-pulse")
    setTimeout(() => {
      cartCountElement.classList.remove("animate-pulse")
    }, 2000)
  } else {
    cartCountElement.classList.add("hidden")
  }
}
