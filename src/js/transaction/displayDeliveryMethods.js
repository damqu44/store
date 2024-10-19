import { getCart } from "../cart/api/getCart"

export const displayDeliveryMethods = async () => {
  try {
    const cart = await getCart()

    const transactionProducts = document.getElementById("transaction-products")

    const getProductLabel = (count) => {
      if (count === 1) {
        return "produkt"
      } else if (count >= 2 && count <= 4) {
        return "produkty"
      } else {
        return "produktów"
      }
    }

    const productLabel = getProductLabel(cart.cartData.length)

    const transactionProductsAmount = document.createElement("div")
    transactionProductsAmount.innerHTML = `<div class="mb-3">${cart.cartData.length} ${productLabel}</div>`
    transactionProducts.appendChild(transactionProductsAmount)
    cart.cartData.forEach((product) => {
      const firstImage = product.Images[0].Url ? product.Images[0].Url : ""
      const transactionProduct = document.createElement("div")

      transactionProduct.innerHTML = `
            <div
                class="flex w-full border border-[#ccc] justify-center items-center mb-2"
              >
                <div class="w-[60px] h-[60px] m-3">
                  <a href="/product.html?id=${product.Id}">
                    <img
                      class="w-full h-full object-cover"
                      src="${firstImage}"
                    />
                  </a>
                </div>
                <div
                  class="flex flex-col w-full justify-between min-h-[60px]"
                >
                  <div class="line-clamp-2 mr-3">${product.Name}</div>
                  <div class="flex justify-between items-center">
                    <div>${product.cartInfo.Amount} x ${product.Price} zł</div>
                    <div
                      class="w-min text-nowrap justify-center items-center flex mr-3"
                    >
                      ${product.Price * product.cartInfo.Amount} zł
                    </div>
                  </div>
                </div>
              </div>
            `
      transactionProducts.appendChild(transactionProduct)
    })

    const productsCost = cart.cartData.reduce((acc, product) => {
      return acc + product.Price * product.cartInfo.Amount
    }, 0)
    const freeDeliveryNeed = (150 - productsCost).toFixed(2)

    if (productsCost < 150) {
      const freeDelivery = document.getElementById("free-delivery")
      freeDelivery.innerHTML = `Brakuje ${freeDeliveryNeed} zł do darmowej dostawy`
    }

    const productsTransactionCost = document.getElementById(
      "products-transaction-cost"
    )
    productsTransactionCost.innerHTML = productsCost.toFixed(2) + " zł"
    const deliveryTransactionCost = document.getElementById(
      "delivery-transaction-cost"
    )
    deliveryTransactionCost.innerHTML = "0"
    const finalTransactionCost = document.getElementById(
      "final-transaction-cost"
    )
    finalTransactionCost.innerHTML = productsCost.toFixed(2) + " zł"

    const deliveryMethods = document.getElementById("delivery-methods")

    deliveryMethods.addEventListener("click", (e) => {
      if (e.target.closest(".clickable-label")) {
        const radioId = e.target
          .closest(".clickable-label")
          .getAttribute("data-for")
        const radioButton = document.getElementById(radioId)
        if (radioButton) {
          radioButton.checked = true
          updateDeliveryCost(radioButton.value)
        }
      }
    })

    const allDeliveryMethods = cart.cartData.flatMap(
      (product) => product.deliveryMethods
    )

    const uniqueDeliveryMethods = Array.from(
      new Set(allDeliveryMethods.map((method) => JSON.stringify(method)))
    ).map((str) => JSON.parse(str))

    const commonDeliveryMethods = uniqueDeliveryMethods.filter((method) =>
      cart.cartData.every((product) =>
        product.deliveryMethods.some((delivery) => delivery.Id === method.Id)
      )
    )

    const uniqueCommonDeliveryMethods = Array.from(
      new Map(
        commonDeliveryMethods.map((method) => [method.Id, method])
      ).values()
    )

    if (uniqueCommonDeliveryMethods.length > 0) {
      uniqueCommonDeliveryMethods.forEach((method) => {
        const deliveryMethod = createDeliveryOption(
          method.Id,
          method.Name,
          method.Price,
          productsCost
        )
        deliveryMethods.appendChild(deliveryMethod)
      })
    } else {
      const defaultDeliveryMethod = createDeliveryOption(7, "Kurier DPD", "0")
      deliveryMethods.appendChild(defaultDeliveryMethod)
    }

    const updateDeliveryCost = (selectedDeliveryId) => {
      const selectedDelivery = uniqueCommonDeliveryMethods.find(
        (method) => method.Id == selectedDeliveryId
      )
      const deliveryCost = selectedDelivery
        ? parseFloat(selectedDelivery.Price)
        : 0
      deliveryTransactionCost.innerHTML = `${deliveryCost.toFixed(2)} zł`
      finalTransactionCost.innerHTML = `${(
        productsCost + parseFloat(deliveryCost)
      ).toFixed(2)} zł`
    }
  } catch (error) {
    console.error("Error updating primary address:", error)
    return {}
  }
}

const createDeliveryOption = (id, name, price, productsCost) => {
  const option = document.createElement("div")

  option.classList.add("delivery-option")
  option.innerHTML = `
      <div data-for="delivery-${id}" class="flex w-full mb-3 clickable-label items-center cursor-pointer">
        <input type="radio" id="delivery-${id}" name="delivery-method" value="${id}" />
        <label class="radio-label" for="delivery-${id}"></label>
        <div class="flex justify-between flex-grow pr-10">
          <div class="ml-2 text-nowrap">${name}</div>
          <div class="flex">
            <div class="ml-2 text-nowrap ${
              productsCost < 150 ? "" : "line-through text-red-900"
            }">${parseFloat(price).toFixed(2)} zł</div>
            <div class="ml-2 text-nowrap ${
              productsCost < 150 ? "hidden" : ""
            }">0 zł</div>
          </div>
        </div>
        
      </div>
    `

  return option
}
