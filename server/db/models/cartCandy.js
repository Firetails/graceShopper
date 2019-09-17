const Sequelize = require('sequelize')
const db = require('../db')

const CartCandy = db.define('cartCandy', {
  amount: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartCandy
