export function authGuard() {
  // eslint-disable-next-line func-names
  return function (req, res, next) {
    if (req.session.user) {
      return next();
    }
    return res.redirect('/auth');
  };
}
