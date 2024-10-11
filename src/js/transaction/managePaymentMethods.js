const activeClasses = ['border-2', 'border-primary', 'hover:border-primary']

export default function managePaymentMethods() {
  const paymentMethods = document.querySelectorAll('.payment-method')

  paymentMethods.forEach((method) => {
    method.addEventListener('click', function () {
      paymentMethods.forEach((m) => {
        activeClasses.forEach((cls) => m.classList.remove(cls))
      })

      activeClasses.forEach((cls) => this.classList.add(cls))
      localStorage.setItem('selectedPaymentMethod', this.id)
    })
  })

  const selectedMethod = localStorage.getItem('selectedPaymentMethod')
  if (selectedMethod) {
    const selectedElement = document.getElementById(selectedMethod)
    if (selectedElement) {
      activeClasses.forEach((cls) => selectedElement.classList.add(cls))
    }
  }
}
