const Sequelize = require('sequelize')
const db = require('../db')
const orderNumberGenerator = require('../../../public/utilities')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart',
    validate: {
      isIn: [['order', 'complete']]
    }
  },
  orderNumber: {
    type: Sequelize.INTEGER
  }
})

Cart.beforeCreate(cartInstance => {
  const max = 99999999
  cartInstance.orderNumber = Math.floor(Math.random() * Math.floor(max))
})

module.exports = Cart
