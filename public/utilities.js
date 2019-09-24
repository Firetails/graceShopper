export const priceConverter = priceInPennies => {
  return priceInPennies / 100
}

export const calculateTotal = products => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    total += products[i].candy.price * products[i].amount
  }
  return priceConverter(total)
}

const max = 99999999
export const orderNumberGenerator = () => {
  return Math.floor(Math.random() * Math.floor(max))
}
