const router = require('express').Router()

router.use('/candies', require('./candies'))
router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
// router.use('/cartCandy', require('./cartCandy'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
