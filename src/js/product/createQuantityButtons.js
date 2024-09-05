import { handleAddToCart } from '../cart/handleAddToCart'
import { updateProductValue } from '../cart/initializeCart'
export function createQuantityButtons(product, isUpdate, cartType) {
  const quantityContainer = document.getElementById(
    `quantity-container-${product.Id}`
  )

  const cartInfo = product.cartInfo || {}
  const quantityValue = cartInfo.Amount ? cartInfo.Amount : 1

  quantityContainer.innerHTML = `
    <button class="increment-button w-[35px] h-[35px] flex justify-center items-center border border-[#6d6d6d] outline-none">+</button>
      <input type="number" id="quantity-input-${product.Id}" name="amount" value="${quantityValue}" min="1" max="${product.Quantity}" class="cart-item-amount w-[70px] h-[35px] bg-transparent border border-[#6d6d6d] outline-none text-center appearance-none m-0 no-arrows">
    <button class="decrement-button w-[35px] h-[35px] flex justify-center items-center border border-[#6d6d6d] outline-none">-</button>
  `
  const quantityInput = quantityContainer.querySelector(
    `#quantity-input-${product.Id}`
  )
  const incrementButton = quantityContainer.querySelector('.increment-button')
  const decrementButton = quantityContainer.querySelector('.decrement-button')

  incrementButton.addEventListener('click', () => {
    incrementQuantity(quantityInput)
    if (isUpdate) {
      handleAddToCart(
        {
          Id: product.Id,
          Amount: parseInt(quantityInput.value, 10),
        },
        true,
        cartType
      )
    }
  })

  decrementButton.addEventListener('click', () => {
    decrementQuantity(quantityInput)
    if (isUpdate) {
      handleAddToCart(
        {
          Id: product.Id,
          Amount: parseInt(quantityInput.value, 10),
        },
        true,
        cartType
      )
    }
  })

  quantityInput.addEventListener('input', () => {
    validateQuantity(quantityInput)
    if (isUpdate) {
      handleAddToCart(
        {
          Id: product.Id,
          Amount: parseInt(quantityInput.value, 10),
        },
        true,
        cartType
      )
    }
  })

  return quantityContainer
}
function incrementQuantity(input) {
  let newValue = parseInt(input.value, 10)
  const max = parseInt(input.max)

  if (newValue < max) {
    newValue += 1
    input.value = newValue
    updateProductValue()
  }
}

function decrementQuantity(input) {
  let newValue = parseInt(input.value, 10)
  const min = parseInt(input.min)

  if (newValue > min) {
    newValue -= 1
    input.value = newValue
    updateProductValue()
  }
}

function validateQuantity(input) {
  let value = parseInt(input.value, 10)
  const min = parseInt(input.min)
  const max = parseInt(input.max)

  if (value < min) {
    input.value = min
  } else if (value > max) {
    input.value = max
  }
  updateProductValue()
}
