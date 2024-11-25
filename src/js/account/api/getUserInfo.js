import { BASE_URL } from "../../../../backend-config"

export async function getUserInfo() {
  try {
    const response = await fetch(`${BASE_URL}/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to connect")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching user info:", error)
    return {}
  }
}
