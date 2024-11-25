import { BASE_URL } from "../../../../backend-config"

export async function getProducts(productData) {
  const response = await fetch(`${BASE_URL}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ products: productData }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
