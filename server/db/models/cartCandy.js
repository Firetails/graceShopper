const Sequelize = require('sequelize')
const db = require('../db')
const {Cart, Candy} = require('../models')

const CartCandy = db.define('cartCandy', {
  candyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Candy,
      key: 'id'
    }
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  freezePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = CartCandy
