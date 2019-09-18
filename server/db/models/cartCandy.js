const Sequelize = require('sequelize')
const db = require('../db')
const {Cart, Candy} = require('../models')

const CartCandy = db.define('cartCandy', {
  // BLOCKER: waiting on candy model for foreign keys -- H
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
    type: Sequelize.INTEGER
  }
})

module.exports = CartCandy
