const {expect} = require('chai')
const db = require('../index')
const Candy = require('./candy')
const Cart = require('./cart')
const cartCandy = db.model('cartCandy')

describe('Candy model', () => {
  // beforeEach(() => {
  //   return db.sync({force: true})
  // })
  describe('addToCart instance method', () => {
    let cart
    let candy
    beforeEach(async () => {
      cart = await Cart.create()
      candy = await Candy.create({name: 'testcandy', quantity: 15})
    })
    it('associates an amount of a specific candy with a specific cart', async () => {
      let test = await candy.addToCart(cart.id, 5)
      let searchResults = await cartCandy.findAll({
        where: {
          candyId: candy.id,
          cartId: cart.id
        }
      })
      expect(test.amount).to.be.equal(5)
      expect(searchResults[0].dataValues.amount).to.be.equal(5)
    })
  })
})
