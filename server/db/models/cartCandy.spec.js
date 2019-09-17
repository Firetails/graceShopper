const {expect} = require('chai')
const db = require('../index')
const CartCandy = require('./cartCandy')

describe('CartCandy model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('amount field', () => {
    let test
    beforeEach(async () => {
      test = await CartCandy.create({amount: 2})
    })

    it('has an amount field of type integer', () => {
      expect(typeof test.amount === 'number').to.be.equal(true)
    })
  }) //end describe amount field
  describe('candyId field', () => {
    let test2
    beforeEach(async () => {
      test2 = await CartCandy.create({candyId: 1, cartId: 1, amount: 2})

      it('has a candyId field of type integer', () => {
        expect(typeof test2.candyId).to.be.a('number')
      })
    })
  })
})
