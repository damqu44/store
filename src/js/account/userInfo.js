// import { setupAddAddressDelivery } from './addAddressDelivery'
// import { setupEditPassword } from './editPassword'
// import { setupEditTelephone } from './editTelephone'
// import { getUserInfo } from './api/getUserInfo'
// import { setupEditEmail } from './editEmail'
// import { setupEditPersonalData } from './editPersonalData'
// import { getUserAddresses } from './api/getUserAddresses'
// import { hideModal, showModal } from './modal'
// import {
//   initializeInputFields,
//   removeError,
//   showError,
// } from '../components/input'
// import isValidName from '../validation/isValidName'
// import validateTelephone from '../validation/isValidTelephone'

//     try {
//       const userAddresses = await getUserAddresses(user.Id)
//       console.log(userAddresses)

//

//       userAddresses.map((address) => {
//         const newAddressBox = document.createElement('div')
//         newAddressBox.classList.add('address-box')
//         newAddressBox.setAttribute('data-id', address.Id)

//         newAddressBox.innerHTML = `
//               <div id="user-address-full-name" class="font-bold pb-2">${address.Name} ${address.LastName}</div>
//               <div id="user-address-street">${address.Street}</div>
//               <div id="user-address-post">${address.City}, ${address.ZipCode}, PL</div>
//               <div class="flex mt-2">
//                 <div
//                   class="user-address-edit-btn w-min mb-3 mr-3 text-sm font-bold underline tracking-wide cursor-pointer text-primary hover:text-white hover:bg-primary hover:no-underline transition-all"
//                 >
//                   Edytuj
//                 </div>
//                 <div
//                   class="user-address-delete-btn w-min mb-3 mr-3 text-sm font-bold underline tracking-wide cursor-pointer text-primary hover:text-white hover:bg-primary hover:no-underline transition-all"
//                 >
//                   Usuń
//                 </div>
//               </div>
//               <div
//                     id="server-response-delete-address"
//                     class="p-2 text-sm text-[#a50000]">
//               </div>
//             `

//         addressesWrapperField.appendChild(newAddressBox)
//         newAddressBox
//           .querySelector('.user-address-delete-btn')
//           .addEventListener('click', async () => {
//             fetch('http://localhost:3000/user/deleteaddressdelivery', {
//               method: 'DELETE',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               credentials: 'include',
//               body: JSON.stringify({ addressDeliveryId: address.Id }),
//             })
//               .then(async (response) => {
//                 if (!response.ok) {
//                   const error = await response.json()
//                   throw new Error(error.message)
//                 }
//                 return response.json()
//               })
//               .then(() => {
//                 document.getElementById(
//                   'server-response-delete-address'
//                 ).textContent = ''
//                 location.reload()
//               })
//               .catch((error) => {
//                 document.getElementById(
//                   'server-response-delete-address'
//                 ).textContent = error
//               })
//           })

//         newAddressBox
//           .querySelector('.user-address-edit-btn')
//           .addEventListener('click', () => {
//             showModal('edit-address-delivery-modal')

//             currentAddress = address

//             if (address.Name) {
//               document.getElementById('edit-address-delivery-name').value =
//                 address.Name
//             }

//             if (address.LastName) {
//               document.getElementById('edit-address-delivery-last-name').value =
//                 address.LastName
//             }

//             if (address.Street) {
//               document.getElementById('edit-address-delivery-street').value =
//                 address.Street
//             }

//             if (address.ZipCode) {
//               document.getElementById('edit-address-delivery-zip-code').value =
//                 address.ZipCode
//             }

//             if (address.City) {
//               document.getElementById('edit-address-delivery-city').value =
//                 address.City
//             }

//             if (address.Telephone) {
//               document.getElementById('edit-address-delivery-telephone').value =
//                 address.Telephone
//             }

//             initializeInputFields()

//             document
//               .getElementById('edit-address-delivery-form')
//               .addEventListener('submit', handleSubmit)
//           })

//         document
//           .getElementById('edit-address-delivery-cancel-btn')
//           .addEventListener('click', () =>
//             hideModal('edit-address-delivery-modal')
//           )
//       })
//     } catch (error) {}

//     document
//       .getElementById('edit-personal-data-btn')
//       .addEventListener('click', () => {
//         setupEditPersonalData(user)
//       })

//     document.getElementById('edit-email-btn').addEventListener('click', () => {
//       setupEditEmail(user)
//     })

//     document
//       .getElementById('edit-password-btn')
//       .addEventListener('click', () => {
//         setupEditPassword(user)
//       })

//     document
//       .getElementById('edit-telephone-btn')
//       .addEventListener('click', () => {
//         setupEditTelephone(user)
//       })

//     document
//       .getElementById('add-address-delivery-btn')
//       .addEventListener('click', () => {
//         setupAddAddressDelivery(user)
//       })
//   } else {
//     location.href = '/login.html'
//   }
// }

// function handleSubmit(e) {
//   e.preventDefault()

//   if (!currentAddress) {
//     document.getElementById(
//       'server-response-edit-address-delivery'
//     ).textContent = 'No address selected'
//     return
//   }

//   const editNameField = document.getElementById('edit-address-delivery-name')
//   const editLastNameField = document.getElementById(
//     'edit-address-delivery-last-name'
//   )
//   const editStreetField = document.getElementById(
//     'edit-address-delivery-street'
//   )
//   const editCommentField = document.getElementById(
//     'edit-address-delivery-comment'
//   )
//   const editZipCodeField = document.getElementById(
//     'edit-address-delivery-zip-code'
//   )
//   const editCityField = document.getElementById('edit-address-delivery-city')
//   const editTelephoneField = document.getElementById(
//     'edit-address-delivery-telephone'
//   )

//   let isValid = true

//   if (editNameField.value.trim() === '') {
//     showError(editNameField, 'Wpisz swoje imię')
//     isValid = false
//   } else if (!isValidName(editNameField.value)) {
//     showError(editNameField, 'Wpisz prawidłowe imię')
//     isValid = false
//   } else removeError(editNameField)

//   if (editLastNameField.value.trim() === '') {
//     showError(editLastNameField, 'Wpisz swoje nazwisko')
//     isValid = false
//   } else if (!isValidName(editLastNameField.value)) {
//     showError(editLastNameField, 'Wpisz prawidłowe nazwisko')
//     isValid = false
//   } else removeError(editLastNameField)

//   if (editStreetField.value.trim() === '') {
//     showError(editStreetField, 'Wpisz adres dostawy')
//     isValid = false
//   } else if (editStreetField.value.length > 100) {
//     showError('Adres nie może przekroczyć 100 znaków')
//     isValid = false
//   } else removeError(editStreetField)

//   const zipCodePattern = /^\d{2}-\d{3}$/
//   if (!zipCodePattern.test(editZipCodeField.value)) {
//     showError(editZipCodeField, 'Kod pocztowy musi mieć format XX-XXX')
//     isValid = false
//   } else removeError(editZipCodeField)

//   if (editCityField.value.trim() === '') {
//     showError(editCityField, 'Wpisz miasto')
//     isValid = false
//   } else if (editCityField.value.length > 30) {
//     showError(editCityField, 'Nazwa miasta nie może przekroczyć 30 znaków')
//     isValid = false
//   } else removeError(editCityField)

//   const isTelephoneValid = validateTelephone(editTelephoneField.value)
//   if (isTelephoneValid != 'valid') {
//     showError(editTelephoneField, isTelephoneValid)
//     isValid = false
//   } else removeError(editTelephoneField)

//   if (!isValid) return

//   fetch('http://localhost:3000/user/editaddressdelivery', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//     body: JSON.stringify({
//       addressId: currentAddress.Id,
//       name: document.getElementById('edit-address-delivery-name').value,
//       lastName: document.getElementById('edit-address-delivery-last-name')
//         .value,
//       street: document.getElementById('edit-address-delivery-street').value,
//       city: document.getElementById('edit-address-delivery-city').value,
//       zipCode: document.getElementById('edit-address-delivery-zip-code').value,
//       telephone: document.getElementById('edit-address-delivery-telephone')
//         .value,
//     }),
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message)
//       }
//       return response.json()
//     })
//     .then(() => {
//       document.getElementById(
//         'server-response-edit-address-delivery'
//       ).textContent = ''
//       location.reload()
//     })
//     .catch((error) => {
//       document.getElementById(
//         'server-response-edit-address-delivery'
//       ).textContent = error
//     })
// }

import { setupEditPersonalData } from './editPersonalData'
import { setupEditEmail } from './editEmail'
import { setupEditPassword } from './editPassword'
import { setupEditTelephone } from './editTelephone'
import { setupAddAddressDelivery } from './addAddressDelivery'
import { getUserInfo } from './api/getUserInfo'
import { displayAddresses } from './displayAddresses'
import { getUserAddresses } from './api/getUserAddresses'

export async function loadUserInfo() {
  try {
    let user = null
    user = await getUserInfo()

    if (user.Id) {
      document.getElementById('welcome-text').textContent = `Cześć ${user.Name}`
      document.getElementById('user-name').textContent = user.Name
      document.getElementById('user-last-name').textContent = user.LastName

      const userDateBornElement = document.getElementById('user-date-born')

      const formattedBirthDate = new Date(user.BirthDate)
        .toISOString()
        .split('T')[0]

      if (user.BirthDate) {
        userDateBornElement.textContent = formattedBirthDate
        userDateBornElement.classList.remove('hidden')
      } else {
        userDateBornElement.classList.add('hidden')
      }

      const userGenderElement = document.getElementById('user-gender')
      if (user.Gender === 'FEMALE') {
        userGenderElement.textContent = 'Kobieta'
        userGenderElement.classList.remove('hidden')
      } else if (user.Gender === 'MAN') {
        userGenderElement.textContent = 'Mężczyzna'
        userGenderElement.classList.remove('hidden')
      } else {
        userGenderElement.classList.add('hidden')
      }

      document.getElementById('user-email').textContent = user.Email
      document.getElementById('user-telephone').textContent = user.Telephone

      const userAddresses = await getUserAddresses(
        user.PrimaryAddressDeliveryId
      )
      displayAddresses(userAddresses, user.PrimaryAddressDeliveryId)

      document
        .getElementById('edit-personal-data-btn')
        .addEventListener('click', () => {
          setupEditPersonalData(user)
        })

      document
        .getElementById('edit-email-btn')
        .addEventListener('click', () => {
          setupEditEmail(user)
        })

      document
        .getElementById('edit-password-btn')
        .addEventListener('click', () => {
          setupEditPassword(user)
        })

      document
        .getElementById('edit-telephone-btn')
        .addEventListener('click', () => {
          setupEditTelephone(user)
        })

      document
        .getElementById('add-address-delivery-btn')
        .addEventListener('click', () => {
          setupAddAddressDelivery(user)
        })
    }
  } catch (error) {
    console.error('Failed to load user info:', error)
    // location.href = '/error.html'
  }
}
