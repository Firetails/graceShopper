const {expect} = require('chai')
const db = require('../index')
const Cart = require('./cart')

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
  }) //end describe candies field
}) //end describe cart model
