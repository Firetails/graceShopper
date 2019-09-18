const {expect} = require('chai')
const db = require('../index')
const Candy = require('./candy')
const Cart = require('./cart')
const cartCandy = require('./cartCandy')

describe('Candy model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('addToCart instance method', () => {
    let cart
    let candy
    beforeEach(async () => {
      cart = await Cart.create()
      candy = await Candy.create({name: 'testcandy', quantity: 15})
    })
    it('associates an amount of a specific candy with a specific cart', async () => {
      candy.addToCart(cart.id, 5)
      let search = await cartCandy.findAll({
        where: {
          cartId: cart.id,
          candyId: candy.id
        }
      })
      expect(search.amount).to.be.equal(5)
    })
  })
})
