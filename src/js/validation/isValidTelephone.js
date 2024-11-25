export default function validateTelephone(telephone) {
  if (telephone.trim() === "") {
    return "Wpisz numer telefonu komórkowego"
  }

  const phonePattern = /^\d{9}$/
  if (!phonePattern.test(telephone)) {
    return "Numer telefonu musi zawierać 9 liczb"
  }

  return "valid"
}
