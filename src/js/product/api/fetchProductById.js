import { displayProductDetails } from "../displayProductDetails"
import { BASE_URL } from "../../../../backend-config"

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const product = await response.json()
    displayProductDetails(product)
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error)
    // window.location.href = '/error.html'
  }
}
