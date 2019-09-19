const {expect} = require('chai')
const db = require('../index')
const cartCandy = db.model('cartCandy')
const {Cart, Candy} = require('../models')

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
  //end describe remove method
}) //end describe cart model
