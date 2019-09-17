const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

describe('Cart routes', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  await Cart.create({
    candies: [1, 2, 3]
  })
  describe('GET /api/cart/:cartId', () => {
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
