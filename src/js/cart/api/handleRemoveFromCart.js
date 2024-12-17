import { updateProductValue } from "../initializeCart"
import { updateCartCount } from "../../components/header"
import { emptyCart } from "../../pages/cart/initCart"
import { BASE_URL } from "../../../../backend-config"

export async function handleRemoveFromCart(productId, cartType) {
  try {
    const response = await fetch(
      `${BASE_URL}/cart${cartType ? `/${cartType}` : ""}/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to connect")
    }

    const data = await response.json()
    updateCartCount(data.cartData)

    const cartItem = document.getElementById(`cart-item-${productId}`)
    if (cartItem) {
      cartItem.remove()
    }

    if (data.cartData.length < 1) {
      emptyCart()
    }
    updateProductValue()
  } catch (error) {
    console.error(error)
    return {}
  }
}
