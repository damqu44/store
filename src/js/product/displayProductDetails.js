import { handleAddToCart } from '../cart/handleAddToCart'
import { createQuantityButtons } from './createQuantityButtons'
export function displayProductDetails(product) {
  const productDetails = document.getElementById('product-details')
  productDetails.innerHTML = `
      <div class="bg-white dark:bg-background_dark py-10 px-16 w-full">
        <div class="aspect-w-4 aspect-h-3">
          <img
            src="${product.ImageLink}"
            alt="${product.Name || 'No image available'}"
            class="object-cover rounded-sm"
          />
        </div>
      </div>
      <div class="bg-white dark:bg-background_dark py-10 px-16 w-full mt-5 text-base">
          ${product.Description || 'No description available'}
        </div>
      `

  const productMenu = document.getElementById('product-menu')
  let cheapestDeliveryMethod
  if (product.DeliveryMethods && product.DeliveryMethods.length > 0) {
    cheapestDeliveryMethod = product.DeliveryMethods.reduce((prev, current) => {
      return prev.Price < current.Price ? prev : current
    })
  } else {
    cheapestDeliveryMethod = { Price: 'N/A' }
  }

  productMenu.innerHTML = `
        <div class="flex flex-col bg-white dark:bg-background_dark  p-10">
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
            <button id="add-to-cart" class="text-white bg-primary text-xs sm:text-sm md:text-base py-2 text-nowrap">DODAJ DO KOSZYKA</button>
          </div>
        </div>
        <div class="w-full bg-white dark:bg-background_dark p-10 mt-5">
          <div class="w-full relative cursor-pointer group"> 
            <div id="open-delivery-options-button" class="text-sm">
              <i class="fa-solid fa-truck mr-3"></i>Dostawa od ${
                cheapestDeliveryMethod.Price
              } zł
              </div>
            <div class="absolute right-0 top-1/2 translate-y-[-50%]">
              <i class="fa-solid fa-angle-right group group-hover:scale-150 transition-transform"></i>
            </div>
          </div>
        </div>
        <div 
            id="delivery-options-background"
            class="invisible fixed flex justify-end right-0 top-0 w-full h-screen bg-black/60">
          <div
              id="delivery-options"  
              class="translate-x-full transition-transform w-[500px] h-full bg-white dark:bg-background_dark text-black">
            <div class="flex justify-between  p-4">
              <div class="mb-4 text-xl font-semibold"><i class="fa-solid fa-truck mr-5 text-[#b1b1b1]"></i>Dostawa</div>
              <div id="close-delivery-options-button" class="text-2xl text-gray-400 cursor-pointer"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div style="max-height: calc(100% - 5rem)" class="w-full overflow-y-auto">
              <div class="w-full h-[13px] bg-background_light dark:bg-background_dark"></div>
              <div class="mt-4">
                <div class="w-full flex justify-between items-center text-base font-semibold px-8 pb-1 text-nowrap">
                  <div>Odbiór w punkcie</div>
                  <div>Koszt</div>
                </div>
                <div class="border border-[#070707] border-x-0 border-t-0 mx-4 my-1"></div>
                <div class="w-full flex justify-between items-center text-base py-2 px-8 ">
                  <div>Paczkomat InPost</div>
                  <div>${product.DeliveryMethods.filter(
                    (item) => item.Name === 'kurier dpd nextday'
                  ).map((item) => item.Price)} zł</div>
                </div>
              </div>
              <div class="w-full h-[13px] bg-background_light dark:bg-background_dark"></div>
              <div class="w-full flex justify-between items-center text-base font-semibold px-8 pb-1 text-nowrap">
                <div>Na adres</div>
                <div>Koszt</div>
              </div>
              <div class="border border-[#070707] border-x-0 border-t-0 mx-4 my-1"></div>
              <div class="w-full flex flex-col">
                <div class="w-full flex justify-between items-center text-base py-2 px-8 ">
                  <div>Kurier InPost</div>
                    <div>${product.DeliveryMethods.filter(
                      (item) => item.Name === 'kurier dpd nextday'
                    ).map((item) => item.Price)} zł
                    </div>
                </div>
                <div class="w-full flex justify-between items-center text-base py-2 px-8 ">
                  <div>Kurier DPD NEXTDAY</div>
                    <div>${product.DeliveryMethods.filter(
                      (item) => item.Name === 'kurier dpd nextday'
                    ).map((item) => item.Price)} zł
                    </div>
                </div>
              </div>
              <div class="w-full h-[13px] bg-background_light  dark:bg-background_dark"></div>
              <div class="w-full flex items-center text-base py-2 px-8">
              Potrzebujesz więcej informacji? Sprawdź<a class="ml-1 font-semibold cursor-pointer text-primary hover:text-primary_dark" href="/index.html">Pomoc.</a></div>
            </div>
          </div>
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

  const closeDeliveryButton = document.getElementById(
    'close-delivery-options-button'
  )
  const openDeliveryOptionsButton = document.getElementById(
    'open-delivery-options-button'
  )
  const deliveryOptions = document.getElementById('delivery-options')
  const deliveryOptionsBackground = document.getElementById(
    'delivery-options-background'
  )

  closeDeliveryButton.addEventListener('click', () => {
    deliveryOptions.classList.remove('translate-x-0')

    setTimeout(() => {
      document.body.style.overflow = 'auto'
      deliveryOptionsBackground.classList.add('invisible')
    }, 600)
  })

  openDeliveryOptionsButton.addEventListener('click', () => {
    deliveryOptionsBackground.classList.remove('invisible')

    setTimeout(() => {
      document.body.style.overflow = 'hidden'
      deliveryOptions.classList.add('translate-x-0')
    }, 10)
  })
}
