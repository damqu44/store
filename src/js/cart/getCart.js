export async function getCart() {
  try {
    const response = await fetch('http://localhost:3000/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch cart data')
    }

    const data = await response.json()
    return data.message || []
  } catch (error) {
    console.error('Error fetching cart data:', error)
    return []
  }
}
