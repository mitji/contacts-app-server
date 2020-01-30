// middlewares to use in auth route to check if user is logged in,
// not logged in or if it has introduced something, to check if
// the input is correct before trying to signup/login/logout

const createError = require('http-errors');

// if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if(req.session.currentUser) next();
  else next(createError(401));
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
}

// if you're actually receiving something from the body
// then continue to next function
exports.validationLoggin = (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) next(createError(400));
  else next();
};