const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

// describe('Cart routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })
//   describe('GET /api/cart/:cartId', () => {
//     beforeEach(async () => {
//       await Cart.create({candies: [1, 2, 3]})
//     })

//     it('responds with a cart based on id', async () => {
//       const res = await request(app).get('api/cart/1')

//       expect(res.body).to.be.an('array')
//     })
//   })
// })
