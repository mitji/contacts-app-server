var express = require('express');
var router = express.Router();

const authRouter = require('./auth');

router.use('/auth', authRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200);
});

module.exports = router;
