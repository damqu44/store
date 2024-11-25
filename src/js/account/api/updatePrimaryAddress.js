import { BASE_URL } from "../../../../backend-config"

export async function updatePrimaryAddress(address) {
  const response = await fetch(`${BASE_URL}/user/editprimaryaddressdelivery`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ addressDeliveryId: address.Id }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
