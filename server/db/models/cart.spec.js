const {expect} = require('chai')
const db = require('../index')
const Cart = require('./cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('candies field', () => {
    let cart1
    beforeEach(async () => {
      cart1 = await Cart.create()
    })
    it('has a candies field of type array', () => {
      expect(Array.isArray(cart1.candies)).to.be.equal(true)
    })
    it('is an empty array if no candies are sent to the instance', () => {
      expect(cart1.candies.length).to.be.equal(0)
    })
  }) //end describe candies field

  describe('remove candy', () => {
    let cart2
    beforeEach(async () => {
      cart2 = await Cart.create({candies: [1, 2, 3]})
    })
    it('removes all of a type of candy from the candies array and returns the removed candy', () => {
      expect(cart2.remove(1)).to.deep.equal(1)
      cart2.remove(1)
      expect(cart2.candies).to.deep.equal([2, 3])
    })
  }) //end describe remove method
}) //end describe cart model
