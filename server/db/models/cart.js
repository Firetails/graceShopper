const Sequelize = require('sequelize')
const db = require('../db')
const {Candy, CartCandy} = require('../models')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart',
    validate: {
      isIn: [['cart', 'order', 'complete']]
    }
  }
})

Cart.prototype.remove = async candyId => {
  await CartCandy.destroy({
    where: {
      cartId: this.id,
      candyId: candyId
    }
  })
}

module.exports = Cart
