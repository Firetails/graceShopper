const Sequelize = require('sequelize')
const Cart = require('../models/cart')
const db = require('../db')

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
    type: Sequelize.DECIMAL
  }
})

Candy.prototype.addToCart = async function(cartId) {
  this.addCart(cartId)
  const cart = await Cart.findByPk(cartId)
  cart.addCandy(this.id)
}

module.exports = Candy
