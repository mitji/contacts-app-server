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
  
  let token = req.headers['x-access-token'] || req.headers['authorization']; // express headers are auto converted to lowercase
  
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);       // Remove Bearer from string
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Invalid token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'You need an auth token'
    });
  }
};