import { displayCookies } from './handleAddToCart'

export function handleRemoveFromCart(productId) {
  fetch(`http://localhost:3000/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
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
      const cartItem = document.getElementById(`cart-item-${productId}`)
      if (cartItem) {
        cartItem.remove()
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
