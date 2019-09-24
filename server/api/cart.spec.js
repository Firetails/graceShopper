const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const Candy = db.model('candy')
const CartCandy = db.model('cartCandy')

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
      await testCandy2.addToCart(testCart.id, 5)
      await testCandy.addToCart(testCart.id, 17)
    })
    it('responds with a cart based on id', async () => {
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)
      expect(res.body.id).to.be.equal(1)
    })
  }) //end describe GET route
  describe('DELETE /api/cart/:cartId', () => {
    xit('destroys a cart based on cartId', async () => {
      const res = await request(app)
        .delete('/api/cart/1')
        .expect(200)
      expect(res.body).to.be.equal('cart destroyed')
    })
  })
  describe('PUT', () => {
    it('PUT updates an existing cart candy instance', async () => {
      let newCandy = await Candy.create({
        name: 'someJCandy',
        imageUrl:
          'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
      })
      let newCart = await Cart.create()
      await newCandy.addToCart(newCart.id, 7)
      await request(app)
        .put(`/api/cart/${newCart.id}/${newCandy.id}/4`)
        .expect(200)
      let cartCandyInstance = await CartCandy.findAll({
        where: {
          candyId: newCandy.id,
          cartId: newCart.id
        }
      })
      expect(cartCandyInstance[0].amount).to.equal(4)
      expect(cartCandyInstance[0].candyId).to.equal(newCandy.id)
      expect(cartCandyInstance[0].cartId).to.equal(newCart.id)
    })
  })

  describe('DELETE', () => {
    it('Delete an existing cart candy instance', async () => {
      let newCandy = await Candy.create({
        name: 'someJCandy',
        imageUrl:
          'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
      })
      let newCart = await Cart.create()
      await newCandy.addToCart(newCart.id, 7)
      await request(app)
        .delete(`/api/cart/${newCart.id}/${newCandy.id}`)
        .expect(200)
      let cartCandyInstance = await CartCandy.findAll({
        where: {
          candyId: newCandy.id,
          cartId: newCart.id
        }
      })
      expect(cartCandyInstance.length).to.equal(0)
    })
  })
})
