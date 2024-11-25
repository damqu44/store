import { BASE_URL } from "../../../../backend-config"

export async function getOrders() {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
