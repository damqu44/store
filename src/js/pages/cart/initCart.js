import "../../../index.css"
import { initializeCart } from "../../cart/initializeCart"
import { getCart } from "../../cart/api/getCart"
import { createCartItem } from "../../cart/createCartItem"
import { loadHeader } from "../../components/header"
import { loadFooter } from "../../components/footer"

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader()
  loadFooter()

  try {
    const cart = await getCart()

    if (!cart.cartData || cart.cartData.length > 0) {
      cart.cartData.forEach((product) => {
        createCartItem(product)
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
      console.log("set")
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
