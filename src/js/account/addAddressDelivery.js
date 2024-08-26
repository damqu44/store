import { hideModal, showModal } from './modal'
import {
  initializeInputFields,
  removeError,
  showError,
} from '../components/input'
import isValidName from '../validation/isValidName'
import validateTelephone from '../validation/isValidTelephone'

export async function setupAddAddressDelivery(user) {
  showModal('add-address-delivery-modal')
  initializeInputFields()
  initializeEventListeners()
}

function initializeEventListeners() {
  document
    .getElementById('add-address-delivery-cancel-btn')
    .addEventListener('click', () => {
      hideModal('add-address-delivery-modal')
    })

  document
    .getElementById('add-address-delivery-form')
    .addEventListener('submit', handleSubmit)
}

function handleSubmit(e) {
  e.preventDefault()

  const addNameField = document.getElementById('add-address-delivery-name')
  const addLastNameField = document.getElementById(
    'add-address-delivery-last-name'
  )
  const addStreetField = document.getElementById('add-address-delivery-street')
  const addCommentField = document.getElementById(
    'add-address-delivery-comment'
  )
  const addZipCodeField = document.getElementById(
    'add-address-delivery-zip-code'
  )
  const addCityField = document.getElementById('add-address-delivery-city')
  const addTelephoneField = document.getElementById(
    'add-address-delivery-telephone'
  )

  let isValid = true

  if (addNameField.value.trim() === '') {
    showError(addNameField, 'Wpisz swoje imię')
    isValid = false
  } else if (!isValidName(addNameField.value)) {
    showError(addNameField, 'Wpisz prawidłowe imię')
    isValid = false
  } else removeError(addNameField)

  if (addLastNameField.value.trim() === '') {
    showError(addLastNameField, 'Wpisz swoje nazwisko')
    isValid = false
  } else if (!isValidName(addLastNameField.value)) {
    showError(addLastNameField, 'Wpisz prawidłowe nazwisko')
    isValid = false
  } else removeError(addLastNameField)

  if (addCommentField.value.length > 500) {
    showError(addCommentField, 'Komentarz nie może przekroczyć 500 znaków')
    isValid = false
  } else removeError(addCommentField)

  if (addStreetField.value.trim() === '') {
    showError(addStreetField, 'Wpisz adres dostawy')
    isValid = false
  } else if (addStreetField.value.length > 100) {
    showError('Adres nie może przekroczyć 100 znaków')
    isValid = false
  } else removeError(addStreetField)

  const zipCodePattern = /^\d{2}-\d{3}$/
  if (!zipCodePattern.test(addZipCodeField.value)) {
    showError(addZipCodeField, 'Kod pocztowy musi mieć format XX-XXX')
    isValid = false
  } else removeError(addZipCodeField)

  if (addCityField.value.trim() === '') {
    showError(addCityField, 'Wpisz miasto')
    isValid = false
  } else if (addCityField.value.length > 30) {
    showError(addCityField, 'Nazwa miasta nie może przekroczyć 30 znaków')
    isValid = false
  } else removeError(addCityField)

  const isTelephoneValid = validateTelephone(addTelephoneField.value)
  if (isTelephoneValid != 'valid') {
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
  }

  fetch('http://localhost:3000/user/addaddressdelivery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
        'server-response-add-address-delivery'
      ).textContent = ''
      location.reload()
    })
    .catch((error) => {
      document.getElementById(
        'server-response-add-address-delivery'
      ).textContent = error
    })
}
