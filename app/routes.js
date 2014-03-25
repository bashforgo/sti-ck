module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.post('/signupin', passport.authenticate('local-signup-in',{
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login'}));

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};