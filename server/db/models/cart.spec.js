const {expect} = require('chai')
const db = require('../index')
const {Cart, Candy, CartCandy} = require('../models')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('status field', () => {
    let cart1
    beforeEach(async () => {
      cart1 = await Cart.create()
    })
    it('is of type string', () => {
      expect(typeof cart1.status).to.be.equal('string')
    })
    it('has a default value of cart', () => {
      expect(cart1.status).to.be.equal('cart')
    })
  }) //end describe status field
  describe('remove method', () => {
    let testCart
    let testCandy
    let testCandy2
    beforeEach(async () => {
      testCart = await Cart.create()
      testCandy = await Candy.create({name: 'testCandy', quantity: 400})
      testCandy2 = await Candy.create({name: 'testCandy2', quantity: 50})
      await CartCandy.create({
        candyId: testCandy.id,
        cartId: testCart.id,
        amount: 15
      })
      await CartCandy.create({
        candyId: testCandy2.id,
        cartId: testCart.id,
        amount: 5
      })
    })
    it('has a remove method that destroys all CartCandy instances of a given candy associated with a cart instance', async () => {
      let search = await CartCandy.findAll({
        where: {
          cartId: testCart.id
        }
      })
      expect(search.length).to.be.equal(1)
    })
  }) //end describe remove method
}) //end describe cart model
