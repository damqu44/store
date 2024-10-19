import { updateCartCount } from "../../components/header"

export async function handleAddToCart(product, isUpdate, cartType) {
  try {
    const response = await fetch(`http://localhost:3000/cart/${cartType}`, {
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
