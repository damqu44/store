import { displayProducts } from "./displayProducts"
import { BASE_URL } from "../../../../backend-config"

export async function fetchSortedProducts(sort = "", category = "") {
  try {
    const response = await fetch(
      `${BASE_URL}/products?sort=${sort}&category=${category}`
    )
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText)
    }
    const products = await response.json()
    displayProducts(products)
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error)
  }
}
