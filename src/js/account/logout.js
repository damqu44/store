import { BASE_URL } from "../../../backend-config"

export function handleLogout() {
  document
    .getElementById("logout-button")
    .addEventListener("click", function (e) {
      e.preventDefault()

      const xhr = new XMLHttpRequest()
      xhr.open("POST", `${BASE_URL}/auth/logout`, true)
      xhr.withCredentials = true

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log("Logged out successfully", JSON.parse(xhr.responseText))
            window.location.href = "/login.html"
          } else {
            const response = JSON.parse(xhr.responseText)
            console.log(response.error)
          }
        }
      }

      xhr.send()
    })
}
