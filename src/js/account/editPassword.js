import { hideModal, showModal } from "./modal"
import {
  initializeInputFields,
  removeError,
  showError,
} from "../components/input"
import validatePassword from "../validation/isValidPassword"
import { BASE_URL } from "../../../backend-config"

export async function setupEditPassword() {
  showModal("edit-password-modal")
  populateEditForm()
  initializeInputFields()
  initializeEventListeners()
}

function populateEditForm() {
  const passwordInput = document.getElementById("edit-password")
  const confirmPasswordInput = document.getElementById("edit-confirm-password")
  const oldPasswordInput = document.getElementById("edit-old-password")

  document.getElementById("server-response-edit-email").textContent = ""

  passwordInput.value = ""
  confirmPasswordInput.value = ""
  oldPasswordInput.value = ""

  removeError(passwordInput)
  removeError(confirmPasswordInput)

  passwordInput.focus()
  passwordInput.blur()

  confirmPasswordInput.focus()
  confirmPasswordInput.blur()

  oldPasswordInput.focus()
  oldPasswordInput.blur()
}

function initializeEventListeners() {
  document
    .getElementById("edit-password-cancel-btn")
    .addEventListener("click", () => {
      hideModal("edit-password-modal")
    })

  document
    .getElementById("edit-password-form")
    .addEventListener("submit", handleSubmit)
}

function handleSubmit(e) {
  e.preventDefault()

  const passwordInput = document.getElementById("edit-password")
  const confirmPasswordInput = document.getElementById("edit-confirm-password")
  const oldPasswordInput = document.getElementById("edit-old-password")

  if (oldPasswordInput.value.trim() === "") {
    showError(oldPasswordInput, "Wpisz obecne hasło")
    return
  } else {
    removeError(oldPasswordInput)
  }

  const validationResult = validatePassword(
    passwordInput.value,
    confirmPasswordInput.value
  )

  if (validationResult !== "valid") {
    showError(passwordInput, validationResult)
    return
  } else {
    removeError(passwordInput)
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    showError(confirmPasswordInput, "Hasła muszą być identyczne")
    return
  } else {
    removeError(confirmPasswordInput)
  }

  const dataToSend = {
    oldPassword: oldPasswordInput.value,
    newPassword: passwordInput.value,
  }

  fetch(`${BASE_URL}/user/editpassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dataToSend),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      return response.json()
    })
    .then(() => {
      document.getElementById("server-response-edit-password").textContent = ""
      location.reload()
    })
    .catch((error) => {
      document.getElementById("server-response-edit-password").textContent =
        `${error}`
      console.log(error.message)
    })
}
