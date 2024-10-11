import { hideModal, showModal } from '../account/modal'
import {
  initializeInputFields,
  removeError,
  showError,
} from '../components/input'
import { isValidPostalCode } from '../validation/isValidPostalCode'
import validateTelephone from '../validation/isValidTelephone'

export function displayInvoiceDetails(user) {
  const isInvoiceCheckbox = document.getElementById('is-invoice-checkbox')
  isInvoiceCheckbox.addEventListener('change', () => {
    const invoiceWrapper = document.getElementById('invoice-wrapper')

    if (isInvoiceCheckbox.checked) {
      invoiceWrapper.classList.remove('hidden')
    } else {
      invoiceWrapper.classList.add('hidden')
    }
  })

  const invoiceChangeBtn = document.getElementById('invoice-change-btn')
  createInvoiceChangeModal()

  invoiceChangeBtn.addEventListener('click', () => {
    showModal('invoice-change-modal')

    document
      .getElementById('invoice-change-form')
      .addEventListener('submit', (e) => {
        e.preventDefault()
        handleUpdate()
      })

    document
      .getElementById('invoice-change-cancel-btn')
      .addEventListener('click', () => {
        hideModal('invoice-change-modal')
      })
  })

  function createInvoiceChangeModal() {
    const invoiceChangeModal = document.createElement('div')
    invoiceChangeModal.id = 'invoice-change-modal'
    invoiceChangeModal.classList.add('modal', 'hidden')

    invoiceChangeModal.innerHTML = ` 
          <form id="invoice-change-form" class="flex flex-col">
            <div class="font-bold text-2xl mb-4">Dane do faktury</div>
             <div
              id="invoice-wrapper"
              class="w-full p-5 flex flex-col gap-2">
  
              <div class="flex w-full">
                <div class="flex flex-col flex-1">
                  <div class="input-wrapper flex-1 mr-3">
                    <label for="invoice-name" class="input-label">Imię *</label>
                    <input type="text" id="invoice-name" class="input-field" name="invoiceName" placeholder=""></input>
                  </div>
                  <div class="error-box hidden"></div>
                </div>
                <div class="flex flex-col flex-1">
                  <div class="input-wrapper flex-1">
                    <label for="invoice-last-name" class="input-label">Nazwisko *</label>
                    <input type="text" id="invoice-last-name" class="input-field" name="invoiceLastName" placeholder=""></input>
                  </div>
                  <div class="error-box hidden"></div>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="input-wrapper">
                  <label for="invoice-street" class="input-label">Adres</label>
                  <input type="text" id="invoice-street" class="input-field" name="invoiceStreet" placeholder=""></input>
                </div>
                <div class="error-box hidden"></div>
              </div>
              <div class="flex w-full">
                <div class="flex flex-col flex-1">
                  <div class="input-wrapper flex-1 mr-3">
                    <label for="invoice-city" class="input-label">Miasto</label>
                    <input type="text" id="invoice-city" class="input-field" name="invoiceCity" placeholder=""></input>
                  </div>
                  <div class="error-box hidden"></div>
                </div>
                <div class="flex flex-col flex-1">
                  <div class="input-wrapper flex-1">
                    <label for="invoice-zip-code" class="input-label">Kod pocztowy</label>
                    <input type="text" id="invoice-zip-code" class="input-field" name="invoiceZipCode" placeholder=""></input>
                  </div>
                  <div class="error-box hidden"></div>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="input-wrapper">
                  <label for="invoice-telephone" class="input-label">Numer telefonu</label>
                  <input type="text" id="invoice-telephone" class="input-field" name="invoiceTelephone" placeholder=""></input>
                </div>
                <div class="error-box hidden"></div>
              </div>
              <div class="flex flex-col">
                <div class="input-wrapper">
                  <label for="invoice-nip" class="input-label">NIP (opcjonalnie)</label>
                  <input type="text" id="invoice-nip" class="input-field" name="invoiceNip" placeholder=""></input>
                </div>
                <div class="error-box hidden"></div>
              </div>
            </div>
            <div class="w-full flex flex-col">
              <div
                id="show-addresses-delivery-personal-data"
                class="flex w-full"
              ></div>
              <button
                type="submit"
                id="show-addresses-delivery-send-btn"
                class="text-white text-left bg-primary_dark hover:bg-primary text-base font-semibold py-2 px-5 mt-4 mb-2 text-nowrap"
              >
                ZATWIERDŹ DANE
              </button>
              <button
                type="button"
                id="invoice-change-cancel-btn"
                class="text-left bg-white dark:bg-background_dark border border-[#ccc] hover:text-gray-500 dark:hover:text-gray-200 text-base font-semibold py-2 px-5 text-nowrap"
              >
                ANULUJ
              </button>
              <div
                id="error-response-invoice-change"
                class="p-2 text-sm text-[#a50000]"
              ></div>
            </div>
          </form>
        `

    document.getElementById('app').appendChild(invoiceChangeModal)
    populateInvoiceModal()
  }

  function populateInvoiceModal() {
    if (user.Name && user.LastName) {
      document.getElementById(
        'invoice-full-name-set'
      ).innerHTML = `${user.Name} ${user.LastName}`
    }

    if (user.Telephone) {
      document.getElementById('invoice-telephone-set').innerHTML =
        user.Telephone
    }

    initializeInputFields()
  }

  function handleUpdate() {
    const invoiceName = document.getElementById('invoice-name')
    const invoiceLastName = document.getElementById('invoice-last-name')
    const invoiceStreet = document.getElementById('invoice-street')
    const invoiceCity = document.getElementById('invoice-city')
    const invoiceZipCode = document.getElementById('invoice-zip-code')
    const invoiceTelephone = document.getElementById('invoice-telephone')
    const invoiceNip = document.getElementById('invoice-nip')

    let isValid = true

    if (invoiceName.value.trim() === '') {
      showError(invoiceName, 'Wpisz imie')
      isValid = false
    } else {
      removeError(invoiceName)
    }

    if (invoiceLastName.value.trim() === '') {
      showError(invoiceLastName, 'Wpisz Nazwisko')
      isValid = false
    } else {
      removeError(invoiceLastName)
    }

    if (
      invoiceCity.value.trim() !== '' &&
      !isValidPostalCode(invoiceZipCode.value.trim())
    ) {
      showError(invoiceZipCode, 'Wpisz poprawny kod pocztowy')
      isValid = false
    } else {
      removeError(invoiceZipCode)
    }

    if (invoiceZipCode.value.trim() !== '' && invoiceCity.value.trim() === '') {
      showError(invoiceCity, 'Wpisz nazwę miasta')
      isValid = false
    } else {
      removeError(invoiceCity)
    }

    if (
      validateTelephone(invoiceTelephone.value.trim()) !== 'valid' &&
      invoiceTelephone.value.trim() !== ''
    ) {
      showError(
        invoiceTelephone,
        validateTelephone(invoiceTelephone.value.trim())
      )
      isValid = false
    } else {
      removeError(invoiceTelephone)
    }

    if (
      !isValidNIP(invoiceNip.value.trim()) &&
      invoiceNip.value.trim() !== ''
    ) {
      showError(invoiceNip, 'Wpisz poprawny nip')
      isValid = false
    } else {
      removeError(invoiceNip)
    }

    if (!isValid) return

    document.getElementById(
      'invoice-full-name-set'
    ).innerHTML = `${invoiceName.value} ${invoiceLastName.value}`

    document.getElementById('invoice-street-set').innerHTML =
      invoiceStreet.value

    if (invoiceCity.value.trim() !== '' && invoiceZipCode.value.trim() !== '') {
      document.getElementById(
        'invoice-post-set'
      ).innerHTML = `${invoiceCity.value}, ${invoiceZipCode.value}, PL`
    } else {
      document.getElementById('invoice-post-set').innerHTML = ``
    }

    if (invoiceTelephone.value.trim() !== '') {
      document.getElementById(
        'invoice-telephone-set'
      ).innerHTML = `+48 ${invoiceTelephone.value}`
    } else {
      document.getElementById('invoice-telephone-set').innerHTML = ``
    }

    if (invoiceNip.value.trim() !== '') {
      document.getElementById(
        'invoice-nip-set'
      ).innerHTML = `NIP ${invoiceNip.value}`
    } else {
      document.getElementById('invoice-nip-set').innerHTML = ``
    }

    hideModal('invoice-change-modal')
  }

  function isValidNIP(nip) {
    nip = String(nip).replace(/[\s-]/g, '')

    if (!/^\d{10}$/.test(nip)) {
      return false
    }

    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]
    let sum = 0

    for (let i = 0; i < 9; i++) {
      sum += parseInt(nip[i], 10) * weights[i]
    }

    const controlNumber = sum % 11

    return controlNumber === parseInt(nip[9], 10)
  }
}
