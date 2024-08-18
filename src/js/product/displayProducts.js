export function displayProducts(products) {
  const searchContainer = document.getElementById('search-container')
  const productList = document.getElementById('product-list')
  productList.innerHTML = ''

  if (!products || products.length === 0) {
    console.log('Nie znaleziono produktów!')
    searchContainer.innerHTML = `
    <div class="flex flex-col w-full px-10 py-5 bg-white dark:bg-background_dark">
      <div class="font-semibold text-lg mb-5">Przykro nam, nie znaleźliśmy ofert dla wyszukiwanej frazy</div>
      <div class="font-semibold text-base mb-2">Spróbuj jeszcze raz:</div>
      <ul class="text-sm list-disc ml-6">
        <li class="mb-1">inaczej wpisać nazwę</li>
        <li class="mb-1">sprawdzić czy nie ma błędu</li>
        <li class="mb-1">poszukać czegoś podobnego</li>
      </ul>
    </div>
    `
    return
  }

  products.forEach((product) => {
    const productElement = document.createElement('li')
    productElement.classList.add(
      'hover:cursor-pointer',
      'hover:scale-95',
      'transition-transform'
    )

    productElement.addEventListener('click', () => {
      window.location.href = `/product.html?id=${product.Id}`
    })

    productElement.innerHTML = `
        <div class="aspect-w-1 aspect-h-1">
          <img
            src="${product.ImageLink}"
            alt="${product.Name || 'No image available'}"
            class="object-cover rounded-md"
          />
        </div>
        <div class="py-1 text-base line-clamp-2">
          ${product.Name || 'Unnamed Product'}
        </div>
        <div class="text-sm line-clamp-1">${
          product.Price + ' zł' || 'Price not available'
        }</div>
      `

    productList.appendChild(productElement)
  })

  const event = new CustomEvent('productsLoaded', { detail: { products } })
  document.dispatchEvent(event)
}
