import { updateProductValue } from './initializeCart'
import { updateCartCount } from '../components/header'
import { emptyCart } from '../pages/cart/initCart'
export function handleRemoveFromCart(productId, cartType) {
  fetch(`http://localhost:3000/cart/${cartType}/${productId}`, {
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
      updateCartCount(data.cartData)
      const cartItem = document.getElementById(`cart-item-${productId}`)
      if (cartItem) {
        cartItem.remove()
      }

      if (data.cartData.length < 1) {
        emptyCart()
      }

      updateProductValue()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
