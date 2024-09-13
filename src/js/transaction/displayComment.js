import { hideModal, showModal } from '../account/modal'
import {
  initializeInputFields,
  removeError,
  showError,
} from '../components/input'

export function displayComment() {
  createCommentModal()

  const commentAddBtn = document.getElementById('transaction-comment-add-btn')
  commentAddBtn.addEventListener('click', () => {
    console.log('click')
    showModal('transaction-comment-modal')
  })

  document
    .getElementById('transaction-comment-cancel-btn')
    .addEventListener('click', () => {
      hideModal('transaction-comment-modal')
    })

  document
    .getElementById('transaction-comment-form')
    .addEventListener('submit', (e) => {
      e.preventDefault()
      handleAddComment()
    })

  function createCommentModal() {
    const commentModal = document.createElement('div')
    commentModal.id = 'transaction-comment-modal'
    commentModal.classList.add('modal', 'hidden')

    commentModal.innerHTML = `
        <form id="transaction-comment-form" class="flex flex-col">
            <div class="font-bold text-2xl mb-4">Uwagi do zakupu</div>
            <div class="text-xs">Dodanie uwag może wydłużyć czas wysyłki zamówienia. Skorzystaj z tej opcji, gdy dodajesz kluczowe informacje dotyczące zakupu.</div>
            <div
              id="transaction-comment-wrapper"
              class="w-full p-5 flex flex-col">
                <div class="input-wrapper flex-1 mr-3">
                    <label for="transaction-comment-field" class="input-label">uwagi do zakupu</label>
                    <textarea type="text" id="transaction-comment-field" class="input-field" name="transactionCommentField" placeholder=""></textarea>
                </div>
                <div class="error-box hidden"></div>
            </div>
            <button
              type="submit"
              id="transaction-comment-send-btn"
              class="text-white text-left bg-primary_dark hover:bg-primary text-base font-semibold py-2 px-5 mb-2 text-nowrap"
            >
            DODAJ KOMENTARZ
            </button>
            <button
              type="button"
              id="transaction-comment-cancel-btn"
              class="text-left bg-white dark:bg-background_dark border border-[#ccc] hover:text-gray-500 dark:hover:text-gray-200 text-base font-semibold py-2 px-5 text-nowrap"
            >
              ANULUJ
            </button>
            <div
              id="error-response-comment"
              class="p-2 text-sm text-[#a50000]"
            ></div>
        </form>
        `
    document.getElementById('app').appendChild(commentModal)
    initializeInputFields()
  }

  function handleAddComment() {
    const commentField = document.getElementById('transaction-comment-field')

    if (commentField.value.trim().length > 500) {
      showError(commentField, 'Komentarz nie może przekroczyć 500 znaków')
      return
    } else {
      removeError(commentField)
    }

    if (commentField.value.trim() === '') {
      showError(commentField, 'Wpisz komentarz')
      return
    } else {
      removeError(commentField)
    }

    const transactionComment = document.getElementById('transaction-comment')
    transactionComment.innerHTML = commentField.value

    hideModal('transaction-comment-modal')

    if (transactionComment.innerHTML.trim() !== '') {
      document.getElementById('transaction-comment-add-btn').innerHTML =
        'EDYTUJ'
    } else {
      document.getElementById('transaction-comment-add-btn').innerHTML = 'DODAJ'
    }
  }
}
