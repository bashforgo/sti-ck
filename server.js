//require a few things
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');

//config
var db = require('./config/db');
var port = process.env.PORT || 8080; //set our port
require('./config/passport')(passport); //pass passport for configuration
mongoose.connect(db.url); //connect to mongoDB database

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.cookieParser()); //read cookies (needed for auth)
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: "public/images" }));
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'WPS<3' }));
	app.use(passport.initialize());
	app.use(passport.session());
});

//node routes
require('./app/routes')(app, passport); //pass our application into our routes

//start app
app.listen(port); //listen on port
console.log('Magic happens on port ' + port);
exports = module.exports = app; //expose app