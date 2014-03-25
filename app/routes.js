module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.post('/signinup', passport.authenticate('local-signup-in',{
		successRedirect : '/0', // redirect to the secure profile section
		failureRedirect : '/1'}));

	app.get('/0', function (req, res) {
		res.writeHead(200);
		res.end(JSON.stringify(req.user));
	});

	app.get('/1', function (req, res) {
		res.writeHead(401);
		res.end("1");
	});

	app.get('/issignedin', function (req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/0');
		} else {
			res.redirect('/1');
		}
	});

	app.get('/signout', function (req, res) {
		req.logout();
		req.user.local.username = "null";
		res.redirect('/');
		res.end(JSON.stringify(req.user));
	})

	app.get('*', function (req, res) {
		res.sendfile('./public/index.html');
	});

};