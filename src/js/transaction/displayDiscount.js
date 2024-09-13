import { hideModal, showModal } from '../account/modal'
import {
  initializeInputFields,
  removeError,
  showError,
} from '../components/input'
export function displayDiscount() {
  createDiscountModal()

  const discountAddBtn = document.getElementById('transaction-discount-add-btn')
  discountAddBtn.addEventListener('click', () => {
    const transds = document.getElementById('transaction-discount').innerHTML
    if (transds) {
      document.getElementById('transaction-discount-field').value = transds
      initializeInputFields()
    }

    showModal('transaction-discount-modal')
  })

  document
    .getElementById('transaction-discount-cancel-btn')
    .addEventListener('click', () => {
      hideModal('transaction-discount-modal')
    })

  document
    .getElementById('transaction-discount-form')
    .addEventListener('submit', (e) => {
      e.preventDefault()
      handleAddDiscount()
    })

  function createDiscountModal() {
    const discountModal = document.createElement('div')
    discountModal.id = 'transaction-discount-modal'
    discountModal.classList.add('modal', 'hidden')

    discountModal.innerHTML = `
          <form id="transaction-discount-form" class="flex flex-col">
              <div class="font-bold text-2xl mb-4">Dodaj kupon do Twojego konta</div>
              <div
                id="transaction-discount-wrapper"
                class="w-full p-5 flex flex-col">
                  <div class="input-wrapper flex-1 mr-3">
                      <label for="transaction-discount-field" class="input-label">Wpisz kod</label>
                      <input type="text" id="transaction-discount-field" class="input-field" name="transactionDiscountField" placeholder=""></input>
                  </div>
                  <div class="error-box hidden"></div>
              </div>
              <button
                type="submit"
                id="transaction-discount-send-btn"
                class="text-white text-left bg-primary_dark hover:bg-primary text-base font-semibold py-2 px-5 mb-2 text-nowrap"
              >
              ZATWIERDŹ
              </button>
              <button
                type="button"
                id="transaction-discount-cancel-btn"
                class="text-left bg-white dark:bg-background_dark border border-[#ccc] hover:text-gray-500 dark:hover:text-gray-200 text-base font-semibold py-2 px-5 text-nowrap"
              >
                ANULUJ
              </button>
              <div
                id="error-response-discount"
                class="p-2 text-sm text-[#a50000]"
              ></div>
          </form>
          `
    document.getElementById('app').appendChild(discountModal)
    initializeInputFields()
  }

  function handleAddDiscount() {
    const discountField = document.getElementById('transaction-discount-field')

    if (discountField.value.trim().length > 20) {
      showError(discountField, 'Kod zniżkowy nie może przekroczyć 20 znaków')
      return
    } else {
      removeError(discountField)
    }

    if (discountField.value.trim() === '') {
      showError(discountField, 'Wpisz kod zniżkowy')
      return
    } else {
      removeError(discountField)
    }

    const transactionDiscount = document.getElementById('transaction-discount')
    transactionDiscount.innerHTML = discountField.value

    hideModal('transaction-discount-modal')

    if (transactionDiscount.innerHTML.trim() !== '') {
      document.getElementById('transaction-discount-add-btn').innerHTML =
        'EDYTUJ'
    } else {
      document.getElementById('transaction-discount-add-btn').innerHTML =
        'DODAJ'
    }
  }
}
