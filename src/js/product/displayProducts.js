export function displayProducts(products) {
  const productList = document.getElementById('product-list')
  productList.innerHTML = ''

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
