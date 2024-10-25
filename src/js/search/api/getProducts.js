export async function getProducts(
  currentPage,
  productsPerPage,
  content,
  category
) {
  try {
    const response = await fetch(
      `http://localhost:3000/search/?page=${currentPage}&limit=${productsPerPage}&content=${encodeURIComponent(content)}&category=${encodeURIComponent(category)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(response.statusText)
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }
}
