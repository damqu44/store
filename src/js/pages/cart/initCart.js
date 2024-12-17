import "../../../index.css"
import { initializeCart } from "../../cart/initializeCart"
import { getCart } from "../../cart/api/getCart"
import { createCartItem } from "../../cart/createCartItem"
import { checkAuth } from "../../utils/auth"

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let cartType = null

    const isAuthenticated = await checkAuth()
    if (isAuthenticated) {
      cartType = ""
    } else {
      cartType = "cookies"
    }

    const cart = await getCart(cartType)
    if (!cart.cartData || cart.cartData.length > 0) {
      cart.cartData.forEach((product) => {
        createCartItem(product, cartType)
      })
    } else {
      emptyCart()
    }
    initializeCart()

    if (cart.cartData && cart.cartData.length > 0) {
      const productData = cart.cartData.map((item) => ({
        id: item.Id,
        amount: item.cartInfo.Amount,
      }))
      sessionStorage.setItem("cartProducts", JSON.stringify(productData))
      const transactionButton = document.getElementById("transaction-button")
      if (transactionButton) {
        transactionButton.addEventListener("click", () => {
          window.location.href = "/transaction.html"
        })
      }
    }
  } catch (error) {
    console.error("Error loading cart data:", error)
  }
})

export function emptyCart() {
  const cartContent = document.getElementById("cart")
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
