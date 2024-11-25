import { hideModal, showModal } from "./modal"
import { initializeInputFields } from "../components/input"
import { setupEditAddress } from "./editAddress"
import { updatePrimaryAddress } from "./api/updatePrimaryAddress"
import { BASE_URL } from "../../../backend-config"

export function displayAddresses(userAddresses, PrimaryAddressDeliveryId) {
  let PrimaryAddressId = PrimaryAddressDeliveryId
  const addressDeliveryLimit = document.getElementById("address-delivery-limit")

  if (Array.isArray(userAddresses) && userAddresses.length === 1) {
    updatePrimaryAddress(userAddresses[0])
    PrimaryAddressId = userAddresses[0].Id
  }

  if (userAddresses.length >= 5) {
    addressDeliveryLimit.innerHTML = `
                Posiadasz maksymalną dopuszczalną ilość adresów <span class="font-bold">${userAddresses.length}/5</span>
               `
    document.getElementById("add-address-delivery-btn").classList.add("hidden")
  } else if (userAddresses.length < 5) {
    addressDeliveryLimit.innerHTML = `
               Masz możliwość dodania <span class="font-bold">${
                 5 - userAddresses.length
               }/5 adresów.</span>
              `
  }

  const addressesWrapperField = document.getElementById(
    "address-delivery-wrapper"
  )

  const app = document.getElementById("app")

  const editAddressDeliveryModal = document.createElement("div")
  editAddressDeliveryModal.id = "edit-address-delivery-modal"
  editAddressDeliveryModal.classList.add("modal", "hidden")

  editAddressDeliveryModal.innerHTML = `
                          <form id="edit-address-delivery-form" class="flex flex-col">
                            <div class="font-bold text-2xl mb-4">EDYTUJ ADRES</div>
                            <div id="edit-address-delivery-personal-data" class="flex w-full">
                              <div class="flex flex-col flex-1">
                                <div class="input-wrapper flex-1 mr-3">
                                  <label for="edit-address-delivery-name" class="input-label">Imię</label>
                                  <input
                                    class="input-field"
                                    type="text"
                                    id="edit-address-delivery-name"
                                    name="editAddressDeliveryName"
                                    placeholder=""
                                  />
                                </div>
                                <div class="error-box hidden"></div>
                              </div>
                              <div class="flex flex-col flex-1">
                                <div class="input-wrapper flex-1">
                                  <label for="edit-address-delivery-last-name" class="input-label">Nazwisko</label>
                                  <input
                                    class="input-field"
                                    type="text"
                                    id="edit-address-delivery-last-name"
                                    name="editAddressDeliveryLastName"
                                    placeholder=""
                                  />
                                </div>
                                <div class="error-box hidden"></div>
                              </div>
                            </div>
                            <div class="input-wrapper mt-3">
                              <label for="edit-address-delivery-street" class="input-label">Adres</label>
                              <input
                                class="input-field"
                                type="text"
                                id="edit-address-delivery-street"
                                name="editAddressDeliveryStreet"
                                placeholder=""
                              />
                            </div>
                            <div class="error-box hidden"></div>
                            <div id="edit-address-delivery-post-data" class="flex w-full">
                              <div class="flex flex-col flex-1">
                                <div class="input-wrapper flex-1 mt-3 mr-3">
                                  <label for="edit-address-delivery-zip-code" class="input-label">Kod pocztowy</label>
                                  <input
                                    class="input-field"
                                    type="text"
                                    id="edit-address-delivery-zip-code"
                                    name="editAddressDeliveryZipCode"
                                    placeholder=""
                                  />
                                </div>
                                <div class="error-box hidden"></div>
                              </div>
                              <div class="flex flex-col flex-1">
                                <div class="input-wrapper flex-1 mt-3">
                                  <label for="edit-address-delivery-city" class="input-label">Miasto</label>
                                  <input
                                    class="input-field"
                                    type="text"
                                    id="edit-address-delivery-city"
                                    name="editAddressDeliveryCity"
                                    placeholder=""
                                  />
                                </div>
                                <div class="error-box hidden"></div>
                              </div>
                            </div>
                            <div class="input-wrapper mt-3">
                              <label for="edit-address-delivery-telephone" class="input-label">Numer telefonu komórkowego</label>
                              <input
                                class="input-field"
                                type="text"
                                id="edit-address-delivery-telephone"
                                name="editAddressDeliveryTelephone"
                                placeholder=""
                              />
                            </div>
                            <div class="error-box hidden"></div>
                              <button
                                type="submit"
                                id="edit-address-delivery-send-btn"
                                class="text-white text-left bg-primary_dark hover:bg-primary text-base font-semibold py-2 px-5 mt-4 mb-2 text-nowrap"
                              >
                                AKTUALIZUJ ADRES
                              </button>
                              <button
                                type="button"
                                id="edit-address-delivery-cancel-btn"
                                class="text-left bg-white dark:bg-background_dark border border-[#ccc] hover:text-gray-500 dark:hover:text-gray-200 text-base font-semibold py-2 px-5 text-nowrap"
                              >
                                ANULUJ
                              </button>
                              <div
                                id="server-response-edit-address-delivery"
                                class="p-2 text-sm text-[#a50000]"
                              ></div>
                          </form>
                        `

  app.appendChild(editAddressDeliveryModal)

  userAddresses.forEach((address) => {
    const newAddressBox = document.createElement("div")
    newAddressBox.classList.add("address-box")
    newAddressBox.setAttribute("data-id", address.Id)

    newAddressBox.innerHTML = `
      <div id="user-address-full-name" class="font-bold pb-2">${address.Name} ${address.LastName}</div>
      <div id="user-address-street">${address.Street}</div>
      <div id="user-address-post">${address.City}, ${address.ZipCode}, PL</div>
      <div id="user-address-telephone" class="mt-1">+48 ${address.Telephone}</div>
      <div class="flex mt-2 justify-between items-start">
        <div class="flex">
            <div
            class="user-address-edit-btn w-min mb-3 mr-3 text-sm font-bold underline tracking-wide cursor-pointer text-primary hover:text-white hover:bg-primary hover:no-underline transition-all"
            >
            Edytuj
            </div>
            <div
            class="user-address-delete-btn w-min mb-3 mr-3 text-sm font-bold underline tracking-wide cursor-pointer text-primary hover:text-white hover:bg-primary hover:no-underline transition-all"
            >
            Usuń
            </div>
        </div>
        <div class="no-primary hidden font-bold text-[10px] leading-5 mt-1 hover:text-gray-500">
            Ustaw jako domyślny
        </div>
        <div class="primary hidden font-bold text-[10px] leading-5 mt-1">Domyślny</div>
      </div>
      <div
        id="server-response-delete-address"
        class="p-2 text-xs text-[#a50000]">
      </div>
    `

    addressesWrapperField.appendChild(newAddressBox)

    const primaryAdressField = newAddressBox.querySelector(".primary")
    const noPrimaryAdressField = newAddressBox.querySelector(".no-primary")

    noPrimaryAdressField.addEventListener("click", async () => {
      try {
        await updatePrimaryAddress(address)

        addressesWrapperField
          .querySelectorAll(".address-box")
          .forEach((adr) => {
            adr.classList.remove("active")

            const primaryAdressField = adr.querySelector(".primary")
            const noPrimaryAdressField = adr.querySelector(".no-primary")

            if (primaryAdressField && noPrimaryAdressField) {
              primaryAdressField.classList.add("hidden")
              noPrimaryAdressField.classList.remove("hidden")
            }
          })

        newAddressBox.classList.add("active")
        primaryAdressField.classList.remove("hidden")
        noPrimaryAdressField.classList.add("hidden")
      } catch (error) {
        console.error("Error updating primary address:", error)
        return {}
      }
    })

    if (address.Id === PrimaryAddressId) {
      newAddressBox.classList.add("active")
      primaryAdressField.classList.remove("hidden")
      noPrimaryAdressField.classList.add("hidden")
    } else {
      newAddressBox.classList.remove("active")
      primaryAdressField.classList.add("hidden")
      noPrimaryAdressField.classList.remove("hidden")
    }

    newAddressBox
      .querySelector(".user-address-delete-btn")
      .addEventListener("click", async () => {
        try {
          await deleteAddress(address.Id)
          location.reload()
        } catch (error) {
          document.getElementById(
            "server-response-delete-address"
          ).textContent = error
        }
      })

    newAddressBox
      .querySelector(".user-address-edit-btn")
      .addEventListener("click", () => {
        showModal("edit-address-delivery-modal")
        setupEditAddress(address)
        initializeInputFields()
      })

    document
      .getElementById("edit-address-delivery-cancel-btn")
      .addEventListener("click", () => hideModal("edit-address-delivery-modal"))
  })
}

async function deleteAddress(addressId) {
  const response = await fetch(`${BASE_URL}/user/deleteaddressdelivery`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ addressDeliveryId: addressId }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
