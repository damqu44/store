export function initializeInputFields(containerSelector = document) {
  const inputFields = containerSelector.querySelectorAll('.input-field')

  inputFields.forEach((inputField) => {
    const inputLabel = inputField.previousElementSibling

    inputField.addEventListener('focus', function () {
      if (inputField.value.trim() === '') {
        inputLabel.classList.add('active')
      }
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
  inputField.addClass('input-field-wrong')
  const errorBox = inputField.closest('.input-wrapper').next('.error-box')
  errorBox.removeClass('hidden').text(message)
}

export function removeError(inputField) {
  inputField.removeClass('input-field-wrong')
  const errorBox = inputField.closest('.input-wrapper').next('.error-box')
  errorBox.addClass('hidden')
}
