export function displayProducts(products) {
  const productList = document.getElementById("product-list")

  productList.innerHTML = ""

  products.forEach((product) => {
    const productElement = document.createElement("li")
    productElement.classList.add(
      "hover:cursor-pointer",
      "hover:shadow-xl",
      "transition-transform",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "shadow-light-shadow",
      "dark:hover:border",
      "dark:hover:border-[#6d6d6d]",
      "dark:hover:border-t-0",
      "dark:hover:border-x-0",
      "dark:hover:shadow-none",
      "dark:border",
      "dark:border-t-0",
      "dark:border-x-0",
      "dark:border-transparent",
      "overflow-hidden"
    )

    productElement.addEventListener("click", () => {
      window.location.href = `/product.html?id=${product.Id}`
    })

    const firstImage =
      product.Images && product.Images.length > 0 ? product.Images[0].Url : ""
    productElement.innerHTML = `
        <div class="max-w-[262px] h-[250px] justify-center items-center flex overflow-hidden bg-white">
          <img
            src="${firstImage}"
            alt="${product.Name || "No image available"}"
            class="rounded-md object-contain"
          />
        </div>
        <div class="my-2 px-2 text-base line-clamp-2 max-w-[262px] w-full h-[48px]">
          ${product.Name || "Unnamed Product"}
        </div>
        <div class="text-sm mb-2 px-2 font-bold line-clamp-1 max-w-[262px] w-full">${
          parseFloat(product.Price).toFixed(2) + " zł" || "Price not available"
        }</div>
      `

    productList.appendChild(productElement)
  })

  const event = new CustomEvent("productsLoaded", { detail: { products } })
  document.dispatchEvent(event)
}
