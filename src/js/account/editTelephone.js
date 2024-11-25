import { hideModal, showModal } from "./modal"
import {
  initializeInputFields,
  removeError,
  showError,
} from "../components/input"
import validateTelephone from "../validation/isValidTelephone"
import { BASE_URL } from "../../../backend-config"

export async function setupEditTelephone(user) {
  showModal("edit-telephone-modal")
  populateEditForm(user)
  initializeInputFields()
  initializeEventListeners()
}

function populateEditForm(user) {
  document.getElementById("server-response-edit-telephone").textContent = ""
  removeError(document.getElementById("edit-telephone"))

  if (user.Telephone) {
    document.getElementById("edit-telephone").value = user.Telephone
  }
}

function initializeEventListeners() {
  document
    .getElementById("edit-telephone-cancel-btn")
    .addEventListener("click", () => {
      hideModal("edit-telephone-modal")
    })

  document
    .getElementById("edit-telephone-form")
    .addEventListener("submit", handleSubmit)
}

function handleSubmit(e) {
  e.preventDefault()

  const telephoneInput = document.getElementById("edit-telephone")

  if (validateTelephone(telephoneInput.value) != "valid") {
    showError(telephoneInput, validateTelephone(telephoneInput.value))
    return
  } else {
    removeError(telephoneInput)
  }

  fetch(`${BASE_URL}/user/edittelephone`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ telephone: telephoneInput.value }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      return response.json
    })
    .then(() => {
      document.getElementById("server-response-edit-telephone").textContent = ""
      location.reload()
    })
    .catch((error) => {
      document.getElementById("server-response-edit-email").textContent = error
    })
}
