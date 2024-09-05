export async function updatePrimaryAddress(address) {
  const response = await fetch(
    'http://localhost:3000/user/editprimaryaddressdelivery',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ addressDeliveryId: address.Id }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
