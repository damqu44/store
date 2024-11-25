import {
  initializeInputFields,
  removeError,
  showError,
} from "../components/input"
import validateEmail from "../validation/isValidEmail"
import { hideModal, showModal } from "./modal"
import { BASE_URL } from "../../../backend-config"

export async function setupEditEmail(user) {
  showModal("edit-email-modal")
  populateEditForm(user)
  initializeInputFields()
  initializeEventListeners()
}

function populateEditForm(user) {
  document.getElementById("server-response-edit-email").textContent = ""
  removeError(document.getElementById("edit-email"))

  if (user.Email) {
    document.getElementById("edit-email").value = user.Email
  }
}

function initializeEventListeners() {
  document
    .getElementById("edit-email-cancel-btn")
    .addEventListener("click", () => {
      hideModal("edit-email-modal")
    })

  document
    .getElementById("edit-email-form")
    .addEventListener("submit", handleSubmit)
}

function handleSubmit(e) {
  e.preventDefault()

  const emailInput = document.getElementById("edit-email")
  if (validateEmail(emailInput.value) != "valid") {
    showError(emailInput, validateEmail(emailInput.value))
    return
  } else {
    removeError(emailInput)
  }

  fetch(`${BASE_URL}/user/editemail`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: emailInput.value }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      return response.json()
    })
    .then(() => {
      document.getElementById("server-response-edit-email").textContent = ""
      location.reload()
    })
    .catch((error) => {
      document.getElementById("server-response-edit-email").textContent = error
    })
}
