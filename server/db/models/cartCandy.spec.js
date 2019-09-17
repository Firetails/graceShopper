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
  })
})
