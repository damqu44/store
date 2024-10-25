import "./index.css"
import { loadFooter } from "./js/components/footer"
import { loadHeader } from "./js/components/header"

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader()
  loadFooter()
})
