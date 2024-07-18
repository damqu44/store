import '../../../index.css'

import $ from 'jquery'
import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

document.addEventListener('DOMContentLoaded', async () => {
  loadHeader()
  loadFooter()

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/user/info',
    xhrFields: { withCredentials: true },
  })
    .done(function (response) {
      console.log(response)
    })
    .fail(function (xhr) {
      console.error('Error:', xhr.responseJSON.error)
    })

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
