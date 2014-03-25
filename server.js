// modules =================================================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
require('./config/passport')(passport); // pass passport for configuration
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'WPS<3' }));
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
});

// routes ==================================================
require('./app/routes')(app, passport); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app





