import { BASE_URL } from "../../../../backend-config"

export async function getUserAddressbyId(addressId) {
  try {
    const response = await fetch(`${BASE_URL}/user/getaddressdeliverybyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        addressId: addressId,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to connect")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching address info:", error)
    return {}
  }
}
