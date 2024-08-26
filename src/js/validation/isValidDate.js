export default function isValidDate(day, month, year) {
  const today = new Date()
  const currentYear = today.getFullYear()

  const d = parseInt(day, 10)
  const m = parseInt(month, 10)
  const y = parseInt(year, 10)

  if (isNaN(d) || isNaN(m) || isNaN(y)) {
    return 'Wszystkie pola muszą być liczbami'
  }

  if (y < 1901) {
    return 'Data, którą wprowadziłeś/łaś jest niepoprawna, spróbuj ponownie'
  }

  if (y > currentYear - 16) {
    return 'Klient znajduje się poniżej limitu wieku, musi mieć minimum 16 lat'
  }

  if (m < 1 || m > 12) {
    return 'Data, którą wprowadziłeś/łaś jest niepoprawna, spróbuj ponownie'
  }

  const daysInMonth = new Date(y, m, 0).getDate()
  if (d < 1 || d > daysInMonth) {
    return 'Data, którą wprowadziłeś/łaś jest niepoprawna, spróbuj ponownie'
  }

  return 'valid'
}
