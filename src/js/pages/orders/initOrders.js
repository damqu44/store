import '../../../index.css'
import '../../../css/radioInput.css'

import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'
import { isAuthenticated } from '../../utils/auth'
import { getUserInfo } from '../../account/api/getUserInfo'
import { handleSearch } from '../../search/handleSearch'
import { getOrders } from '../../order/api/getOrders'
import convertDate from '../../utils/convertDate'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  loadFooter()

  if (!isAuthenticated()) {
    window.location.href = '/login.html'
  }

  const user = await getUserInfo()

  const orders = await getOrders()
  const ordersSection = document.getElementById('orders-section')

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
    console.log(order)
    const orderDiv = document.createElement('div')
    orderDiv.classList.add(
      'p-4',
      'mb-4',
      'w-full',
      'flex',
      'flex-col',
      'justify-center',
      'items-start',
      'bg-white',
      'dark:bg-background_dark'
    )

    let orderItemsHtml = ''
    order.OrderItems.forEach((item) => {
      orderItemsHtml += `
      <div
        onclick="location.href='product.html?id=${item.Product.Id}'"
        class="flex w-full p-2 cursor-pointer hover:bg-background_light/60 transition-colors">
        <div class="w-[150px] h-[100px]">
          <img class="object-cover rounded-sm w-full h-full" src="${item.Product.ImageLink}"/>
        </div>
        <div class="flex flex-col flex-1 ml-2">
          <div class="mb-1 line-clamp-2">${item.Product.Name}</div>
          <div class="mb-1 line-clamp-1">Ilość x ${item.Quantity}</div>
          <div class="line-clamp-1">Cena ${item.Product.Price} zł</div>
        </div>
      </div>
      `
    })

    orderDiv.innerHTML = `
    <div class="flex w-full">
      <div class="text-lg font-bold mb-1">${convertDate(
        order.OrderDate
      )} &nbsp;|&nbsp; ${order.TotalPrice} ZŁ
      </div>
    </div>
    <div class="text-lg">Numer zamówienia: ${order.Id}</div>
    <div class="mt-2 w-full">
        ${orderItemsHtml}
    </div>
    <div class="pl-2 font-medium">${
      order.IsPaid
        ? ''
        : 'Zamówienie nie jest opłacone, kliknij tutaj by dokonać płatności'
    }</div>
    `
    ordersSection.appendChild(orderDiv)
  })

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
