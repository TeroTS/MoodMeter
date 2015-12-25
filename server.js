// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport 	   = require('passport');
var flash    	   = require('connect-flash');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');

// configuration ===========================================

//config files
var db = require('./config/db');

//set port
var port = process.env.PORT || 8089;

//connect to mongoDB database
mongoose.connect(db.url);

// read cookies (needed for auth)
app.use(cookieParser());
//get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set the static files location
app.use(express.static(__dirname + '/public'));

//pass passport for configuration
require('./config/passport')(passport);

//required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes ======================================================================
//load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

// start app
// startup app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
