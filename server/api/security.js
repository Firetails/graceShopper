const db = require('../db/db')
const User = db.model('user')
async function isAdmin(req, res, next) {
  if (req.session.passport) {
    const user = await User.findByPk(req.session.passport.user)
    if (user.isAdmin) return next()
  } else {
    res.redirect('/home')
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated) {
    res(next)
  } else {
    res.redirect('/')
  }
}

module.exports = {
  isAdmin,
  isLoggedIn
}
