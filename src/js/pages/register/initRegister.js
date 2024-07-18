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
    $('#register-form').on('submit', function (e) {
      e.preventDefault()

      const email = $('#register-email').val()
      const password = $('#register-password').val()
      const confirmPassword = $('#register-confirm-password').val()
      const telephoneNumber = $('#register-telephone-number').val()
      const userName = $('#register-name').val()
      const userLastName = $('#register-last-name').val()

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
        showError($('#register-email'), 'Wpisz adres e-mail')
        isValid = false
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
          showError($('#register-email'), 'Niepoprawny adres e-mail')
          isValid = false
        } else {
          removeError($('#register-email'))
        }
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!passwordPattern.test(password)) {
        showError(
          $('#register-password'),
          'Min. 8 znaków • wielka litera • mała litera • cyfra'
        )
        isValid = false
      } else {
        removeError($('#register-password'))
      }

      if (password !== confirmPassword) {
        showError($('#register-confirm-password'), 'Hasła muszą być identyczne')
        isValid = false
      } else {
        removeError($('#register-confirm-password'))
      }

      const phonePattern = /^\d{9}$/
      if (!phonePattern.test(telephoneNumber)) {
        showError(
          $('#register-telephone-number'),
          'Numer telefonu musi zawierać 9 liczb'
        )
        isValid = false
      } else {
        removeError($('#register-telephone-number'))
      }

      if (userName.length < 1) {
        showError($('#register-name'), 'Wpisz imię')
        isValid = false
      } else {
        removeError($('#register-name'))
      }

      if (userLastName.length < 1) {
        showError($('#register-last-name'), 'Wpisz nazwisko')
        isValid = false
      } else {
        removeError($('#register-last-name'))
      }
      const telephone = parseInt(telephoneNumber)
      if (isValid) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/auth/register',
          contentType: 'application/json',
          data: JSON.stringify({
            email,
            password,
            telephone,
            userName,
            userLastName,
          }),
        })
          .done(function (response) {
            $('#server-response').text('')

            const overlay = $('<div class="alert-overlay"></div>')
            const successAlert = $(
              '<div class="alert">Rejestracja powiodła się! Kliknij OK, aby przejść na stronę główną.<br>Zostaniesz przekierowany za 5 sekund.</div>'
            )
            const okButton = $('<button class="ok-button">OK</button>')
            successAlert.append(okButton)
            overlay.append(successAlert)
            $('body').append(overlay)

            okButton.on('click', function () {
              window.location.href = '/'
            })

            setTimeout(function () {
              window.location.href = '/'
            }, 5000)
          })
          .fail(function (xhr) {
            $('#server-response')
              .addClass('text-[#a50000]')
              .text(xhr.responseJSON.error)
          })
      }
    })
  })

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
