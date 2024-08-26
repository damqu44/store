export default function isValidName(name) {
  const namePattern = /^[A-Za-z][A-Za-z\s'’-]*$/
  const minLength = 1
  const maxLength = 50

  return (
    name.length >= minLength &&
    name.length <= maxLength &&
    namePattern.test(name)
  )
}
