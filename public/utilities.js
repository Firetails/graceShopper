export const priceConverter = priceInPennies => {
  return priceInPennies / 100
}

const max = 99999999
export const orderNumberGenerator = () => {
  return Math.floor(Math.random() * Math.floor(max))
}
