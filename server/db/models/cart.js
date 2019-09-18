const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  candies: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

Cart.prototype.remove = function(candy) {
  this.candies = this.candies.filter(el => el !== candy)
  return candy
}

module.exports = Cart
