var mongoose = require('mongoose');
var Poll = require('./models/poll');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/rest/polls', function(req, res) {
        // use mongoose to get all nerds in the database
        Poll.find(function(err, polls) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(polls); // return all nerds in JSON format
        });
    });
        
    // route to handle creating goes here (app.post)
    app.post('/rest/polls', function(req, res) {
    	
    	  //generate objectid for unique poll url
    	  var objId = mongoose.Types.ObjectId();
    	  var pollUrlString = objId.toString();
    	  var adminUrlString = pollUrlString + '/admin';

        Poll.create({
        		_id : objId,
            title : req.body.otsikko,
            location : req.body.sijainti,
            description : req.body.kuvaus,
            creatorName : req.body.nimi,
            creatorEmail : req.body.sposti,
            dates : req.body.pvm,
            participantEmails : req.body.osallistujatSposti,
            participants : req.body.osallistujat,
            adminUrl : adminUrlString,
            pollUrl : pollUrlString
        }, function(err, todo) {
            if (err)
                res.send(err);
           }
        );
        res.json({ message: 'Poll created !' });
    });   
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
