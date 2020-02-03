const jwt  = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (res, id) => {
  const token = jwt.sign({id}, process.env.TOKEN_SECRET,{expiresIn: '24h'});

  return res.cookie('token', token, { 
    expires: new Date(Date.now() + '24h'),
    secure: false,
    httpOnly: true
  })
}

module.exports = generateToken;

// this file generates a token