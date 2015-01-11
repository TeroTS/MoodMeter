var mongoose = require('mongoose');
var Poll = require('./models/poll');
var nodemailer = require('nodemailer');

module.exports = function(app) {

    //get single poll
    app.get('/rest/polls/:id', function(req, res) {
        Poll.findById(req.params.id, function (err, poll) {
            if (err)
                res.send(err);
            res.json(poll);
        });
    });
        
    //create poll
    app.post('/rest/polls', function(req, res) { 
    	//generate objectid for unique poll url
    	var objId = mongoose.Types.ObjectId();
    	var pollUrlString = objId.toString();
    	    	
        //nodemailer configs
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
        
        // setup e-mail data
        var mailOptions = {
            from: 'roodle.mailer',
            to: req.body.participantEmails,
            subject: 'Roodle: Linkki kyselyyn ' + req.body.title,
            text: 'Hei, ' + req.body.creatorName + ' on käynnistänyt Roodle-kyselyn ' +  req.body.title + '. Linkki kyselyyn on: http://localhost:8080/#/polls/' + pollUrlString
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    	
        Poll.create({
        	_id : objId,
            title : req.body.title,
            location : req.body.location,
            description : req.body.description,
            creatorName : req.body.creatorName,
            dates : req.body.dates,
            participantEmails : req.body.participantEmails,
            participants : req.body.participants,
            pollUrl : pollUrlString
        }, function(err, todo) {
            if (err)
                res.send(err);
           }
        );
        
        res.json({ pollUrl : pollUrlString});
    });
    
    //update poll (add participants)
    app.put('/rest/polls/:id', function(req, res) {
        Poll.findById(req.params.id, function (err, poll) {
            if (err)
                res.send("Error !");
            poll.participants = JSON.stringify(req.body);
           
            poll.markModified('participants');
            poll.save(function(err) {
                if (err)
                    res.send("Error !");
                res.json(poll);
            });
        });    
    }); 
         
    //delete poll
    app.delete('/rest/polls/:id', function(req, res) {
        Poll.findByIdAndRemove(req.params.id, function (err, poll) {
            if (err)
                res.send("Error !");
            res.json(poll);
        });
    });

    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
