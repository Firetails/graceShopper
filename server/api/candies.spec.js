/* eslint-disable no-unused-expressions */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Candy = db.model('candy')
const Cart = db.model('cart')
const CartCandy = db.model('cartCandy')

describe('Candies routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/candies` URI', () => {
    it('GET responds with an empty array at first', async () => {
      const res = await request(app)
        .get('/api/candies')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.deep.equal([])
    })

    it('GET responds with a candy after one has been added', async () => {
      let newCandy = await Candy.create({
        name: 'someJCandy',
        imageUrl:
          'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
      })
      const res = await request(app)
        .get('/api/candies')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.deep.equal(newCandy.name)
    })

    it('GET responds with a candies after multiple candies has been added', async () => {
      let newCandy = await Candy.create({
        name: 'someJCandy',
        imageUrl:
          'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
      })
      let otherCandy = await Candy.create({
        name: 'someOtherCandy',
        imageUrl:
          'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
      })
      const res = await request(app)
        .get('/api/candies')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.deep.equal(newCandy.name)
      expect(res.body[1].name).to.deep.equal(otherCandy.name)
    })
  })

  describe('POST', () => {
    xit('POST created a new instance of Cart Candy ( the joint table)', async () => {
      let newCandy = await Candy.create({
        name: 'someJCandy',
        imageUrl:
          'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
      })
      let newCart = await Cart.create()
      const res = await request(app)
        .post(`/api/candies/${newCandy.id}/${newCart.id}/5`)
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.amount).to.equal(5)
      let cartCandyInstance = await CartCandy.findAll({
        where: {
          candyId: res.body.candyId,
          cartId: res.body.cartId
        }
      })
      expect(cartCandyInstance[0].amount).to.equal(5)
      expect(cartCandyInstance[0].candyId).to.equal(newCandy.id)
      expect(cartCandyInstance[0].cartId).to.equal(newCart.id)
    })
  })
})

describe('`/candies/:id`', () => {
  it('GET responds with a selected single candy', async () => {
    const id = 1
    let newCandy = await Candy.create({
      name: 'someJCandy',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    })
    const res = await request(app)
      .get(`/api/candies/${id}`)
      .expect(200)
    expect(res.body).to.be.an('object')
    expect(res.body.name).to.equal(newCandy.name)
  })
})

it('does not respond with selected candy if it does not exist', async () => {
  const id = 10
  const res = await request(app)
    .get(`/api/candies/${id}`)
    .expect(404)
})
