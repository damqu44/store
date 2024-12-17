import { createQuantityButtons } from "../product/createQuantityButtons"
import { handleRemoveFromCart } from "./api/handleRemoveFromCart"

export async function createCartItem(product, cartType) {
  const cartContent = document.getElementById("cart-content")
  const cartItemContainer = document.createElement("div")
  cartItemContainer.id = `cart-item-${product.Id}`

  const cheapestDeliveryMethod = product.deliveryMethods.reduce(
    (cheapest, method) => (method.Price < cheapest.Price ? method : cheapest),
    product.deliveryMethods[0]
  )
  const firstImage =
    product.Images && product.Images.length > 0 ? product.Images[0].Url : ""

  const price = parseFloat(product.Price).toFixed(2)
  const priceParts = price.split(".")
  const price1 = priceParts[0]
  const price2 = priceParts[1]
  cartItemContainer.classList.add(
    "flex",
    "flex-col",
    "lg:flex-row",
    "p-5",
    "mb-4",
    "bg-white",
    "dark:bg-[#222222]",
    "cart-item"
  )
  cartItemContainer.innerHTML = `
        <div class="flex w-full lg:w-[55%]">
          <div class="w-[160px] h-[90px]">
            <a href='/product.html?id=${product.Id}'>
                <img
                    class="w-full h-full object-contain rounded-md"
                    src="${firstImage}"
                />
            </a>  
          </div>
          <div class="w-full flex justify-left items-center px-3">
            <a href='/product.html?id=${product.Id}'>
                <span class="line-clamp-2">${product.Name}</span>
            </a>
          </div>
        </div>
        <div class="flex w-full lg:w-[45%]">
          <div class="w-[50%] flex justify-center items-center px-3">
            <div id="quantity-container-${product.Id}" class="flex flex-row"></div>
          </div>
          <div class="w-[30%] px-3 flex justify-center items-center">
            <div class="flex justify-center items-end">
              <div class="hidden">${price}</div>
              <div class="cart-item-price text-xl h-min text-nowrap" data-deliveryprice=${cheapestDeliveryMethod.Price} data-price="${price}">${price1},</div>
              <div class="text-bease h-min text-nowrap ml-0.5">${price2} zł</div>
            </div>
          </div>
          <div id="delete-button" class="w-[20%] flex justify-center items-center px-3">
            <i
              class="fa-regular fa-trash-can text-2xl cursor-pointer hover:text-primary p-4 transition-colors"
            ></i>
          </div>
        </div>
    `
  const deleteButton = cartItemContainer.querySelector("#delete-button")
  deleteButton.addEventListener("click", () => {
    await handleRemoveFromCart(product.Id, cartType)
  })

  cartContent.appendChild(cartItemContainer)
  createQuantityButtons(product, true, cartType)
}
