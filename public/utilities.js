export const priceConverter = priceInPennies => {
  return priceInPennies / 100
}

export const calculateTotal = products => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    // console.log("product price:" ,proprice);
    total += priceConverter(products[i].price) * products[i].cartCandy.amount
  }
  return total
}
