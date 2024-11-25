import { BASE_URL } from "../../../../backend-config"

export async function getTransaction(transactionData) {
  const response = await fetch(`${BASE_URL}/transaction/getTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ transactionData }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
