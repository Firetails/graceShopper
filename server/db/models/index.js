const Sequelize = require('sequelize')
const User = require('./user')
const Cart = require('./cart')
const CartCandies = require('./cartCandy')
const Candy = require('./candy')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Candy.belongsToMany(Cart, {as: 'cart', through: CartCandies})
Cart.belongsToMany(Candy, {as: 'candy', through: CartCandies})
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
  CartCandies
}
