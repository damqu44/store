import "../../../index.css"
import "../../../css/input.css"
import "../../../css/account.css"
import "../../../css/radioInput.css"

import { loadHeader } from "../../components/header"
import { loadFooter } from "../../components/footer"
import { handleLogout } from "../../account/logout"
import { loadUserInfo } from "../../account/userInfo"
import { setupNavigation } from "../../account/navigation"
import { checkAuth } from "../../utils/auth"

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader()
  loadFooter()

  checkAuth()

  handleLogout()
  await loadUserInfo()

  setupNavigation()
})
