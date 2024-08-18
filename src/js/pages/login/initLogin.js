import '../../../index.css'
import '../../../css/input.css'

import $ from 'jquery'
import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'
import {
  initializeInputFields,
  showError,
  removeError,
} from '../../components/input'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  loadFooter()

  initializeInputFields(document.getElementById('login-form'))

  $(function () {
    $('#login-form').on('submit', function (e) {
      e.preventDefault()

      const email = $('#login-email').val()
      const password = $('#login-password').val()

      let isValid = true

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
            window.location.href = '/'
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
