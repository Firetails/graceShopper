const Sequelize = require('sequelize')
const db = require('../db')
const CartCandy = require('../models/cartCandy')

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://tfkru2exl1c11xfih48h8lmg6y-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/image-coming-soon.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  ingredients: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

Candy.prototype.addToCart = function(cartId, amount) {
  return CartCandy.create({
    candyId: this.id,
    cartId: cartId,
    amount: amount
  })
}

module.exports = Candy
