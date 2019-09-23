const router = require('express').Router()
const passport = require('passport')

router.use('/candies', require('./candies'))
router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
// router.use('/cartCandy', require('./cartCandy'))

router.get('/users', passport.authenticate('basic', {session: false}), function(
  req,
  res
) {
  res.json(req.user)
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
