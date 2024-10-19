export function initializeCart() {
  const cartItems = document.querySelectorAll(".cart-item")

  cartItems.forEach((item) => {
    const quantityInput = item.querySelector(".cart-item-amount")

    quantityInput.addEventListener("input", updateProductValue)
  })

  updateProductValue()
}

export function updateProductValue() {
  let totalProductValue = 0
  let deliveryPrice = 0
  const cartItems = document.querySelectorAll(".cart-item")

  cartItems.forEach((item) => {
    const priceElement = item.querySelector(".cart-item-price")
    const quantityInput = item.querySelector(".cart-item-amount")

    const price = parseFloat(priceElement.dataset.price)
    deliveryPrice = parseFloat(priceElement.dataset.deliveryprice)
    const quantity = parseInt(quantityInput.value, 10)

    totalProductValue += price * quantity
  })

  if (cartItems.length === 0) {
    totalProductValue = 0
  }

  const productsCost = document.getElementById("products-cost")
  if (productsCost) {
    productsCost.textContent = `${totalProductValue.toFixed(2)} zł`
  }
  const productsDeliveryCost = document.getElementById("delivery-cost")
  if (productsDeliveryCost) {
    if (totalProductValue >= 150) {
      productsDeliveryCost.textContent = `0 zł`
      deliveryPrice = 0
    } else {
      productsDeliveryCost.textContent = `${deliveryPrice.toFixed(2)} zł`
    }
  }

  const productsWithDeliveryCost = document.getElementById(
    "products-with-delivery-cost"
  )
  if (productsWithDeliveryCost) {
    productsWithDeliveryCost.textContent = `${(
      totalProductValue + deliveryPrice
    ).toFixed(2)} zł`
  }
}
