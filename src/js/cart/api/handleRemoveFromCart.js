import { updateProductValue } from "../initializeCart"
import { updateCartCount } from "../../components/header"
import { emptyCart } from "../../pages/cart/initCart"
import { BASE_URL } from "../../../../backend-config"

export function handleRemoveFromCart(productId, cartType) {
  fetch(`${BASE_URL}/cart${cartType ? `/${cartType}` : ""}/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response Error")
      }
      return response.json()
    })
    .then((data) => {
      updateCartCount(data.cartData)
      const cartItem = document.getElementById(`cart-item-${productId}`)
      if (cartItem) {
        cartItem.remove()
      }

      if (data.cartData.length < 1) {
        emptyCart()
      }

      updateProductValue()
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}
