const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const router = express.Router();

// helper functions
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/', isLoggedIn, (req, res, next) => {
  const token = req.query.token;

  jwt.verify(token, 'supersecret', async (err, decoded) => {
    if(!err){
      try {
        const response = await fetch('https://exercise.goldenspear.com/contacts.json');
        const apiData = await response.json();
        res.status(200).json(apiData);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send({error: err});
    }
  })
})

module.exports = router;