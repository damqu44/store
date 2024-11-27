// import { isAuthenticated } from "../../utils/auth"
// import { BASE_URL } from "../../../../backend-config"

// export async function getCart() {
//   let cartType = null

//   if (isAuthenticated()) {
//     cartType = ""
//   } else {
//     cartType = "cookies"
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/cart/${cartType}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     })

//     if (!response.ok) {
//       throw new Error("Failed to fetch cart data")
//     }

//     const data = await response.json()
//     console.log(data)

//     return data || []
//   } catch (error) {
//     console.error(error)
//     return
//   }
// }
// import { isAuthenticated } from "../../utils/auth"
// import { BASE_URL } from "../../../../backend-config"

// export async function getCart() {
//   let cartType = null

//   if (isAuthenticated()) {
//     cartType = ""
//   } else {
//     cartType = "cookies"
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/cart/${cartType}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     })

//     if (!response.ok) {
//       throw new Error("Failed to fetch cart data")
//     }

//     const data = await response.json()
//     console.log(data)

//     return data || []
//   } catch (error) {
//     console.error(error)
//     return
//   }
// }

export async function getCart() {
  try {
    const response = await fetch(
      `https://nodejs-serverless-beta.vercel.app/api/hello`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch cart data")
    }

    const data = await response.json()
    console.log(data)

    return data || []
  } catch (error) {
    console.error(error)
    return
  }
}
