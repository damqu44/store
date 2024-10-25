import "../../../index.css"
import "../../../css/input.css"

import {
  initializeInputFields,
  showError,
  removeError,
} from "../../components/input"

document.addEventListener("DOMContentLoaded", async () => {
  initializeInputFields(document.getElementById("login-form"))

  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault()

      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      let isValid = true

      if (email.trim() === "") {
        showError(document.getElementById("login-email"), "Wpisz adres e-mail")
        isValid = false
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
          showError(
            document.getElementById("login-email"),
            "Niepoprawny adres e-mail"
          )
          isValid = false
        } else {
          removeError(document.getElementById("login-email"))
        }
      }

      if (password.trim() === "") {
        showError(document.getElementById("login-password"), "Wpisz hasło")
        isValid = false
      } else {
        removeError(document.getElementById("login-password"))
      }

      if (isValid) {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:3000/auth/login", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.withCredentials = true
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              document.getElementById("server-response").textContent = ""
              onLoginSuccess()
            } else {
              const response = JSON.parse(xhr.responseText)
              document.getElementById("server-response").textContent =
                response.error
            }
          }
        }
        xhr.send(JSON.stringify({ email, password }))
      }
    })
})

function onLoginSuccess() {
  const redirectUrl = localStorage.getItem("redirectAfterLogin")

  if (redirectUrl) {
    window.location.href = redirectUrl
    localStorage.removeItem("redirectAfterLogin")
  } else {
    window.location.href = "/"
  }
}
