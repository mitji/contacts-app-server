// auth middlewares

const createError = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

// JWT validation logic
exports.validateToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  console.log('\n\n TOKEEEEN ------', token)
  try {
    if(!token) {
      return res.status(401).json('You need a token');
    }
    await jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch(err) {
      return res.status(500).json(err)
  }
};