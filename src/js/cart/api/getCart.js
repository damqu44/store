import { BASE_URL } from "../../../../backend-config"

export async function getCart(cartType) {
  try {
    const response = await fetch(`${BASE_URL}/cart/${cartType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cart data")
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error(error)
    return
  }
}
