import { updateCartCount } from "../../components/header"
import { isAuthenticated } from "../../utils/auth"
import { BASE_URL } from "../../../../backend-config"

export async function handleAddToCart(product, isUpdate) {
  let cartType = null

  if (isAuthenticated()) {
    cartType = ""
  } else {
    cartType = "cookies"
  }

  try {
    const response = await fetch(`${BASE_URL}/cart/${cartType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...product, isUpdate }),
    })

    if (!response.ok) {
      throw new Error("Failed to connect")
    }
    const data = await response.json()
    updateCartCount(data.cartData)

    return data
  } catch (error) {
    console.error("Error fetching address info:", error)
    return {}
  }
}
