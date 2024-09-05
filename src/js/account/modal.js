import '../../css/modal.css'
export function showModal(modalId) {
  const backdrop = document.getElementById('modal-backdrop')
  const modal = document.getElementById(modalId)

  const openModal = document.querySelector('.modal:not(.hidden)')
  console.log(openModal, modal)
  if (openModal) {
    hideModal(openModal.id)
  }

  backdrop.classList.remove('hidden')
  modal.classList.remove('hidden')

  if (!backdrop.hasAttribute('data-listener-added')) {
    backdrop.addEventListener('click', () => hideModal(modalId))
    backdrop.setAttribute('data-listener-added', 'true')
  }
}

export function hideModal(modalId) {
  const backdrop = document.getElementById('modal-backdrop')
  const modal = document.getElementById(modalId)

  modal.classList.add('hidden')

  const anyModalVisible = Array.from(document.querySelectorAll('.modal')).some(
    (m) => !m.classList.contains('hidden')
  )

  if (!anyModalVisible) {
    backdrop.classList.add('hidden')
    backdrop.removeAttribute('data-listener-added')
  }
}
