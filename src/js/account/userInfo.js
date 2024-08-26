import { setupAddAddressDelivery } from './addAddressDelivery'
import { setupEditPassword } from './editPassword'
import { setupEditTelephone } from './editTelephone'
import { getUserInfo } from './api/getUserInfo'
import { setupEditEmail } from './editEmail'
import { setupEditPersonalData } from './editPersonalData'
import { getUserAddresses } from './api/getUserAddresses'
export async function loadUserInfo() {
  let user = null
  try {
    user = await getUserInfo()
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }

  if (user.Id) {
    document.getElementById('welcome-text').textContent = `Cześć ${user.Name}`
    document.getElementById('user-name').textContent = user.Name
    document.getElementById('user-last-name').textContent = user.LastName

    const userDateBornElement = document.getElementById('user-date-born')
    if (user.BirthDate) {
      userDateBornElement.textContent = user.BirthDate
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

    try {
      const userAddresses = await getUserAddresses(user.Id)
      console.log(userAddresses)

      const addressesWrapperField = document.getElementById(
        'address-delivery-wrapper'
      )
    } catch (error) {}

    document
      .getElementById('edit-personal-data-btn')
      .addEventListener('click', () => {
        setupEditPersonalData(user)
      })

    document.getElementById('edit-email-btn').addEventListener('click', () => {
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
  } else {
    location.href = '/login.html'
  }
}
