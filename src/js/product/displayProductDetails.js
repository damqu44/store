import { handleAddToCart } from "../cart/api/handleAddToCart"
import checkAvailableDeliveryMethods from "./checkAvailableDeliveryMethods"
import { createQuantityButtons } from "./createQuantityButtons"

export function displayProductDetails(product, cartType) {
  displayProductInfo(product)
  initializeImageSlider(product)
  displayProductMenu(product)
  toggleDeliveryOptions()
  checkAvailableDeliveryMethods(product.DeliveryMethods)

  function displayProductInfo(product) {
    const productDetails = document.getElementById("product-details")
    productDetails.innerHTML = `
        <div class="group bg-white dark:bg-background_dark items-center justify-center flex w-full h-[320px] relative overflow-hidden">
          <div class="flex transition-transform duration-300 w-[90%] h-[90%]" id="image-slider">
            ${product.Images.map(
              (image) => `
              <img
                src="${image.Url}"
                alt="${product.Name || "No image available"}"
                class="rounded-sm w-full h-full object-contain min-w-full"
              />
            `
            ).join("")}
          </div>
          <button id="prev-image" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black border hover:border-2 focus:bg-slate-100  dark:focus:bg-gray-700 border-[#ccc] dark:border-[#6d6d6d] text-[#ccc] rounded-xs w-[40px] h-[40px] text-2xl ml-5 opacity-0  group-hover:opacity-100 transition-opacity"><i class="fa-solid fa-angle-left"></i></button>
          <button id="next-image" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black border hover:border-2 focus:bg-slate-100 dark:focus:bg-gray-700 border-[#ccc] dark:border-[#6d6d6d] text-[#ccc] rounded-xs w-[40px] h-[40px] text-2xl mr-5 opacity-0  group-hover:opacity-100 transition-opacity"><i class="fa-solid fa-angle-right"></i></button>
        </div>
  
        <div class="bg-white dark:bg-background_dark py-10 px-8 sm:px-14 w-full mt-5 text-xs sm:text-sm">
            ${product.Description || "No description available"}
        </div>
      `
  }

  function initializeImageSlider(product) {
    const imageSlider = document.getElementById("image-slider")
    const images = product.Images.length
    let currentIndex = 0

    function updateArrowVisibility() {
      document
        .getElementById("prev-image")
        .classList.toggle("hidden", currentIndex === 0)
      document
        .getElementById("next-image")
        .classList.toggle("hidden", currentIndex === images - 1)
    }

    function updateSlider() {
      const offset = -currentIndex * 100
      imageSlider.style.transform = `translateX(${offset}%)`
    }

    document.getElementById("prev-image").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--
        updateSlider()
        updateArrowVisibility()
      }
    })

    document.getElementById("next-image").addEventListener("click", () => {
      if (currentIndex < images - 1) {
        currentIndex++
        updateSlider()
        updateArrowVisibility()
      }
    })

    updateArrowVisibility()
  }

  function displayProductMenu(product) {
    const productMenu = document.getElementById("product-menu")

    let cheapestDeliveryMethod

    if (product.DeliveryMethods && product.DeliveryMethods.length > 0) {
      cheapestDeliveryMethod = product.DeliveryMethods.reduce(
        (prev, current) => {
          return parseFloat(prev.Price) < parseFloat(current.Price)
            ? prev
            : current
        }
      )

      cheapestDeliveryMethod.Price = parseFloat(
        cheapestDeliveryMethod.Price
      ).toFixed(2)
    } else {
      cheapestDeliveryMethod = { Price: "N/A" }
    }

    const isProductAvailable = product.Quantity > 0

    productMenu.innerHTML = `
          <div class="${isProductAvailable ? "hidden" : ""} w-full px-10 py-2 bg-gray-400 text-red-600 font-bold text-base">
            OFERTA NIEDOSTĘPNA
          </div>
          <div class="flex flex-col bg-white dark:bg-background_dark  p-10">
            <div class="pb-5 text-xl">
              ${product.Name || "Unnamed Product"}
            </div>
            <div class="text-xl line-clamp-1">
              ${parseFloat(product.Price).toFixed(2) || "Price not available"} zł
            </div>
            <div class="border border-[#6d6d6d] border-x-0 border-t-0 border-b my-5"></div>
            <div class="flex flex-col">
              <div class="flex justify-start items-center">
                <label for="amount" class="pb-1 mr-2 text-sm">Liczba sztuk</label>
                <div id="quantity-container-${
                  product.Id
                }" class="pb-2 flex flex-row"></div>
                <div class="ml-2 text-sm">z ${product.Quantity} szt.</div>
              </div>
                <button id="add-to-cart" class="text-white bg-primary text-xs sm:text-sm md:text-base py-2 text-nowrap">DODAJ DO KOSZYKA</button>
            </div>
          </div>
          <div class="w-full bg-white dark:bg-background_dark p-10 mt-5">
            <div  id="open-delivery-options-button" class="w-full relative cursor-pointer group"> 
              <div class="text-sm">
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
              class="invisible fixed z-[55] flex justify-end right-0 top-0 w-full h-screen bg-black/60">
            <div
                id="delivery-options"  
                class="translate-x-full transition-transform w-[500px] h-full  bg-white dark:bg-background_dark">
              <div class="flex justify-between  p-4">
                <div class="mb-4 text-xl font-semibold"><i class="fa-solid fa-truck mr-5 text-[#b1b1b1]"></i>Dostawa</div>
                <div id="close-delivery-options-button" class="text-2xl text-gray-400 cursor-pointer"><i class="fa-solid fa-xmark"></i></div>
              </div>
              <div style="max-height: calc(100% - 5rem)" class="w-full overflow-y-auto">
                <div class="w-full h-[13px] bg-background_light dark:bg-black"></div>
                <div id="pickup-point-delivery" class="mt-4">
                  <div class="w-full flex justify-between items-center text-base font-semibold px-8 pb-1 text-nowrap">
                    <div>Odbiór w punkcie</div>
                    <div>Koszt</div>
                  </div>
                  <div class="border border-[#070707] dark:border-[#6d6d6d] border-x-0 border-t-0 mx-4 my-1"></div>
                  <div id="parcel-locker-delivery" class="w-full flex justify-between items-center text-base py-2 px-8 ">
                    <div>Paczkomat InPost</div>
                    <div>${getDeliveryPricesById(product.DeliveryMethods, 4)} zł</div>
                  </div>
                  <div id="pickup-delivery" class="w-full flex justify-between items-center text-base py-2 px-8 ">
                    <div>DPD Pickup</div>
                    <div>${getDeliveryPricesById(product.DeliveryMethods, 1)} zł</div>
                  </div>
                </div>
                <div class="w-full h-[13px] bg-background_light dark:bg-black"></div>
                <div class="w-full flex justify-between items-center text-base font-semibold px-8 pb-1 text-nowrap">
                  <div>Na adres</div>
                  <div>Koszt</div>
                </div>
                <div class="border border-[#070707] dark:border-[#6d6d6d] border-x-0 border-t-0 mx-4 my-1"></div>
                <div id="standard-delivery" class="w-full flex flex-col">
                  <div id="inpost-delivery" class="w-full flex justify-between items-center text-base py-2 px-8 ">
                    <div>Kurier InPost</div>
                      <div>${getDeliveryPricesById(product.DeliveryMethods, 6)} zł
                      </div>
                  </div>
                  <div id="dpd-delivery" class="w-full flex justify-between items-center text-base py-2 px-8 ">
                    <div>Kurier DPD</div>
                      <div>${getDeliveryPricesById(product.DeliveryMethods, 7)} zł
                      </div>
                  </div>
                  <div id="dpd-express-delivery" class="w-full flex justify-between items-center text-base py-2 px-8 ">
                    <div>Kurier DPD EXPRESS</div>
                      <div>${getDeliveryPricesById(product.DeliveryMethods, 2)} zł
                      </div>
                  </div>
                </div>
                <div class="w-full h-[13px] bg-background_light  dark:bg-black"></div>
                <div class="w-full flex items-center text-base py-2 px-8">
                Potrzebujesz więcej informacji? Sprawdź<a class="ml-1 font-semibold cursor-pointer text-primary hover:text-primary_dark" href="/index.html">Pomoc.</a></div>
              </div>
            </div>
          </div>
    `
    createQuantityButtons(product, false, cartType)

    const quantityInput = document.getElementById(
      `quantity-input-${product.Id}`
    )
    const cartButton = document.getElementById("add-to-cart")
    cartButton.addEventListener("click", () => {
      const amount = parseInt(quantityInput.value, 10)
      handleAddToCart(
        {
          Id: product.Id,
          Amount: amount,
        },
        false,
        cartType
      )
    })

    checkAvailableDeliveryMethods(product.DeliveryMethods)
    toggleDeliveryOptions()
  }
}

function toggleDeliveryOptions() {
  const closeDeliveryButton = document.getElementById(
    "close-delivery-options-button"
  )
  const openDeliveryOptionsButton = document.getElementById(
    "open-delivery-options-button"
  )
  const deliveryOptions = document.getElementById("delivery-options")
  const deliveryOptionsBackground = document.getElementById(
    "delivery-options-background"
  )

  closeDeliveryButton.addEventListener("click", () => {
    const header = document.getElementById("header")
    deliveryOptions.classList.remove("translate-x-0")
    deliveryOptions.classList.add("translate-x-full")

    setTimeout(() => {
      document.body.style.overflow = "auto"
      deliveryOptionsBackground.classList.add("invisible")
      header.classList.add("z-[33]")
    }, 100)
  })

  openDeliveryOptionsButton.addEventListener("click", () => {
    const header = document.getElementById("header")
    deliveryOptionsBackground.classList.remove("invisible")
    document.body.style.overflow = "hidden"
    header.classList.remove("z-[33]")

    setTimeout(() => {
      deliveryOptions.classList.remove("translate-x-full")
      deliveryOptions.classList.add("translate-x-0")
    }, 100)
  })
}

function getDeliveryPricesById(deliveryMethods, targetId) {
  return deliveryMethods
    .filter((item) => item.Id === targetId)
    .map((item) => parseFloat(item.Price).toFixed(2))
}
