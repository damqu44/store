import { removeError, showError } from '../components/input'
import isValidName from '../validation/isValidName'
import validateTelephone from '../validation/isValidTelephone'
import { updateAddress } from './api/updateAddress'

let currentAddress = null

export const setupEditAddress = (address) => {
  populateEditAddressForm(address)
  currentAddress = address
}

function populateEditAddressForm(address) {
  document.getElementById('edit-address-delivery-name').value =
    address.Name || ''
  document.getElementById('edit-address-delivery-last-name').value =
    address.LastName || ''
  document.getElementById('edit-address-delivery-street').value =
    address.Street || ''
  document.getElementById('edit-address-delivery-zip-code').value =
    address.ZipCode || ''
  document.getElementById('edit-address-delivery-city').value =
    address.City || ''
  document.getElementById('edit-address-delivery-telephone').value =
    address.Telephone || ''

  document
    .getElementById('edit-address-delivery-form')
    .addEventListener('submit', handleEditAddressSubmit)
}

async function handleEditAddressSubmit(e) {
  e.preventDefault()

  if (!currentAddress) {
    document.getElementById(
      'server-response-edit-address-delivery'
    ).textContent = 'No address selected'
    return
  }

  let isValid = validateEditAddressForm()

  if (!isValid) return

  try {
    await updateAddress(currentAddress.Id, {
      name: document.getElementById('edit-address-delivery-name').value,
      lastName: document.getElementById('edit-address-delivery-last-name')
        .value,
      street: document.getElementById('edit-address-delivery-street').value,
      city: document.getElementById('edit-address-delivery-city').value,
      zipCode: document.getElementById('edit-address-delivery-zip-code').value,
      telephone: document.getElementById('edit-address-delivery-telephone')
        .value,
    })

    document.getElementById(
      'server-response-edit-address-delivery'
    ).textContent = ''
    location.reload()
  } catch (error) {
    document.getElementById(
      'server-response-edit-address-delivery'
    ).textContent = error
  }
}

function validateEditAddressForm() {
  let isValid = true

  const editNameField = document.getElementById('edit-address-delivery-name')
  const editLastNameField = document.getElementById(
    'edit-address-delivery-last-name'
  )
  const editStreetField = document.getElementById(
    'edit-address-delivery-street'
  )
  const editZipCodeField = document.getElementById(
    'edit-address-delivery-zip-code'
  )
  const editCityField = document.getElementById('edit-address-delivery-city')
  const editTelephoneField = document.getElementById(
    'edit-address-delivery-telephone'
  )

  if (editNameField.value.trim() === '') {
    showError(editNameField, 'Wpisz swoje imię')
    isValid = false
  } else if (!isValidName(editNameField.value)) {
    showError(editNameField, 'Wpisz prawidłowe imię')
    isValid = false
  } else removeError(editNameField)

  if (editLastNameField.value.trim() === '') {
    showError(editLastNameField, 'Wpisz swoje nazwisko')
    isValid = false
  } else if (!isValidName(editLastNameField.value)) {
    showError(editLastNameField, 'Wpisz prawidłowe nazwisko')
    isValid = false
  } else removeError(editLastNameField)

  if (editStreetField.value.trim() === '') {
    showError(editStreetField, 'Wpisz adres dostawy')
    isValid = false
  } else if (editStreetField.value.length > 100) {
    showError(editStreetField, 'Adres nie może przekroczyć 100 znaków')
    isValid = false
  } else removeError(editStreetField)

  const zipCodePattern = /^\d{2}-\d{3}$/
  if (!zipCodePattern.test(editZipCodeField.value)) {
    showError(editZipCodeField, 'Kod pocztowy musi mieć format XX-XXX')
    isValid = false
  } else removeError(editZipCodeField)

  if (editCityField.value.trim() === '') {
    showError(editCityField, 'Wpisz miasto')
    isValid = false
  } else if (editCityField.value.length > 30) {
    showError(editCityField, 'Nazwa miasta nie może przekroczyć 30 znaków')
    isValid = false
  } else removeError(editCityField)

  const isTelephoneValid = validateTelephone(editTelephoneField.value)
  if (isTelephoneValid != 'valid') {
    showError(editTelephoneField, isTelephoneValid)
    isValid = false
  } else removeError(editTelephoneField)

  return isValid
}
