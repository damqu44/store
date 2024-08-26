export function showModal(modalId) {
  const backdrop = document.getElementById('modal-backdrop')
  const modal = document.getElementById(modalId)

  backdrop.classList.remove('hidden')
  modal.classList.remove('hidden')

  backdrop.addEventListener('click', () => hideModal(modalId))
}

export function hideModal(modalId) {
  const backdrop = document.getElementById('modal-backdrop')
  const modal = document.getElementById(modalId)

  backdrop.classList.add('hidden')
  modal.classList.add('hidden')

  backdrop.addEventListener('click', () => hideModal(modalId))
}
