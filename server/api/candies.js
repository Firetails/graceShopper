const router = require('express').Router()
const Candy = require('../db/models/candy')

router.get('/', async (req, res, next) => {
  try {
    const result = await Candy.findAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.get('/:candyId', async (req, res, next) => {
  try {
    const selectedCandy = await Candy.findByPk(req.params.candyId)
    if (selectedCandy) {
      res.json(selectedCandy)
    } else {
      res.status(404).send('Candy not found')
    }
  } catch (error) {
    next(error)
  }
})
//HELEN: TEST THIS!!
router.post('/:candyId/:cartId?amount=:amount', async (req, res, next) => {
  try {
    const selectedCandy = await Candy.findByPk(req.params.id)
    const newCartCandy = await selectedCandy.addToCart(
      req.params.cartId,
      req.query.amount
    )
    res.json(newCartCandy)
  } catch (error) {
    next(error)
  }
})

module.exports = router
