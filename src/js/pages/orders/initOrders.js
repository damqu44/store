import "../../../index.css"
import "../../../css/radioInput.css"

import { checkAuth } from "../../utils/auth"
import { getUserInfo } from "../../account/api/getUserInfo"
import { getOrders } from "../../order/api/getOrders"
import convertDate from "../../utils/convertDate"

document.addEventListener("DOMContentLoaded", async () => {
  checkAuth()

  const user = await getUserInfo()

  document.getElementById("welcome-text").textContent = `Cześć ${user.Name}`

  const orders = await getOrders()
  const ordersSection = document.getElementById("orders-section")

  if (!orders || orders.length < 1) {
    ordersSection.innerHTML = `
      <div
        class="text-[#84949F] flex flex-col w-full justify-start items-center mt-[100px]"
      >
        <div>
          <div class="text-lg">Nie masz jeszcze żadnych zamówień.</div>
          <div class="text-sm">
            Zacznij zakupy już teraz!
          </div>
        </div>
      </div>
      `
    return
  }

  orders.forEach((order) => {
    const orderDiv = document.createElement("div")
    orderDiv.classList.add(
      "p-4",
      "mb-4",
      "w-full",
      "flex",
      "flex-col",
      "justify-center",
      "items-start",
      "bg-white",
      "dark:bg-background_dark"
    )

    let orderItemsHtml = ""
    order.OrderItems.forEach((item) => {
      const firstImage =
        item.Product.Images && item.Product.Images.length > 0
          ? item.Product.Images[0].Url
          : ""
      orderItemsHtml += `
      <div
        onclick="location.href='product.html?id=${item.Product.Id}'"
        class="flex flex-col sm:flex-row w-full p-2 cursor-pointer hover:ring-1	hover:ring-inset hover:ring-[#ccc] transition-colors text-xs sm:text-base">
        <div class="w-[150px] h-[100px]">
          <img class="object-contain rounded-sm w-full h-full" src="${firstImage}"/>
        </div>
        <div class="flex flex-col flex-1 ml-2">
          <div class="mb-1 line-clamp-2 ">${item.Product.Name}</div>
          <div class="mb-1 line-clamp-1">Ilość x ${item.Quantity}</div>
          <div class="line-clamp-1">Cena ${parseFloat(item.Product.Price).toFixed(2)} zł</div>
        </div>
      </div>
      `
    })

    let orderStatus = ""
    if (order.IsPaid === false) {
      orderStatus = "Nieopłacone"
    } else if (order.Status === "PENDING") {
      orderStatus = "W realizacji"
    } else if (order.Status === "SHIPPED") {
      orderStatus = "W trakcie dostawy"
    } else if (order.Status === "DELIVERED") {
      orderStatus = "Dostarczone"
    } else if (order.Status === "CANCELLED") {
      orderStatus = "Anulowane"
    }

    orderDiv.innerHTML = `
    <div class="flex w-full">
      <div class="text-sm sm:text-lg font-bold mb-1 flex flex-col sm:flex-row">
        <div>${convertDate(order.OrderDate)}</div>
        <div class="hidden sm:flex">&nbsp;|&nbsp;</div>
        <div>${order.TotalPrice} ZŁ</div>
      </div>
    </div>
    <div class="text-lg">Numer zamówienia: ${order.Id}</div>
    <div class="mt-2 w-full">
        ${orderItemsHtml}
    </div>
    <div class="pl-2">
      Status zamówienia: <span class="font-medium">${orderStatus}</span>
    </div>
    <div class="pl-2 ">${
      order.IsPaid
        ? ""
        : 'Zamówienie <span class="text-red-600">nie jest</span> opłacone, <a class="font-medium underline" href="./error.html">kliknij tutaj</a> by dokonać płatności.'
    }</div>
    `
    orderDiv.classList.add("text-sm", "sm:text-base")
    ordersSection.appendChild(orderDiv)
  })
})
