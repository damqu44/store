import { showModal, hideModal } from "./modal"
import {
  showError,
  removeError,
  initializeInputFields,
} from "../components/input"
import isValidDate from "../validation/isValidDate"
import isValidName from "../validation/isValidName"
import { BASE_URL } from "../../../backend-config"

export async function setupEditPersonalData(user) {
  showModal("edit-personal-data-modal")
  populateEditForm(user)
  initializeInputFields()
  initializeEventListeners()
}

function populateEditForm(user) {
  if (user.Name && user.LastName) {
    document.getElementById("edit-name").value = user.Name
    document.getElementById("edit-last-name").value = user.LastName
  }

  if (user.Gender === "MAN") {
    document.getElementById("gender-man").checked = true
  } else if (user.Gender === "FEMALE") {
    document.getElementById("gender-female").checked = true
  }

  if (user.BirthDate) {
    const birthDate = new Date(user.BirthDate)
    const day = birthDate.getUTCDate()
    const month = birthDate.getUTCMonth() + 1
    const year = birthDate.getUTCFullYear()

    document.getElementById("edit-birth-date-day").value = day
    document.getElementById("edit-birth-date-month").value = month
    document.getElementById("edit-birth-date-year").value = year
  }
}

function initializeEventListeners() {
  document
    .getElementById("edit-personal-data-cancel-btn")
    .addEventListener("click", () => hideModal("edit-personal-data-modal"))

  document
    .getElementById("edit-name")
    .addEventListener("change", () => validateName("edit-name"))
  document
    .getElementById("edit-last-name")
    .addEventListener("change", () => validateName("edit-last-name"))

  document
    .querySelectorAll(
      "#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year"
    )
    .forEach((field) => {
      field.addEventListener("change", validateDate)
    })

  document
    .getElementById("edit-personal-data-form")
    .addEventListener("submit", handleSubmit)
}

function validateName(fieldId) {
  const name = document.getElementById(fieldId).value.trim()
  if (isValidName(name)) {
    removeError(document.getElementById(fieldId))
  } else {
    showError(document.getElementById(fieldId), "Niewłaściwe dane")
  }
}

function validateDate() {
  const day = document.getElementById("edit-birth-date-day").value
  const month = document.getElementById("edit-birth-date-month").value
  const year = document.getElementById("edit-birth-date-year").value

  const validationMessage = isValidDate(day, month, year)
  const dateFields = document.querySelectorAll(
    "#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year"
  )
  const dateErrorBox = document.getElementById("date-error-box")

  if (validationMessage === "valid") {
    dateFields.forEach((field) => field.classList.remove("input-field-wrong"))
    dateErrorBox.classList.add("hidden")
    dateErrorBox.textContent = ""
  } else {
    dateFields.forEach((field) => field.classList.add("input-field-wrong"))
    dateErrorBox.classList.remove("hidden")
    dateErrorBox.textContent = validationMessage
  }
}

function handleSubmit(e) {
  e.preventDefault()
  let isValid = true

  if (!isValidName(document.getElementById("edit-name").value.trim())) {
    isValid = false
  }

  if (!isValidName(document.getElementById("edit-last-name").value.trim())) {
    isValid = false
  }

  const day = document.getElementById("edit-birth-date-day").value
  const month = document.getElementById("edit-birth-date-month").value
  const year = document.getElementById("edit-birth-date-year").value
  console.log(isValid)

  if (isValidDate(day, month, year) != "valid") {
    isValid = false
    document.getElementById("date-error-box").classList.remove("hidden")
  } else {
    document.getElementById("date-error-box").classList.add("hidden")
  }

  const gender = document.querySelector('input[name="gender"]:checked')
  if (!gender) {
    isValid = false
    document.getElementById("gender-error-box").classList.remove("hidden")
  } else {
    document.getElementById("gender-error-box").classList.add("hidden")
  }
  console.log(isValid)

  if (isValid) {
    const birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`
    const dataToSend = {
      name: document.getElementById("edit-name").value,
      lastName: document.getElementById("edit-last-name").value,
      birthDate,
      gender: gender.value,
    }

    fetch(`${BASE_URL}/user/editpersonaldata`, {
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
        document.getElementById(
          "server-response-edit-personal-data"
        ).textContent = ""
        location.reload()
      })
      .catch((error) => {
        document.getElementById(
          "server-response-edit-personal-data"
        ).textContent = error
      })
  }
}
