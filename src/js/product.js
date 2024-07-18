import '../index.css'
import _ from 'lodash'

async function fetchProductById(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const product = await response.json()
    displayProductDetails(product)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    window.location.href = '/error.html'
  }
}

function displayProductDetails(product) {
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

  productMenu.innerHTML = `
      <div class="pb-5 line-clamp-2 text-4xl">
        ${product.Name || 'Unnamed Product'}
      </div>
      <div class="text-2xl line-clamp-1">
        ${product.Price || 'Price not available'} zł
      </div>
      <div class="border border-[#6d6d6d] border-x-0 border-t-0 border-b my-5"></div>
      <form class="flex flex-col">
        <label for="amount" class="pb-1 text-sm">Liczba sztuk</label>
        <div class="pb-2 flex flex-row">
          <button class="w-[35px] h-[35px] flex justify-center items-center border border-[#6d6d6d] outline-none">+</button>
          <input type="number" id="amount" name="amount" value="1" min="1" class="w-[70px] h-[35px] bg-transparent border border-[#6d6d6d] outline-none text-center appearance-none m-0 no-arrows">
          <button class="w-[35px] h-[35px] flex justify-center items-center border border-[#6d6d6d] outline-none">-</button>
        </div>
        <button type="submit" class="text-white bg-[#ff5a00] text-xl py-2">DODAJ DO KOSZYKA</button>
      </form>
`
}

const productMenu = document.getElementById('product-menu')

document.addEventListener('DOMContentLoaded', () => {
  const productId = new URLSearchParams(window.location.search).get('id')
  if (productId) {
    fetchProductById(productId)
  }
})
