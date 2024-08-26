import '../../../index.css'
import '../../../css/input.css'
import '../../../css/account.css'
import '../../../css/radioInput.css'

import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'
import { handleLogout } from '../../account/logout'
import { loadUserInfo } from '../../account/userInfo'
import { setupNavigation } from '../../account/navigation'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  loadFooter()

  handleLogout()
  await loadUserInfo()
  setupNavigation()

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})

// $(function () {
//   function setActive(elementId) {
//     $('#personal-data-btn').removeClass('font-bold')
//     $('#address-book-btn').removeClass('font-bold')
//     $('#' + elementId).addClass('font-bold')

//     if (elementId === 'personal-data-btn') {
//       $('#personal-data').removeClass('hidden')
//       $('#address-book').addClass('hidden')
//     } else if (elementId === 'address-book-btn') {
//       $('#address-book').removeClass('hidden')
//       $('#personal-data').addClass('hidden')
//     }
//   }

//   $('#personal-data-btn').on('click', function () {
//     setActive('personal-data-btn')
//   })

//   $('#address-book-btn').on('click', function () {
//     setActive('address-book-btn')
//   })

//   $('#logout-button').on('click', function (e) {
//     e.preventDefault()

//     $.ajax({
//       type: 'POST',
//       url: 'http://localhost:3000/auth/logout',
//       xhrFields: { withCredentials: true },
//     })
//       .done(function (response) {
//         console.log('Logged out succesfully', response)
//         window.location.href = '/login.html'
//       })
//       .fail(function (xhr) {
//         console.log(xhr.responseJSON.error)
//       })
//   })

//   $.ajax({
//     type: 'GET',
//     url: 'http://localhost:3000/user/info',
//     xhrFields: { withCredentials: true },
//   })
//     .done(function (response) {
//       const user = response
//       $('#welcome-text').text(`Cześć ${user.Name}`)
//       $('#user-name').text(user.Name)
//       $('#user-last-name').text(user.LastName)
//       if (user.BirthDate) {
//         $('#user-date-born').text(user.BirthDate)
//         $('#user-date-born').removeClass('hidden')
//       } else {
//         $('#user-date-born').addClass('hidden')
//       }
//       if (user.Gender) {
//         $('#user-gender').text(user.Gender)
//         $('#user-gender').removeClass('hidden')
//       } else {
//         $('#user-gender').addClass('hidden')
//       }

//       $('#user-email').text(user.Email)
//       $('#user-telephone').text(user.Telephone)
//       $('#user-address-telephone').text(user.Telephone)
//       $('#user-address-full-name').text(user.Name + ' ' + user.LastName)

//       if (user.Name && user.LastName) {
//         $('#edit-name').val(user.Name)
//         $('#edit-last-name').val(user.LastName)
//       }

//       $('#edit-name, #edit-last-name').on('change', function () {
//         const name = $('#edit-name').val().trim()
//         const lastName = $('#edit-last-name').val().trim()

//         if (isValidName(name)) {
//           removeError($('#edit-name'))
//         } else {
//           showError($('#edit-name'), 'Niewłaściwe dane')
//         }

//         if (isValidName(lastName)) {
//           removeError($('#edit-last-name'))
//         } else {
//           showError($('#edit-last-name'), 'Niewłaściwe dane')
//         }
//       })

//       if (user.Gender === 'MAN') {
//         $('#gender-man').prop('checked', true)
//       } else if (user.Gender === 'FEMALE') {
//         $('#gender-female').prop('checked', true)
//       }

//       if (user.BirthDate) {
//         const birthDate = new Date(user.BirthDate)

//         const day = birthDate.getUTCDate()
//         const month = birthDate.getUTCMonth() + 1
//         const year = birthDate.getUTCFullYear()

//         $('#edit-birth-date-day').val(day)
//         $('#edit-birth-date-month').val(month)
//         $('#edit-birth-date-year').val(year)
//       }

//       $('.clickable-label').on('click', function (e) {
//         const radioId = $(this).data('for')
//         const radioButton = document.getElementById(radioId)
//         if (radioButton) {
//           radioButton.checked = true
//         }
//       })

//       initializeInputFields(
//         document.getElementById('edit-personal-data-modal')
//       )

//       $(
//         '#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year'
//       ).on('change', function () {
//         const day = $('#edit-birth-date-day').val()
//         const month = $('#edit-birth-date-month').val()
//         const year = $('#edit-birth-date-year').val()

//         const validationMessage = isValidDate(day, month, year)

//         if (validationMessage === 'valid') {
//           $(
//             '#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year'
//           ).removeClass('input-field-wrong')
//           $('#date-error-box').addClass('hidden').text('')
//         } else {
//           $(
//             '#edit-birth-date-day, #edit-birth-date-month, #edit-birth-date-year'
//           ).addClass('input-field-wrong')
//           $('#date-error-box').removeClass('hidden').text(validationMessage)
//         }
//       })

//       $('#edit-personal-data-form').on('submit', function (e) {
//         e.preventDefault()
//         let isValid = true

//         if (!isValidName($('#edit-name').val().trim())) {
//           isValid = false
//         }

//         if (!isValidName($('#edit-last-name').val().trim())) {
//           isValid = false
//         }

//         if (
//           !isValidDate(
//             $('#edit-birth-date-day').val(),
//             $('#edit-birth-date-month').val(),
//             $('#edit-birth-date-year').val()
//           )
//         ) {
//           isValid = false
//         }

//         if (!$('input[name="gender"]:checked').length > 0) {
//           isValid = false
//           $('#gender-error-box').removeClass('hidden')
//         } else {
//           $('#gender-error-box').addClass('hidden')
//         }

//         if (isValid) {
//           const day = $('#edit-birth-date-day').val()
//           const month = $('#edit-birth-date-month').val()
//           const year = $('#edit-birth-date-year').val()

//           const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
//             2,
//             '0'
//           )}`
//           const dataToSend = {
//             name: $('#edit-name').val(),
//             lastName: $('#edit-last-name').val(),
//             birthDate: birthDate,
//             gender: $('input[name="gender"]:checked').val(),
//           }

//           $.ajax({
//             type: 'PATCH',
//             url: 'http://localhost:3000/user/editpersonaldata',
//             contentType: 'application/json',
//             data: JSON.stringify(dataToSend),
//             xhrFields: {
//               withCredentials: true,
//             },
//           })
//             .done(function (response) {
//               $('#server-response').text('')
//               location.reload()
//             })
//             .fail(function (error) {
//               $('#server-response').text(error)
//             })
//         }
//       })
//     })
//     .fail(function (xhr) {
//       console.error('Error:', xhr.responseJSON.error)
//     })

//   function showModal() {
//     $('#edit-personal-data-backdrop').removeClass('hidden')
//     $('#edit-personal-data-modal').removeClass('hidden')
//   }

//   function hideModal() {
//     $('#edit-personal-data-backdrop').addClass('hidden')
//     $('#edit-personal-data-modal').addClass('hidden')
//   }

//   $('#edit-personal-data-btn').on('click', showModal)

//   $('#edit-personal-data-cancel-btn').on('click', hideModal)

//   $('#edit-personal-data-backdrop').on('click', hideModal)
// })
