// export function isAuthenticated() {
//   const cookies = document.cookie
//     .split(";")
//     .map((cookie) => cookie.trim())
//     .reduce((acc, cookie) => {
//       const [key, value] = cookie.split("=")
//       acc[key] = value
//       return acc
//     }, {})

//   console.log("Ciasteczka:", cookies)
//   console.log("authToken:", cookies.authToken)

//   return cookies.authToken !== undefined && cookies.authToken !== ""
// }

// export function checkAuth() {
//   if (!isAuthenticated()) {
//     const currentUrl = window.location.href
//     if (currentUrl) {
//       localStorage.setItem("redirectAfterLogin", currentUrl)
//     }
//     // window.location.href = "/login.html";
//   }
// }

// export function redirectAfterLogin() {
//   const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/"
//   localStorage.removeItem("redirectAfterLogin")
//   window.location.href = redirectUrl
// }

import { BASE_URL } from "../../../backend-config"

export async function isAuthenticated() {
  try {
    const response = await fetch(`${BASE_URL}/verify-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cart data")
    }

    const data = await response.json()
    console.log(data)

    if (data.userId) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    // window.location.href = "/login.html"
  }
}
