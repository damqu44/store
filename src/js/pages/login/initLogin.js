import '../../../index.css'
import '../../../css/authForm.css'

import $ from 'jquery'
import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

document.addEventListener('DOMContentLoaded', async () => {
  loadHeader()
  loadFooter()

  const inputFields = document.querySelectorAll('.input-field')

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

  $(function () {
    $('#login-form').on('submit', function (e) {
      e.preventDefault()

      const email = $('#login-email').val()
      const password = $('#login-password').val()

      let isValid = true

      function showError(inputField, message) {
        inputField.addClass('input-field-wrong')
        const errorBox = inputField.closest('.input-wrapper').next('.error-box')
        errorBox.removeClass('hidden').text(message)
      }

      function removeError(inputField) {
        inputField.removeClass('input-field-wrong')
        const errorBox = inputField.closest('.input-wrapper').next('.error-box')
        errorBox.addClass('hidden')
      }

      if (email.trim() === '') {
        showError($('#login-email'), 'Wpisz adres e-mail')
        isValid = false
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
          showError($('#login-email'), 'Niepoprawny adres e-mail')
          isValid = false
        } else {
          removeError($('#login-email'))
        }
      }

      if (password.trim() === '') {
        showError($('#login-password'), 'Wpisz hasło')
        isValid = false
      } else {
        removeError($('#login-password'))
      }

      if (isValid) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/auth/login',
          contentType: 'application/json',
          data: JSON.stringify({
            email,
            password,
          }),
          xhrFields: {
            withCredentials: true,
          },
        })
          .done(function (response) {
            $('#server-response').text('')
            // window.location.href = '/'
          })
          .fail(function (xhr) {
            $('#server-response').text(xhr.responseJSON.error)
          })
      }
    })
  })

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
