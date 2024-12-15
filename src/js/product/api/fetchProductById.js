import { displayProductDetails } from "../displayProductDetails"
import { BASE_URL } from "../../../../backend-config"
import { checkAuth } from "../../utils/auth"

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const product = await response.json()

    let cartType = null
    const isAuthenticated = await checkAuth()
    if (isAuthenticated) {
      cartType = ""
    } else {
      cartType = "cookies"
    }

    displayProductDetails(product, cartType)
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error)
  }
}
