export default function validateEmail(email) {
  if (email.trim() === '') {
    return 'Wpisz adres e-mail'
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return 'Niepoprawny adres e-mail'
    }
    return 'valid'
  }
}
