var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

// router.route('/register')
//   .get(function(req, res, next) {
//     res.render('register', {});
//   })
//   .post(function(req, res, next) {
//     User.register(new User({username: req.body.username, email:req.body.email}),req.body.password, function(err, account) {
//       if(err) {
//         console.log(err)
//         return res.render('register', {error: err, account: account});
//       }

//       req.login(account, function(err) {
//         res.redirect('/auth/login');
//       });
//   })
router.get('/', function(req, res, next) {
  res.redirect('auth/login');
});//     })

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});

router.get('/profile', function(req, res, next) {
  res.render('profile', {user: req.user});
});

router.get('/login/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req,res) {
    res.redirect('/');
  });

router.get('/login-', function(req, res, next) {
  res.render('login-', {user: req.user});
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login-' }),
  function(req, res) {
    res.redirect('/');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/auth/login');
});


module.exports = router;