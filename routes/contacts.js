const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const router = express.Router();

// helper functions
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
  validateToken
} = require('../helpers/middlewares');

router.get('/', isLoggedIn, validateToken, async (req, res, next) => {
  try {
    const response = await fetch('https://exercise.goldenspear.com/contacts.json');
    const apiData = await response.json();
    res.status(200).json(apiData);
  } catch (error) {
    console.log(error);
  }

})

module.exports = router;