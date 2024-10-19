export async function fetchProductByIds(productsIds) {
  try {
    const response = await fetch("http://localhost:3000/products/ids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productsIds }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }
}
