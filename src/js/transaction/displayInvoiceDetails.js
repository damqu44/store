import { showModal } from '../account/modal'

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

  //przyicsk kupuje sprawdza dane po czym zwraca blad lub przesyla
  //zamowienie do backendu a userowi status 200 - do oplacenia

  // invoice modal - wyswietlamy form z danymi(uzupelnione domyslnymi danymi usera pobranymi z bazy)
  // po zmianie klikamy zatwierdz i dane zmieniaja sie na stronie transakcji - tylko tutaj
  // po potwierdzeniu zamowienia dane te zostana pobrane do obiektu invoice i dolaczone do zmaowienia
  // pamietamy o opcjonalnym polu NIP I WALDIACJI NA SERWERZE

  const invoiceChangeBtn = document.getElementById('invoice-change-btn')
  createInvoiceChangeModal()
  invoiceChangeBtn.addEventListener('click', () => {
    showModal('invoice-change-modal')
  })
}

function createInvoiceChangeModal() {
  const invoiceChangeModal = document.createElement('div')
  invoiceChangeModal.id = 'invoice-change-modal'
  invoiceChangeModal.classList.add('modal', 'hidden')

  invoiceChangeModal.innerHTML = ` 
        <form id="invoice-change-form" class="flex flex-col">
          <div class="font-bold text-2xl mb-4">Dane do faktury</div>
          <div
            id="address-delivery-wrapper"
            class="w-full p-5 flex flex-col sm:flex-row sm:flex-wrap gap-2"
          >
            <div id="add-address-delivery-btn" class="address-box">
              Nowy adres
              <div class="absolute left-4 bottom-3 text-xl">
                <i class="fa-solid fa-plus"></i>
              </div>
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
}
