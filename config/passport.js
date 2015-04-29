// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// load up the user and admin models
var User = require('../app/models/user').user;
//var Admin = require('../app/models/user').admin;

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user (=user or admin) for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user (=user or admin)
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({$and: [{'role': 'admin'}, {'email': email}]}, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({'email' :  email}, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // create the user
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.role = 'admin';

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }
                });
             // user is logged in and already has a local account. Ignore signup. 
             // (You should log out before trying to create a new account)
            } else {           
                return done(null, req.user);
            }

        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use('google', new GoogleStrategy({

        clientID            : configAuth.googleAuth.clientID,
        clientSecret        : configAuth.googleAuth.clientSecret,
        callbackURL         : configAuth.googleAuth.callbackURL,
        passReqToCallback   : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            
            var mailAddr = (profile.emails[0].value || '').toLowerCase();
            
            //check mail domain (mail address ends with @comiq.fi)
            if (mailAddr.slice(-9) != '@comiq.fi') {
                return done(null, false);
            }

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    // if a user is found, log them in
                    if (user) {
                        return done(null, user);
                    //if not, create a new user
                    } else {
                        var newUser          = new User();

                        newUser.id    = profile.id;
                        newUser.token = token;
                        newUser.name  = profile.displayName;
                        newUser.email = mailAddr;
                        newUser.role = 'user';

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session
                
                //are these needed ?
                user.id    = profile.id;
                user.token = token;
                user.name  = profile.displayName;
                user.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                //return user
                return done(null, user);

                /*user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });*/

            } 

        });

    }));

};
