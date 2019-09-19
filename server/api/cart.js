const router = require('express').Router()
const {Cart, CartCandy, Candy} = require('../db/models')

router.get('/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId, {
      include: [{all: true}]
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:cartId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.cartId
      }
    })
    res.json('cart destroyed')
  } catch (error) {
    next(error)
  }
})

module.exports = router
