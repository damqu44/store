export async function getUserAddresses() {
  try {
    const response = await fetch('http://localhost:3000/user/getaddresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to connect')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user info:', error)
    return {}
  }
}
