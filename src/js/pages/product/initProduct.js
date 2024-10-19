import "../../../index.css"

import { fetchProductById } from "../../product/api/fetchProductById"
import { loadHeader } from "../../components/header"
import { loadFooter } from "../../components/footer"

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader()
  const productId = new URLSearchParams(window.location.search).get("id")
  if (productId) {
    fetchProductById(productId)
  }
  loadFooter()
})
