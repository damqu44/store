import { updateCartCount } from '../components/header'

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
      updateCartCount(data.cartData)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
