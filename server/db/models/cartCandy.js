const Sequelize = require('sequelize')
const db = require('../db')
const Cart = db.model('cart')

const CartCandy = db.define('cartCandy', {
  // BLOCKER: waiting on candy model for foreign keys -- H
  // candyId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Candies,
  //     key: 'id'
  //   }
  // },
  cartId: {
    type: Sequelize.INTEGER,
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
