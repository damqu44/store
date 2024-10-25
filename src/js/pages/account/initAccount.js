import "../../../index.css"
import "../../../css/input.css"
import "../../../css/account.css"
import "../../../css/radioInput.css"

import { handleLogout } from "../../account/logout"
import { loadUserInfo } from "../../account/userInfo"
import { setupNavigation } from "../../account/navigation"
import { checkAuth } from "../../utils/auth"

document.addEventListener("DOMContentLoaded", async () => {
  checkAuth()
  handleLogout()

  await loadUserInfo()
  setupNavigation()
})
