
var UserData = require('./models/user').userData;
var User = require('./models/user').user;
var Admin = require('./models/user').admin;

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
            for(var i = 0; i < roleArray.length; i++) {
                if(req.isAuthenticated() && req.user.role === roleArray[i])
                    next();
                else
                    res.send(403);
            };
        };
    };

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
        successRedirect : 'http://localhost:8080/#/home',
        failureRedirect : 'http://localhost:8080/#/login'
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
    		if (data == null) {
    	    	var data = new UserData({
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
    	//use lean() to return javascript objects instead of BSON
    	UserData.find().lean().exec({'user': req.params.id}, function(err, data) {
            if (err) res.send(err);
            var dataArray = [];
            var dateArray = [];
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
    	areManagers = req.param('managers');
    	if (req.user.role === 'admin') {
        	if (areManagers) {
    	    	User.find({'role': 'manager'}, function (err, users) { 
    	    		res.json(users);
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
    	User.findone({'id': req.params.id}, function(err, user) {
    		if (err) res.send(err);
    		user.isManager = req.body.user.isManager;
    		user.managerName = req.body.user.managerName;
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
    	Admin.find(function(err, admins) {
            if (err)
                res.send(err);
            res.json(admins);    		
    	});	
    });
    
    // dashboard/admins
    // delete admin, only admin
    app.delete('/admins/:email', requireRole(['admin']), function(req, res) {
    	Admin.remove({'email': req.params.email}, function(err, admin) {
            if (err)
                res.send(err);
            res.json(admin);	    	
    	});
    });
    

};
