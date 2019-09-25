const priceConverter = priceInPennies => {
  const price = priceInPennies / 100
  return price.toFixed(2)
}

const calculateTotal = products => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    total += products[i].candy.price * products[i].amount
  }
  return priceConverter(total)
}

const max = 99999999

const orderNumberGenerator = () => {
  return Math.floor(Math.random() * Math.floor(max))
}

module.exports = {
  priceConverter,
  calculateTotal,
  orderNumberGenerator
}
