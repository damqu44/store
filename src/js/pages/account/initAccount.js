import '../../../index.css'
import '../../../css/input.css'
import '../../../css/account.css'
import '../../../css/radioInput.css'

import $ from 'jquery'
import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'
import {
  initializeInputFields,
  showError,
  removeError,
} from '../../components/input'
import isValidDate from '../../utils/isValidDate'
import isValidName from '../../utils/isValidName'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  loadFooter()

  $(function () {
    function setActive(elementId) {
      $('#personal-data-btn').removeClass('font-bold')
      $('#address-book-btn').removeClass('font-bold')
      $('#' + elementId).addClass('font-bold')

      if (elementId === 'personal-data-btn') {
        $('#personal-data').removeClass('hidden')
        $('#address-book').addClass('hidden')
      } else if (elementId === 'address-book-btn') {
        $('#address-book').removeClass('hidden')
        $('#personal-data').addClass('hidden')
      }
    }

    $('#personal-data-btn').on('click', function () {
      setActive('personal-data-btn')
    })

    $('#address-book-btn').on('click', function () {
      setActive('address-book-btn')
    })

    $('#logout-button').on('click', function (e) {
      e.preventDefault()

      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/auth/logout',
        xhrFields: { withCredentials: true },
      })
        .done(function (response) {
          console.log('Logged out succesfully', response)
          window.location.href = '/login.html'
        })
        .fail(function (xhr) {
          console.log(xhr.responseJSON.error)
        })
    })

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/user/info',
      xhrFields: { withCredentials: true },
    })
      .done(function (response) {
        const user = response
        $('#welcome-text').text(`Cześć ${user.Name}`)
        $('#user-name').text(user.Name)
        $('#user-last-name').text(user.LastName)
        $('#user-email').text(user.Email)
        $('#user-telephone').text(user.Telephone)
        $('#user-address-telephone').text(user.Telephone)
        $('#user-address-full-name').text(user.Name + ' ' + user.LastName)

        if (user.Name && user.LastName) {
          $('#edit-name').val(user.Name)
          $('#edit-last-name').val(user.LastName)
        }

        $('#edit-name, #edit-last-name').on('change', function () {
          const name = $('#edit-name').val().trim()
          const lastName = $('#edit-last-name').val().trim()

          if (!isValidName(name)) {
            showError($('#edit-name'), 'Niewłaściwe dane')
          } else {
            removeError($('#edit-name'))
          }

          if (!isValidName(lastName)) {
            showError($('#edit-last-name'), 'Niewłaściwe dane')
          } else {
            removeError($('#edit-last-name'))
          }
        })

        if (user.Gender === 'MAN') {
          $('#gender-man').prop('checked', true)
        } else if (user.Gender === 'FEMALE') {
          $('#gender-female').prop('checked', true)
        }

        if (user.BirthDate) {
          const birthDate = new Date(user.BirthDate)

          const day = birthDate.getUTCDate()
          const month = birthDate.getUTCMonth() + 1
          const year = birthDate.getUTCFullYear()

          $('#edit-birth-date-day').val(day)
          $('#edit-birth-date-month').val(month)
          $('#edit-birth-date-year').val(year)
        }

        $('.clickable-label').on('click', function (e) {
          const radioId = $(this).data('for')
          const radioButton = document.getElementById(radioId)
          if (radioButton) {
            radioButton.checked = true
          }
        })

        initializeInputFields(
          document.getElementById('edit-personal-data-modal')
        )

        $(
          '#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year'
        ).on('change', function () {
          const day = $('#edit-birth-date-day').val()
          const month = $('#edit-birth-date-month').val()
          const year = $('#edit-birth-date-year').val()

          const validationMessage = isValidDate(day, month, year)

          let isValid = true
          if (validationMessage === 'valid') {
            $(
              '#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year'
            ).removeClass('input-field-wrong')
            $('#date-error-box').addClass('hidden').text('')
          } else {
            $(
              '#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year'
            ).addClass('input-field-wrong')
            $('#date-error-box').removeClass('hidden').text(validationMessage)
            isValid = false
          }
        })

        $('#edit-personal-data-form').on('submit', function (e) {
          e.preventDefault()
          console.log('WYSYLANIE')
        })
      })
      .fail(function (xhr) {
        console.error('Error:', xhr.responseJSON.error)
      })

    function showModal() {
      $('#edit-personal-data-backdrop').removeClass('hidden')
      $('#edit-personal-data-modal').removeClass('hidden')
    }

    function hideModal() {
      $('#edit-personal-data-backdrop').addClass('hidden')
      $('#edit-personal-data-modal').addClass('hidden')
    }

    $('#edit-personal-data-btn').on('click', showModal)

    $('#edit-personal-data-cancel-btn').on('click', hideModal)

    $('#edit-personal-data-backdrop').on('click', hideModal)
  })

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
