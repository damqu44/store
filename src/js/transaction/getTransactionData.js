import { getProducts } from './api/getProducts'
import { getTransaction } from './api/getTransaction'

export default async function getTransactionData() {
  const addressDeliveryId = getAddressDeliveryId()
  let invoiceData = null
  const products = await getProductsList()
  const deliveryMethodId = getDeliveryMethod()
  const paymentMethod = getPaymentMethod()
  const comment = getComment()
  const discount = getDiscount()

  const isInvoiceChecked = document.getElementById(
    'is-invoice-checkbox'
  ).checked
  if (isInvoiceChecked) {
    invoiceData = getInvoiceData()
  }

  const transactionData = {
    addressDeliveryId: parseInt(addressDeliveryId),
    invoiceData: invoiceData,
    products: products,
    deliveryMethodId: parseInt(deliveryMethodId),
    paymentMethod: paymentMethod,
    comment: comment,
    discount: discount,
  }

  await validateData()

  async function validateData() {
    if (
      !addressDeliveryId ||
      !products ||
      products.length < 1 ||
      !deliveryMethodId ||
      !paymentMethod
    ) {
      document.getElementById('error-response-cart-summary').innerHTML =
        'Wprowadź brakujące dane potrzebne do realizacji zamówienia'
      return
    } else {
      document.getElementById('error-response-cart-summary').innerHTML = ''
      await getTransaction(transactionData)
      location.href = '/orders.html'
    }
  }
}

function getDiscount() {
  const discount = document.getElementById('transaction-discount')

  if (discount.innerHTML) {
    return discount.innerHTML
  } else {
    return null
  }
}
function getComment() {
  const comment = document.getElementById('transaction-comment')

  if (comment.innerHTML) {
    return comment.innerHTML
  } else {
    return null
  }
}

function getPaymentMethod() {
  document.getElementById('error-response-payment-method').innerHTML = ''
  const selectedMethod = localStorage.getItem('selectedPaymentMethod')
  if (selectedMethod) {
    return selectedMethod
  } else {
    document.getElementById('error-response-payment-method').innerHTML =
      'Wybierz metodę płatności'
    return null
  }
}

function getDeliveryMethod() {
  const deliveryMethods = document.getElementById('delivery-methods')

  const checkedRadio = deliveryMethods.querySelector(
    'input[type="radio"]:checked'
  )

  if (checkedRadio) {
    document.getElementById('error-response-delivery-method').innerHTML = ''
    const label = deliveryMethods.querySelector(
      `.clickable-label[data-for="${checkedRadio.id}"]`
    )

    if (label) {
      const radioId = label.getAttribute('data-for')
      const radioButton = document.getElementById(radioId)

      if (radioButton.value) {
        return radioButton.value
      } else return null
    }
  } else {
    document.getElementById('error-response-delivery-method').innerHTML =
      'Wybierz sposób dostawy'
  }
}

async function getProductsList() {
  const productDataString = sessionStorage.getItem('cartProducts')
  const productData = productDataString ? JSON.parse(productDataString) : []

  if (productData.length > 0) {
    try {
      const verifiedData = await getProducts(productData)

      const productsList = verifiedData.map((product) => ({
        id: product.Id,
        Amount: product.RequestedAmount,
      }))

      return productsList
    } catch (error) {
      console.error(error)
    }
  }
}

function getInvoiceData() {
  const InvoiceErrorField = document.getElementById('error-response-invoice')

  const invoiceFullName = document.getElementById(
    'invoice-full-name-set'
  ).innerHTML
  const invoiceStreet = document.getElementById('invoice-street-set').innerHTML
  const invoiceCity = document.getElementById('invoice-post-set').innerHTML
  const invoiceTelephone = document.getElementById(
    'invoice-telephone-set'
  ).innerHTML
  const invoiceNip = document
    .getElementById('invoice-nip-set')
    .innerHTML.match(/\d+/g)

  const invoiceData = {
    fullName: invoiceFullName,
    street: invoiceStreet,
    city: invoiceCity,
    telephone: invoiceTelephone,
    nip: invoiceNip ? invoiceNip.join('') : '',
  }

  if (!invoiceFullName) {
    InvoiceErrorField.innerHTML = 'Uzupełnij wymagane dane (*)'
    InvoiceErrorField.classList.remove('hidden')
    return null
  } else {
    InvoiceErrorField.classList.add('hidden')
    return invoiceData
  }
}

function getAddressDeliveryId() {
  const deliveryAddressId = document.getElementById(
    'selected-delivery-address-field'
  ).dataset.id

  const addressDeliveryErrorField = document.getElementById(
    'error-response-address-delivery'
  )

  if (!deliveryAddressId) {
    addressDeliveryErrorField.innerHTML = 'Wybierz adres odbiory przesyłki'
    addressDeliveryErrorField.classList.remove('hidden')
    return null
  } else {
    addressDeliveryErrorField.innerHTML = ''
    addressDeliveryErrorField.classList.add('hidden')
    return deliveryAddressId
  }
}
