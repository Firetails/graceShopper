const {expect} = require('chai')
const db = require('../index')
const {Cart, Candy} = require('../models')
const CartCandy = require('./cartCandy')

describe('CartCandy model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('fields', () => {
    let testCart
    let testCandy
    let test
    beforeEach(async () => {
      testCart = await Cart.create()
      testCandy = await Candy.create({name: 'testCandy', quantity: 400})
      test = await CartCandy.create({
        candyId: testCandy.id,
        cartId: testCart.id,
        amount: 2
      })
    })
    it('has an amount field of type integer', () => {
      expect(typeof test.amount === 'number').to.be.equal(true)
    })
    it('has a candyId field of type integer', () => {
      expect(test.candyId).to.be.a('number')
    })
    it('has a cartId field of type integer', () => {
      expect(test.cartId).to.be.a('number')
    })
    it('has a freezePrice field with a default value of null', () => {
      expect(test.freezePrice).to.be.equal(null)
    })
  }) //end describe fields
  describe('methods', () => {
    let testCart
    let testCandy
    let test
    beforeEach(async () => {
      testCart = await Cart.create()
      testCandy = await Candy.create({name: 'testCandy', quantity: 400})
      test = await CartCandy.create({
        candyId: testCandy.id,
        cartId: testCart.id,
        amount: 2
      })
    })
    it('increment increases the amount field integer by one', async () => {
      await test.increment('amount')
      expect(test.dataValues.amount).to.be.equal(3)
    })
    it('decrement decreases amount by one', async () => {
      await test.increment('amount')
      await test.decrement('amount')
      expect(test.dataValues.amount).to.be.equal(2)
    })
  }) //end describe methods
}) //end test block
