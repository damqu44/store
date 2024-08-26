export function setupNavigation() {
  function setActive(elementId) {
    document.getElementById('personal-data-btn').classList.remove('font-bold')
    document.getElementById('address-book-btn').classList.remove('font-bold')
    document.getElementById(elementId).classList.add('font-bold')

    if (elementId === 'personal-data-btn') {
      document.getElementById('personal-data').classList.remove('hidden')
      document.getElementById('address-book').classList.add('hidden')
    } else if (elementId === 'address-book-btn') {
      document.getElementById('address-book').classList.remove('hidden')
      document.getElementById('personal-data').classList.add('hidden')
    }
  }

  document
    .getElementById('personal-data-btn')
    .addEventListener('click', function () {
      setActive('personal-data-btn')
    })

  document
    .getElementById('address-book-btn')
    .addEventListener('click', function () {
      setActive('address-book-btn')
    })
}
