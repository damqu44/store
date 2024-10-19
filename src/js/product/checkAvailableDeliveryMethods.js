export default function checkAvailableDeliveryMethods(deliveryMethods) {
  const deliveryMethodIds = deliveryMethods.map((dm) => dm.Id)

  const isStandardDelivery = deliveryMethodIds.some((id) =>
    [6, 7, 3].includes(id)
  )
  const isParcelLockerDelivery = deliveryMethodIds.some((id) =>
    [4, 1].includes(id)
  )

  const standardDelivery = document.getElementById("standard-delivery")
  const pickupPointDelivery = document.getElementById("pickup-point-delivery")

  if (isStandardDelivery) {
    const standardDeliveryMappings = [
      { id: 6, elementId: "inpost-delivery" },
      { id: 7, elementId: "dpd-delivery" },
      { id: 2, elementId: "dpd-express-delivery" },
    ]

    standardDeliveryMappings.forEach(({ id, elementId }) =>
      toggleVisibility(elementId, deliveryMethodIds.includes(id))
    )

    standardDelivery.classList.remove("hidden")
  } else {
    standardDelivery.classList.add("hidden")
  }

  if (isParcelLockerDelivery) {
    const parcelLockerDeliveryMappings = [
      { id: 4, elementId: "parcel-locker-delivery" },
      { id: 1, elementId: "pickup-delivery" },
    ]

    parcelLockerDeliveryMappings.forEach(({ id, elementId }) =>
      toggleVisibility(elementId, deliveryMethodIds.includes(id))
    )

    pickupPointDelivery.classList.remove("hidden")
  } else {
    pickupPointDelivery.classList.add("hidden")
  }
}

function toggleVisibility(elementId, condition) {
  const element = document.getElementById(elementId)
  if (element) {
    if (condition) {
      element.classList.remove("hidden")
    } else {
      element.classList.add("hidden")
    }
  }
}
