export default function validatePassword(password, confirmPassword) {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (!passwordPattern.test(password)) {
    return 'Min. 8 znaków • wielka litera • mała litera • cyfra'
  }

  return 'valid'
}
