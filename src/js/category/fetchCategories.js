import { populateCategoryList } from "./utils"
import { BASE_URL } from "../../../backend-config"

export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) {
      throw new Error("Network response failes " + response.statusText)
    }
    const categories = await response.json()
    const categoryList = document.getElementById("category-list")
    populateCategoryList(categories, categoryList)
  } catch (error) {
    console.error("There has neem a problem with your fetch operation: ", error)
  }
}
