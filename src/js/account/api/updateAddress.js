import { BASE_URL } from "../../../../backend-config"

export async function updateAddress(addressId, addressData) {
  const response = await fetch(`${BASE_URL}/user/editaddressdelivery`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      addressId: addressId,
      ...addressData,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
