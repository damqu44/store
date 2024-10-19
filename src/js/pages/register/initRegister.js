import "../../../index.css"
import "../../../css/input.css"

import { loadHeader } from "../../components/header"
import { loadFooter } from "../../components/footer"
import { initializeInputFields } from "../../components/input"

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader()
  loadFooter()

  initializeInputFields(document.getElementById("register-form"))

  document
    .getElementById("register-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault()

      const email = document.getElementById("register-email").value
      const password = document.getElementById("register-password").value
      const confirmPassword = document.getElementById(
        "register-confirm-password"
      ).value
      const telephoneNumber = document.getElementById(
        "register-telephone-number"
      ).value
      const userName = document.getElementById("register-name").value
      const userLastName = document.getElementById("register-last-name").value

      let isValid = true

      function showError(inputField, message) {
        inputField.classList.add("input-field-wrong")
        const errorBox = inputField.closest(".input-wrapper").nextElementSibling
        errorBox.classList.remove("hidden")
        errorBox.textContent = message
      }

      function removeError(inputField) {
        inputField.classList.remove("input-field-wrong")
        const errorBox = inputField.closest(".input-wrapper").nextElementSibling
        errorBox.classList.add("hidden")
      }

      if (email.trim() === "") {
        showError(
          document.getElementById("register-email"),
          "Wpisz adres e-mail"
        )
        isValid = false
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
          showError(
            document.getElementById("register-email"),
            "Niepoprawny adres e-mail"
          )
          isValid = false
        } else {
          removeError(document.getElementById("register-email"))
        }
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!passwordPattern.test(password)) {
        showError(
          document.getElementById("register-password"),
          "Min. 8 znaków • wielka litera • mała litera • cyfra"
        )
        isValid = false
      } else {
        removeError(document.getElementById("register-password"))
      }

      if (password !== confirmPassword) {
        showError(
          document.getElementById("register-confirm-password"),
          "Hasła muszą być identyczne"
        )
        isValid = false
      } else {
        removeError(document.getElementById("register-confirm-password"))
      }

      const phonePattern = /^\d{9}$/
      if (!phonePattern.test(telephoneNumber)) {
        showError(
          document.getElementById("register-telephone-number"),
          "Numer telefonu musi zawierać 9 liczb"
        )
        isValid = false
      } else {
        removeError(document.getElementById("register-telephone-number"))
      }

      if (userName.length < 1) {
        showError(document.getElementById("register-name"), "Wpisz imię")
        isValid = false
      } else {
        removeError(document.getElementById("register-name"))
      }

      if (userLastName.length < 1) {
        showError(
          document.getElementById("register-last-name"),
          "Wpisz nazwisko"
        )
        isValid = false
      } else {
        removeError(document.getElementById("register-last-name"))
      }
      const telephone = parseInt(telephoneNumber)

      if (isValid) {
        const data = await register({
          email,
          password,
          telephone,
          userName,
          userLastName,
        })

        if (data) {
          document.getElementById("server-response").textContent = ""

          const overlay = document.createElement("div")
          overlay.className = "alert-overlay"

          const successAlert = document.createElement("div")
          successAlert.className = "alert"
          successAlert.innerHTML =
            "Rejestracja powiodła się! Kliknij OK, aby przejść do strefy logowania.<br>Zostaniesz przekierowany za 5 sekund."

          const okButton = document.createElement("button")
          okButton.className = "ok-button"
          okButton.textContent = "OK"

          successAlert.appendChild(okButton)
          overlay.appendChild(successAlert)
          document.body.appendChild(overlay)

          okButton.addEventListener("click", function () {
            window.location.href = "/login.html"
          })

          setTimeout(function () {
            window.location.href = "/login.html"
          }, 5000)
        } else {
          const serverResponse = document.getElementById("server-response")
          serverResponse.classList.add("text-[#a50000]")
          serverResponse.textContent = "Błąd rejestracji, spróbuj ponownie."
        }
      }
    })
})

async function register({
  email,
  password,
  telephone,
  userName,
  userLastName,
}) {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        telephone,
        userName,
        userLastName,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to register")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return
  }
}
