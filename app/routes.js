
module.exports = function(app, passport) {
	
	// Define a middleware function to be used for every secured routes
	var auth = function(req, res, next) {
	    if (!req.isAuthenticated())
	    	res.send(401);
	    else
	    	next();
	};

    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });
    
	// process the login form
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.send(req.user);
	});
	
	// route to test if the user is logged in or not
	app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});
	
	// route to log out
	app.post('/logout', function(req, res) {
		req.logOut();
		res.send(200);
	});
	
	// google ---------------------------------

	// send to google to do the authentication
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// the callback after google has authenticated the user
	app.get('/auth/google/callback',
		passport.authenticate('google'));

};
