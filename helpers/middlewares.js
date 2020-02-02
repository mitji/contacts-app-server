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
exports.validateToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};