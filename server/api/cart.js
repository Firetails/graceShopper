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

router.put('/:cartId/:candyId/:amount', async (req, res, next) => {
  try {
    let updatedCC = await CartCandy.update(
      {
        amount: req.params.amount
      },
      {
        where: {
          candyId: req.params.candyId,
          cartId: req.params.cartId
        },
        returning: true,
        plain: true
      }
    )
    res.json(updatedCC)
  } catch (error) {
    next(error)
  }
})

module.exports = router
