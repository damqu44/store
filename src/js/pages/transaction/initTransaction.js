import "../../../index.css"
import "../../../css/radioInput.css"

import { loadHeader } from "../../components/header"
import { loadFooter } from "../../components/footer"
import { displayDeliveryMethods } from "../../transaction/displayDeliveryMethods"
import { displayUserDetails } from "../../transaction/displayUserDetails"
import { isAuthenticated } from "../../utils/auth"
import { displayInvoiceDetails } from "../../transaction/displayInvoiceDetails"
import { getUserInfo } from "../../account/api/getUserInfo"
import { displayComment } from "../../transaction/displayComment"
import { displayDiscount } from "../../transaction/displayDiscount"
import getTransactionData from "../../transaction/getTransactionData"
import managePaymentMethods from "../../transaction/managePaymentMethods"

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader()
  loadFooter()

  if (!isAuthenticated()) {
    window.location.href = "/login.html"
  }

  const user = await getUserInfo()

  await displayDeliveryMethods()
  await displayUserDetails(user)
  displayInvoiceDetails(user)
  managePaymentMethods()
  displayComment()
  displayDiscount()

  const transactionPayBtn = document.getElementById(
    "delivery-transaction-pay-btn"
  )
  transactionPayBtn.addEventListener("click", async () => {
    await getTransactionData()
  })
})
