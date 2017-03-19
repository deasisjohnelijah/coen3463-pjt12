var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username, email:req.body.email,contact:req.body.contact, school:req.body.school, facebook:req.body.facebook,first_name:req.body.first_name,last_name:req.body.last_name}),req.body.password, function(err, account) {
      if(err) {
        console.log(err)
        return res.render('register', {error: err, account: account});
      }

      req.login(account, function(err) {
        res.redirect('/auth/login');
      });
  })

router.get('/', function(req, res, next) {
  res.redirect('auth/login');
});
    })

router.get('/login',
  function(req, res){
    res.render('login', {user: req.user});
  });

router.get('/login/facebook',
  passport.authenticate('facebook', {scope: 'email'}));

router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/');
  });
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login-' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/profile', function(req, res, next) {
  res.render('profile', {user: req.user});
});



router.get('/login-', function(req, res, next) {
  res.render('login-', {user: req.user});
});



router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/auth/login');
});


module.exports = router;