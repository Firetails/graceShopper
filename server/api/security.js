function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) return next()
  else {
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
