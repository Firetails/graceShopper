const {expect} = require('chai')
const db = require('../index')
const Candy = require('./candy')
const Cart = require('./cart')

describe('Candy model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('addToCart instance method', () => {
    it('associates an amount of a specific candy with a specific cart', async () => {
      let cart = await Cart.create()
      let candy = await Candy.create({name: 'testcandy', quantity: 15})
      candy.addToCart(cart.id)
      expect(candy.cartId).to.be.equal(cart.id)
    })
  })
})
