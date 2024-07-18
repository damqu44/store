export function handleAddToCart(product, isUpdate) {
  fetch('http://localhost:3000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...product, isUpdate }),
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response Error')
      }
      return response.json()
    })
    .then((data) => {
      console.log('Success:', data)
      displayCookies()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export function displayCookies() {
  const cookies = document.cookie
  console.log('Cookies:', cookies)

  const cartCookie = cookies.split('; ').find((row) => row.startsWith('cart='))
  if (cartCookie) {
    const cartData = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]))
    console.log('Cart Data:', cartData)
  } else {
    console.log('Cart cookie not found.')
  }
}
