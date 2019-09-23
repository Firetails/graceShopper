export function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next()
  else {
    res.redirect('/home')
  }
}

export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated) {
    res(next)
  } else {
    res.redirect('/')
  }
}
