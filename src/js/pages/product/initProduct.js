import "../../../index.css"

import { fetchProductById } from "../../product/api/fetchProductById"
document.addEventListener("DOMContentLoaded", async () => {
  const productId = new URLSearchParams(window.location.search).get("id")
  if (productId) {
    fetchProductById(productId)
  }
})
