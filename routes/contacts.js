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

// router.get('/', (req, res, next) => {
//   // call the api
//   fetch('https://exercise.goldenspear.com/contacts.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     res.status(200).json(data);
//   })
//   .catch(err => console.log(err))
// })

router.get('/', isLoggedIn, /* async */ (req, res, next) => {
  const token = req.query.token;

  jwt.verify(token, 'supersecret', (err, decoded) => {
    if(!err){
      fetch('https://exercise.goldenspear.com/contacts.json')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          res.status(200).json(data);
        })
        .catch(err => console.log(err))
    } else {
      res.send({error: err});
    }
  })
})


module.exports = router;