const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const Candy = db.model('candy')

describe('Cart routes', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('GET /api/cart/:cartId', () => {
    let testCart
    let testCandy
    let testCandy2
    beforeEach(async () => {
      testCart = await Cart.create()
      testCandy = await Candy.create({name: 'testCandy', quantity: 400})
      testCandy2 = await Candy.create({name: 'testCandy2', quantity: 300})
      testCandy2.addToCart(testCart.id, 5)
      testCandy.addToCart(testCart.id, 17)
    })
    it('responds with a cart based on id', async () => {
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)
      expect(res.body.id).to.be.equal(1)
    })
  }) //end describe GET route
  describe('DELETE /api/cart/:cartId', () => {
    it('destroys a cart based on cartId', async () => {
      const res = await request(app)
        .delete('/api/cart/1')
        .expect(200)
      expect(res.body).to.be.equal('cart destroyed')
    })
  })
})
