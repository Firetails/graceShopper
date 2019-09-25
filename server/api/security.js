const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.redirect('/home')
  } else {
    return next()
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
