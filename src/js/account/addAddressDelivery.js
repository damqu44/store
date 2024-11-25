import { hideModal, showModal } from "./modal"
import {
  initializeInputFields,
  removeError,
  showError,
} from "../components/input"
import isValidName from "../validation/isValidName"
import validateTelephone from "../validation/isValidTelephone"
import { BASE_URL } from "../../../backend-config"

export async function setupAddAddressDelivery() {
  createAddAddressModal()
  showModal("add-address-delivery-modal")
  initializeInputFields()
  initializeEventListeners()
}

function initializeEventListeners() {
  document
    .getElementById("add-address-delivery-cancel-btn")
    .addEventListener("click", () => {
      hideModal("add-address-delivery-modal")
      const showAddressesModal = document.getElementById(
        "show-addresses-delivery-modal"
      )
      if (showAddressesModal) {
        hideModal("show-addresses-delivery-modal")
      }
    })

  document
    .getElementById("add-address-delivery-form")
    .addEventListener("submit", handleSubmit)
}

function createAddAddressModal() {
  const addAddressModal = document.createElement("div")
  addAddressModal.id = "add-address-delivery-modal"
  addAddressModal.classList.add(
    "fixed",
    "top-[50%]",
    "left-[50%]",
    "translate-x-[-50%]",
    "translate-y-[-50%]",
    "w-full",
    "sm:w-[50vw]",
    "max-h-[90vh]",
    "bg-white",
    "dark:bg-background_dark",
    "px-10",
    "py-5",
    "hidden",
    "overflow-auto",
    "z-20",
    "modal"
  )
  addAddressModal.innerHTML = `
  <form id='add-address-delivery-form' class='flex flex-col'>
      <div class='font-bold text-2xl mb-4'>DODAJ NOWY ADRES</div>
      <div id='add-address-delivery-personal-data' class='flex w-full'>
        <div class='flex flex-col flex-1'>
          <div class='input-wrapper flex-1 mr-3'>
            <label for='add-address-delivery-name' class='input-label'>
              Imię
            </label>
            <input
              class='input-field'
              type='text'
              id='add-address-delivery-name'
              name='addAddressDeliveryName'
              placeholder=''
            />
          </div>
          <div class='error-box hidden'></div>
        </div>
        <div class='flex flex-col flex-1'>
          <div class='input-wrapper flex-1'>
            <label for='add-address-delivery-last-name' class='input-label'>
              Nazwisko
            </label>
            <input
              class='input-field'
              type='text'
              id='add-address-delivery-last-name'
              name='addAddressDeliveryLastName'
              placeholder=''
            />
          </div>
          <div class='error-box hidden'></div>
        </div>
      </div>
      <div class='input-wrapper mt-3'>
        <label for='add-address-delivery-street' class='input-label'>
          Adres
        </label>
        <input
          class='input-field'
          type='text'
          id='add-address-delivery-street'
          name='addAddressDeliveryStreet'
          placeholder=''
        />
      </div>
      <div class='error-box hidden'></div>
      <div id='add-address-delivery-post-data' class='flex w-full'>
        <div class='flex flex-col flex-1'>
          <div class='input-wrapper flex-1 mt-3 mr-3'>
            <label for='add-address-delivery-zip-code' class='input-label'>
              Kod pocztowy
            </label>
            <input
              class='input-field'
              type='text'
              id='add-address-delivery-zip-code'
              name='addAddressDeliveryZipCode'
              placeholder=''
            />
          </div>
          <div class='error-box hidden'></div>
        </div>
        <div class='flex flex-col flex-1'>
          <div class='input-wrapper flex-1 mt-3'>
            <label for='add-address-delivery-city' class='input-label'>
              Miasto
            </label>
            <input
              class='input-field'
              type='text'
              id='add-address-delivery-city'
              name='addAddressDeliveryCity'
              placeholder=''
            />
          </div>
          <div class='error-box hidden'></div>
        </div>
      </div>
      <div class='input-wrapper mt-3'>
        <label for='add-address-delivery-telephone' class='input-label'>
          Numer telefonu komórkowego
        </label>
        <input
          class='input-field'
          type='text'
          id='add-address-delivery-telephone'
          name='addAddressDeliveryTelephone'
          placeholder=''
        />
      </div>
      <div class='error-box hidden'></div>
      <button
        type='submit'
        id='add-address-delivery-send-btn'
        class='text-white text-left bg-primary_dark hover:bg-primary text-base font-semibold py-2 px-5 mt-4 mb-2 text-nowrap'
      >
        ZAPISZ ADRES
      </button>
      <button
        type='button'
        id='add-address-delivery-cancel-btn'
        class='text-left bg-white dark:bg-background_dark border border-[#ccc] hover:text-gray-500 dark:hover:text-gray-200 text-base font-semibold py-2 px-5 text-nowrap'
      >
        ANULUJ
      </button>
      <div
        id='server-response-add-address-delivery'
        class='p-2 text-sm text-[#a50000]'
      ></div>
    </form>
  `
  const app = document.getElementById("app")
  app.appendChild(addAddressModal)
}

function handleSubmit(e) {
  e.preventDefault()

  const addNameField = document.getElementById("add-address-delivery-name")
  const addLastNameField = document.getElementById(
    "add-address-delivery-last-name"
  )
  const addStreetField = document.getElementById("add-address-delivery-street")
  const addZipCodeField = document.getElementById(
    "add-address-delivery-zip-code"
  )
  const addCityField = document.getElementById("add-address-delivery-city")
  const addTelephoneField = document.getElementById(
    "add-address-delivery-telephone"
  )

  let isValid = true

  if (addNameField.value.trim() === "") {
    showError(addNameField, "Wpisz swoje imię")
    isValid = false
  } else if (!isValidName(addNameField.value)) {
    showError(addNameField, "Wpisz prawidłowe imię")
    isValid = false
  } else removeError(addNameField)

  if (addLastNameField.value.trim() === "") {
    showError(addLastNameField, "Wpisz swoje nazwisko")
    isValid = false
  } else if (!isValidName(addLastNameField.value)) {
    showError(addLastNameField, "Wpisz prawidłowe nazwisko")
    isValid = false
  } else removeError(addLastNameField)

  if (addStreetField.value.trim() === "") {
    showError(addStreetField, "Wpisz adres dostawy")
    isValid = false
  } else if (addStreetField.value.length > 100) {
    showError("Adres nie może przekroczyć 100 znaków")
    isValid = false
  } else removeError(addStreetField)

  const zipCodePattern = /^\d{2}-\d{3}$/
  if (!zipCodePattern.test(addZipCodeField.value)) {
    showError(addZipCodeField, "Kod pocztowy musi mieć format XX-XXX")
    isValid = false
  } else removeError(addZipCodeField)

  if (addCityField.value.trim() === "") {
    showError(addCityField, "Wpisz miasto")
    isValid = false
  } else if (addCityField.value.length > 30) {
    showError(addCityField, "Nazwa miasta nie może przekroczyć 30 znaków")
    isValid = false
  } else removeError(addCityField)

  const isTelephoneValid = validateTelephone(addTelephoneField.value)
  if (isTelephoneValid != "valid") {
    showError(addTelephoneField, isTelephoneValid)
    isValid = false
  } else removeError(addTelephoneField)

  if (!isValid) return

  const dataToSend = {
    name: addNameField.value,
    lastName: addLastNameField.value,
    street: addStreetField.value,
    city: addCityField.value,
    zipCode: addZipCodeField.value,
    telephone: addTelephoneField.value,
  }

  fetch(`${BASE_URL}/user/addaddressdelivery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dataToSend),
  })
    .then(async (response) => {
      if (!response) {
        const error = await response.json()
        throw new Error(error.massage)
      }
      return response.json()
    })
    .then(() => {
      document.getElementById(
        "server-response-add-address-delivery"
      ).textContent = ""
      location.reload()
    })
    .catch((error) => {
      document.getElementById(
        "server-response-add-address-delivery"
      ).textContent = error
    })
}
