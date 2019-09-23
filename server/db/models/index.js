const db = require('../db')
const User = require('./user')
const Cart = require('./cart')
const CartCandy = require('./cartCandy')
const Candy = require('./candy')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Candy.belongsToMany(Cart, {as: 'cart', through: CartCandy})
Cart.belongsToMany(Candy, {as: 'candy', through: CartCandy})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Candy,
  CartCandy
}
