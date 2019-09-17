const router = require('express').Router()
const SingleCandy = require('../db/models/Candy')

router.get('/:id', async (req, res, next) => {
  try {
    console.log('HELLO I AM HERE ----------')
    const selectedCandy = await SingleCandy.findByPk(req.params.id)
    if (selectedCandy) {
      res.json(selectedCandy)
    } else {
      res.status(404).send('Candy not found')
    }
  } catch (error) {
    console.log('hello')
    next(error)
  }
})

module.exports = router
