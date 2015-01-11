// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');

// configuration ===========================================
    
//config files
var db = require('./config/db');

//set port
var port = process.env.PORT || 8080; 

//connect to mongoDB database
mongoose.connect(db.url); 

//get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); 

//set the static files location
app.use(express.static(__dirname + '/public')); 

//rest api routes
require('./app/routes')(app);

// start app
// startup app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;
