var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CPExpress Deals', user: req.user });
});

router.get('/profile', function(req, res) {
  res.render('profile', { title: 'CPExpress Deals', user: req.user });
});


module.exports = router;
