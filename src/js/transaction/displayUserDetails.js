import { getUserAddressbyId } from '../account/api/getUserAddressbyId'
import { getUserAddresses } from '../account/api/getUserAddresses'
import { displayAddresses } from '../account/displayAddresses'
import { hideModal, showModal } from '../account/modal'
import '../../css/account.css'
import { setupAddAddressDelivery } from '../account/addAddressDelivery'

let primaryAdress = null
export const displayUserDetails = async (user) => {
  const addresses = await getUserAddresses(user.Id)
  populateDeliveryDetails(addresses, user)
}

async function populateDeliveryDetails(addresses, user) {
  await setPrimaryAddress(user)
  updateUserDetails()
  showAdressesDeliveryModal(addresses, user)
  checkActiveAddresses(addresses, user)
}

async function setPrimaryAddress(user) {
  if (user.PrimaryAddressDeliveryId) {
    primaryAdress = await getUserAddressbyId(user.PrimaryAddressDeliveryId)
  }
}

function updateUserDetails() {
  const userFullNameField = document.getElementById('user-full-name')
  const userStreet = document.getElementById('user-street')
  const userPost = document.getElementById('user-post')
  const userTelephone = document.getElementById('user-telephone')

  if (primaryAdress) {
    userFullNameField.innerText = `${primaryAdress.Name} ${primaryAdress.LastName}`
    userStreet.innerText = primaryAdress.Street
    userPost.innerText = `${primaryAdress.City}, ${primaryAdress.ZipCode}, PL`
    userTelephone.innerText = `+48 ${primaryAdress.Telephone}`

    const selectedAddressDeliveryField = document.getElementById(
      'selected-delivery-address-field'
    )
    selectedAddressDeliveryField.setAttribute('data-id', primaryAdress.Id)
  }
}

function showAdressesDeliveryModal(addresses, user) {
  const showAddressesBtn = document.getElementById(
    'show-addresses-delivery-btn'
  )

  showAddressesBtn.addEventListener('click', () => {
    showModal('show-addresses-delivery-modal')
    if (!document.getElementById('edit-address-delivery-modal')) {
      displayAddresses(addresses, user.PrimaryAddressDeliveryId)
      setupAddressBoxEvents(addresses, user)
    }
  })

  setupModalButtons(user)
}

function setupAddressBoxEvents(addresses, user) {
  const wrapper = document.getElementById('address-delivery-wrapper')

  wrapper.classList.remove('flex-row', 'sm:flex-row')
  wrapper.classList.add('flex-col')

  const addressboxes = document.querySelectorAll('.address-box')
  addressboxes.forEach((element) => {
    element.style.width = '100%'

    if (element.id !== 'add-address-delivery-btn') {
      element.addEventListener('click', () => {
        handleAddressBoxClick(element, addressboxes)
        checkActiveAddresses(addresses, user)
      })
    }
  })
}

function setupModalButtons(user) {
  document
    .getElementById('add-address-delivery-btn')
    .addEventListener('click', () => {
      setupAddAddressDelivery(user)
    })

  document
    .getElementById('show-addresses-delivery-cancel-btn')
    .addEventListener('click', () => {
      hideModal('show-addresses-delivery-modal')
    })

  document
    .getElementById('show-addresses-delivery-form')
    .addEventListener('submit', (e) => {
      e.preventDefault()
      handleAddressFormSubmit()
    })
}

function handleAddressBoxClick(clickedElement, addressboxes) {
  addressboxes.forEach((el) => {
    el.classList.remove('active')
  })

  clickedElement.classList.add('active')
}

function handleAddressFormSubmit() {
  const activeAddressBox = document.querySelector('.address-box.active')

  if (activeAddressBox) {
    // console.log(document.querySelector('.address-box.active').dataset.id)
    updateUserDetailsFromActiveBox(activeAddressBox)
    hideModal('show-addresses-delivery-modal')
  } else {
    displayAddressSelectionError()
  }
}

function updateUserDetailsFromActiveBox(activeAddressBox) {
  const selectedAddressDeliveryField = document.getElementById(
    'selected-delivery-address-field'
  )
  const userFullNameField = document.getElementById('user-full-name')
  const userStreet = document.getElementById('user-street')
  const userPost = document.getElementById('user-post')
  const userTelephone = document.getElementById('user-telephone')

  userFullNameField.innerText = activeAddressBox.querySelector(
    '#user-address-full-name'
  ).innerHTML
  userStreet.innerText = activeAddressBox.querySelector(
    '#user-address-street'
  ).innerHTML
  userPost.innerText =
    activeAddressBox.querySelector('#user-address-post').innerHTML
  userTelephone.innerText = activeAddressBox.querySelector(
    '#user-address-telephone'
  ).innerHTML

  const selectedAddressDeliveryId = document.querySelector(
    '.address-box.active'
  ).dataset.id

  selectedAddressDeliveryField.setAttribute(
    'data-id',
    selectedAddressDeliveryId
  )
}

function displayAddressSelectionError() {
  document.getElementById('error-response-show-addresses-delivery').innerHTML =
    'Nie wybrano adresu dostawy'
}

function checkActiveAddresses(adresses, user) {
  const showAddressesBtn = document.getElementById(
    'show-addresses-delivery-btn'
  )

  if (
    !user.PrimaryAddressDeliveryId &&
    !document.querySelectorAll('.address-box.active').length > 0
  ) {
    if (adresses.length === 0) {
      showAddressesBtn.innerHTML = 'DODAJ ADRES'
    } else {
      showAddressesBtn.innerHTML = 'WYBIERZ ADRES'
    }
  } else {
    showAddressesBtn.innerHTML = 'ZMIEŃ ADRES'
  }
}
