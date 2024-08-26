import '../../css/input.css'

export function initializeInputFields(containerSelector = document) {
  const inputFields = containerSelector.querySelectorAll('.input-field')
  inputFields.forEach((inputField) => {
    const inputLabel = inputField.previousElementSibling

    inputField.addEventListener('focus', function () {
      inputLabel.classList.add('active')
    })

    inputField.addEventListener('blur', function () {
      if (inputField.value.trim() === '') {
        inputLabel.classList.remove('active')
      }
    })

    if (inputField.value !== '') {
      inputLabel.classList.add('active')
    }
  })
}

export function showError(inputField, message) {
  inputField.classList.add('input-field-wrong')
  const errorBox = inputField.closest('.input-wrapper').nextElementSibling

  if (errorBox && errorBox.classList.contains('error-box')) {
    errorBox.classList.remove('hidden')
    errorBox.textContent = message
  }
}

export function removeError(inputField) {
  inputField.classList.remove('input-field-wrong')
  const errorBox = inputField.closest('.input-wrapper').nextElementSibling

  if (errorBox && errorBox.classList.contains('error-box')) {
    errorBox.classList.add('hidden')
    errorBox.textContent = ''
  }
}
