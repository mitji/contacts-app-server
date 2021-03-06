const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userModel');

// helper functions
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

//  POST    '/signup'
router.post( '/signup', isNotLoggedIn, validationLoggin, async (req, res, next) => {
    const { email, password, rememberMe } = req.body;
    try {
      const userExists = await User.findOne({ email }, 'email');

      if (userExists) return next(createError(400));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);                          // create salt
        const hashPass = bcrypt.hashSync(password, salt);                     // encrypt password
        const newUser = await User.create({ email, password: hashPass });     // create user
        // if user wants the session to be kept
        if(rememberMe) {
          req.session.currentUser = newUser;
        }

        let token = jwt.sign({email: email}, process.env.TOKEN_SECRET,{ expiresIn: '24h'});
        res.status(200).json({newUser, token});
      }
    } catch (error) {
      next(error);
    }
  },
);

//  POST '/login'
router.post( '/login', isNotLoggedIn, validationLoggin, async (req, res, next) => {
    const { email, password, rememberMe} = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        // if user wants the session to be kept
        if(rememberMe) {
          req.session.currentUser = user;
        }
        let token = jwt.sign({email: email}, process.env.TOKEN_SECRET,{ expiresIn: '24h'});
        res.status(200).json({user, token});
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  },
);

//  POST '/logout'
router.post('/logout', isLoggedIn, (req, res, next) => {
  
  const { email } = req.session.currentUser;
  req.session.destroy();
  res
    .status(200) //  No Content
    .json({ message: `User with '${email}' logged out - session destroyed` });
  return;
});

//  GET '/private' --> returns user
router.get('/private', isLoggedIn, (req, res, next) => {
    res.status(200).json(req.session.currentUser);
});

module.exports = router;
