import { handleAddToCart } from '../cart/handleAddToCart'
import { createQuantityButtons } from './createQuantityButtons'
export function displayProductDetails(product) {
  const productDetails = document.getElementById('product-details')
  productDetails.innerHTML = `
      <div class="bg-white dark:bg-[#222222] py-10 px-16 w-full">
        <div class="aspect-w-4 aspect-h-3">
          <img
            src="${product.ImageLink}"
            alt="${product.Name || 'No image available'}"
            class="object-cover rounded-sm"
          />
        </div>
      </div>
      <div class="bg-white dark:bg-[#222222] py-10 px-16 w-full mt-5 text-base">
          ${product.Description || 'No description available'}
        </div>
      `

  const productMenu = document.getElementById('product-menu')

  productMenu.innerHTML = `
        <div class="pb-5 line-clamp-2 text-4xl">
          ${product.Name || 'Unnamed Product'}
        </div>
        <div class="text-2xl line-clamp-1">
          ${product.Price || 'Price not available'} zł
        </div>
        <div class="border border-[#6d6d6d] border-x-0 border-t-0 border-b my-5"></div>
        <div class="flex flex-col">
          <label for="amount" class="pb-1 text-sm">Liczba sztuk</label>
          <div id="quantity-container-${
            product.Id
          }" class="pb-2 flex flex-row"></div>
          <button id="add-to-cart" class="text-white bg-primary text-xl py-2">DODAJ DO KOSZYKA</button>
        </div>
  `
  createQuantityButtons(product, false)

  const quantityInput = document.getElementById(`quantity-input-${product.Id}`)
  const cartButton = document.getElementById('add-to-cart')
  cartButton.addEventListener('click', () => {
    const amount = parseInt(quantityInput.value, 10)
    handleAddToCart(
      {
        Id: product.Id,
        Amount: amount,
      },
      false
    )
  })
}
