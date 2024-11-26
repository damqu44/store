import { isAuthenticated } from "../../utils/auth"
import { BASE_URL } from "../../../../backend-config"

export async function getCart() {
  let cartType = null

  if (isAuthenticated()) {
    cartType = ""
  } else {
    cartType = "cookies"
  }

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
