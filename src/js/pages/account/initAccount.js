import '../../../index.css'
import '../../../css/input.css'
import '../../../css/account.css'
import '../../../css/radioInput.css'

import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'
import { handleLogout } from '../../account/logout'
import { loadUserInfo } from '../../account/userInfo'
import { setupNavigation } from '../../account/navigation'
import { isAuthenticated } from '../../utils/auth'

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeader()
  loadFooter()

  if (!isAuthenticated()) {
    window.location.href = '/login.html'
  }

  handleLogout()
  await loadUserInfo()

  setupNavigation()

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
