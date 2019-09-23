export function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next()
  else {
    res.redirect('/home')
  }
}
