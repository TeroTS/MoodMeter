
var UserData = require('./models/user').userData;
var User = require('./models/user').user;
//var Admin = require('./models/user').admin;

module.exports = function(app, passport) {

	// Define a middleware functions to be used for every secured routes
	//
    //this checks only that user is logged in, all users can access these routes
    var auth = function(req, res, next) {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };

	//this is used to check that certain route can be accessed only by user
	//with certain role
    function requireRole(roleArray) {
        return function(req, res, next) {
            //var session_user = req.session.passport.user;
            //var req_user = req.user;
            var authOk = false;
            for(var i = 0; i < roleArray.length; i++) {
                if(req.isAuthenticated() && req.user.role === roleArray[i])
                    authOk = true;
            }
            if (authOk)
                next();
            else
                res.send(403);
        };
    }

    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

	// process the login form
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.send(req.user);
	});

	//sign up
	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
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
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : 'http://localhost:8089/#/home',
        failureRedirect : 'http://localhost:8089/#/login'
    }));

    // REST API

    // get todays date without time
    function dateToday() {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        return new Date(year, month, day);
    }

    // encode time periods from client from string to milliseconds
    function periodInMilliseconds(period) {
    	var timeMilliseconds;
    	switch (period) {
	        case '1 week':
	        	timeMilliseconds = 7*24*60*60*1000;
	            break;
	        case '1 month':
	        	timeMilliseconds = 28*24*60*60*1000;
	            break;
	        case '3 months':
	        	timeMilliseconds = 84*24*60*60*1000;
	            break;
	        case '6 months':
	        	timeMilliseconds = 168*24*60*60*1000;
	            break;
    	}
    	return timeMilliseconds;
    }
    // /home
    // user (user and manager) happiness data post
    app.post('/users/:id/data', auth, function(req, res) {

    	var date = dateToday();

    	var query = {$and: [{'user': req.params.id}, {'timeStamp': date}]};
    	//save or update
    	UserData.findOne(query, function(err, data) {
    		if (err) res.send(err);
    		//first write
    		if (data === null) {
    	    	data = new UserData({
    	        	user		: req.params.id,
    	        	timeStamp	: date,
    	        	value		: req.body.value
    	    	});
    	    //update
    		} else {
				data.user = req.params.id;
				data.timeStamp = date;
				data.value = req.body.value;
    		}
	        data.save(function(err, data) {
	            if (err)
	                res.send(err);
	            res.json(data);
	        });
    	});

    });

    // /my-account
    // get user (user and manager) happiness data
    app.get('/users/:id/data', auth, function(req, res) {
    	var period = req.param('period');
    	var timePeriod = periodInMilliseconds(period);
 /*       UserData.find({'user': req.params.id}, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });*/
    	//use lean() to return javascript objects instead of BSON
    	UserData.find({'user': req.params.id}).lean().exec(function(err, data) {
            var dataArray = [];
            var dateArray = [];
            if (err) res.send(err);
            var arrayLength = data.length;
            for (var i = 0; i < arrayLength; i++) {
            	var itemAge = dateToday() - data[i].timeStamp;
            	if (itemAge <= timePeriod) {
            		dataArray.push(data[i].value);
            		dateArray.push(data[i].timeStamp);
            	}
            }
            res.json({data : dataArray, dates : dateArray});
    	});
    });

    // dashboard/users
    // dashboard/managers
    // get users, only admin and manager
    app.get('/users', requireRole(['admin', 'manager']), function(req, res) {
    	//areManagers = req.param('managers');
    	var type = req.query.type;
    	if (req.user.role === 'admin') {
        	if (type === 'manager') {
    	    	User.find({'role': 'manager'}, function (err, managers) {
    	    		res.json(managers);
    	    	});
        	} else {
    	    	User.find({'role': 'user'}, function (err, users) {
    	    		res.json(users);
    	    	});
    	    }
    	} else {
    	    var query = {$and: [{'role': 'user'}, {'managerName': req.user.name}]};
            User.find(query, function (err, users) {
                res.json(users);
            });
    	}
    });

    // dashboard/users
    // dashboard/managers
    // get user, only admin and manager
    app.get('/users/:id', requireRole(['admin', 'manager']), function(req, res) {
        User.find({'id': req.params.id}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

    // dashboard/users
    // dashboard/managers
    // delete user, only admin
    app.delete('/users/:id', requireRole(['admin']), function(req, res) {
    	User.remove({'id': req.params.id}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
    	});
    });

    // dashboard/users
    // update user, only admin
    app.put('/users/:id', requireRole(['admin']), function(req, res) {
    	User.findOne({'id': req.params.id}, function(err, user) {
    		if (err) res.send(err);
            user.role = req.body.role;
    		user.managerName = req.body.manager;
            //user.markModified('role');
            //user.markModified('managerName');
	        user.save(function(err, user) {
	            if (err)
	                res.send(err);
	            res.json(user);
	        });
    	});
    });

    // dashboard/admins
    // get admins, only admin
    app.get('/admins', requireRole(['admin']), function(req, res) {
    	User.find({role: 'admin'}, function(err, admins) {
            if (err)
                res.send(err);
            res.json(admins);
    	});
    });

    // dashboard/admins
    // delete admin, only admin
    app.delete('/admins/:id', requireRole(['admin']), function(req, res) {
        var query = {$and: [{'role': 'admin'}, {'email': req.params.id}]};
    	User.remove(query, function(err, admin) {
            if (err)
                res.send(err);
            res.json(admin);
    	});
    });

    //get the number of users, managers and admins
    app.get('/counts', requireRole(['admin', 'manager']), function(req, res) {
        if (req.user.role === 'admin') {
            User.count({role: 'admin'}, function(err, adminCount) {
                if (err)
                    res.send(err);
                User.count({role: 'manager'}, function(err, managerCount) {
                    if (err)
                        res.send(err);
                    User.count({role: 'user'}, function(err, userCount) {
                        if (err)
                            res.send(err);
                        res.json({admins: adminCount,
                                  managers: managerCount,
                                  users: userCount});
                    });
                });
            });
        } else {
            var query = {$and: [{'role': 'user'}, {'managerName': req.user.name}]};
            User.find(query, function (err, users) {
                res.json({users: users.length});
            });
        }
    });

};
