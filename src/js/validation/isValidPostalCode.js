export function isValidPostalCode(postalCode) {
  const postalCodePattern = /^\d{2}-\d{3}$/
  return postalCodePattern.test(postalCode)
}
