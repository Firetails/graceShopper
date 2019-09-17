const chai = require('chai')
const db = require('../db')
const app = require('../index')
const request = require('supertest')
const Candy = db.model('Candy')

// chai.use(chaiHttp);
// chai.should();
const expect = chai.expect
describe('Candy model', () => {
  beforeEach(() => {
    return db.sync({force: true})
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
      expect(res.body.name).to.equal('someJCandy')
    })
  })

  it('does not respond with selected candy if it does not exist', async () => {
    const id = 10
    const res = await request(app)
      .get(`/api/candies/${id}`)
      .expect(404)
  })
})
