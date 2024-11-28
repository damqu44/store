import { setupEditPersonalData } from "./editPersonalData"
import { setupEditEmail } from "./editEmail"
import { setupEditPassword } from "./editPassword"
import { setupEditTelephone } from "./editTelephone"
import { setupAddAddressDelivery } from "./addAddressDelivery"
import { getUserInfo } from "./api/getUserInfo"
import { displayAddresses } from "./displayAddresses"
import { getUserAddresses } from "./api/getUserAddresses"

export async function loadUserInfo() {
  try {
    let user = null
    user = await getUserInfo()

    if (user.Id) {
      document.getElementById("welcome-text").textContent = `Cześć ${user.Name}`
      document.getElementById("user-name").textContent = user.Name
      document.getElementById("user-last-name").textContent = user.LastName

      const userDateBornElement = document.getElementById("user-date-born")

      const formattedBirthDate = new Date(user.BirthDate)
        .toISOString()
        .split("T")[0]

      if (user.BirthDate) {
        userDateBornElement.textContent = formattedBirthDate
        userDateBornElement.classList.remove("hidden")
      } else {
        userDateBornElement.classList.add("hidden")
      }

      const userGenderElement = document.getElementById("user-gender")
      if (user.Gender === "FEMALE") {
        userGenderElement.textContent = "Kobieta"
        userGenderElement.classList.remove("hidden")
      } else if (user.Gender === "MAN") {
        userGenderElement.textContent = "Mężczyzna"
        userGenderElement.classList.remove("hidden")
      } else {
        userGenderElement.classList.add("hidden")
      }

      document.getElementById("user-email").textContent = user.Email
      document.getElementById("user-telephone").textContent = user.Telephone

      const userAddresses = await getUserAddresses(
        user.PrimaryAddressDeliveryId
      )
      displayAddresses(userAddresses, user.PrimaryAddressDeliveryId)

      document
        .getElementById("edit-personal-data-btn")
        .addEventListener("click", () => {
          setupEditPersonalData(user)
        })

      document
        .getElementById("edit-email-btn")
        .addEventListener("click", () => {
          setupEditEmail(user)
        })

      document
        .getElementById("edit-password-btn")
        .addEventListener("click", () => {
          setupEditPassword(user)
        })

      document
        .getElementById("edit-telephone-btn")
        .addEventListener("click", () => {
          setupEditTelephone(user)
        })

      document
        .getElementById("add-address-delivery-btn")
        .addEventListener("click", () => {
          setupAddAddressDelivery(user)
        })
    }
  } catch (error) {
    console.error("Failed to load user info:", error)
  }
}
