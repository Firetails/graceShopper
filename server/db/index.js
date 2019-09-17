const db = require('./db')
const Cart = require('./models/cart')
const CartCandy = require('./models/cartCandy')

// register models
require('./models')

CartCandy.belongsTo(Cart)
Cart.hasMany(CartCandy)

module.exports = db
