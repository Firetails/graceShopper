export const priceConverter = priceInPennies => {
  const price = priceInPennies / 100
  return price.toFixed(2)
}

export const calculateTotal = products => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    total += priceConverter(products[i].price) * products[i].cartCandy.amount
  }
  return total
}

const max = 99999999
export const orderNumberGenerator = () => {
  return Math.floor(Math.random() * Math.floor(max))
}
