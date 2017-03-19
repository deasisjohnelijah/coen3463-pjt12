var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var flash = require('connect-flash');

const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');
const router = express.Router();

var index = require('./routes/index');
var auth = require('./routes/auth');
var items = require('./routes/items');


var MongoURI = 'mongodb://elijahdeasis:elijahdeasis30@ds111469.mlab.com:11469/coen3463-t12'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 'This is a secret',

  cookie: {

    maxAge: 1000 * 60 * 60

  },



  resave: true,

  saveUninitialized: true
        

}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
var Item = require('./models/items');
var FACEBOOK_APP_ID = '1846634275597047';
var FACEBOOK_APP_SECRET = '45304e1d1d08f19c702cc9cc3aa432f9';
var fbOpts = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://coen3463pjt12.herokuapp.com/auth/facebook/callback"
  };
var fbCallback = function(accessToken, refreshToken, profile, cb){

};

passport.use(new FacebookStrategy(fbOpts, fbCallback));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(MongoURI, function(err, res) {
    if (err) {
        console.log('Error connecting to ' + MongoURI);
    } else {
        console.log('MongoDB connected!');
    }
});

app.use(flash());
restify.serve(router, Item);
app.use(router);

app.use('/', index);
app.use('/auth/', auth);
app.use('/items/', items);

app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req,res) {
    res.redirect('/');
  });

app.get('/search', function(req, res){

  res.render('search');

});
// app.get('/home', function(req, res) {
//   res.render('home');
// });
// app.get('/about', function(req, res) {
//   res.render('about');
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
