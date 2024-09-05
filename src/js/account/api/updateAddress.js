export async function updateAddress(addressId, addressData) {
  const response = await fetch(
    'http://localhost:3000/user/editaddressdelivery',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        addressId: addressId,
        ...addressData,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
