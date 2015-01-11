var mongoose = require('mongoose');
var Poll = require('./models/poll');
var nodemailer = require('nodemailer');

//var pollItem = require('./models/poll');
//var Poll = pollItem.Poll;
//var Comment = pollItem.Comment;

module.exports = function(app) {

    // find a single poll from database
/*    app.param('id', function(req, res, next, id) {
        Poll.findById(id, function (err, poll) {
            if (err)
                res.json("Error !");
            req.poll = poll;
        });
        next();       
}); */

    // get single poll
    app.get('/rest/polls/:id', function(req, res) {
        Poll.findById(req.params.id, function (err, poll) {
            if (err)
                res.send(err); //res.sendfile('./public/views/error.html');
            res.json(poll);
            //res.sendfile('./public/views/error.html');
        });
        
        //res.json("test");
    });
        
    // route to handle creating goes here (app.post)
    app.post('/rest/polls', function(req, res) { 	
  
    	//generate objectid for unique poll url
    	var objId = mongoose.Types.ObjectId();
    	var pollUrlString = objId.toString();  
    	var adminUrlString = "" + '/admin';
    	    	
        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'tero.t.suhonen@gmail.com',
                pass: '*****'
            }
        });
        
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'roodle.mailer', // sender address
            to: req.body.osallistujatSposti, // list of receivers
            subject: 'Roodle: Linkki kyselyyn ' + req.body.otsikko, // Subject line
            text: 'Hei, ' + req.body.nimi + ' on käynnistänyt Roodle-kyselyn ' +  req.body.otsikko + '. Linkki kyselyyn on: http://localhost:8080/' + pollUrlString, // plaintext body
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
        
        res.json({ pollUrl : pollUrlString,
                   adminUrl : adminUrlString});
    });
    //update poll
    app.put('/rest/polls/:id', function(req, res) {
        //req.write(JSON.stringify());
        Poll.findById(req.params.id, function (err, poll) {
            if (err)
                res.send("Error !");
            poll.participants = JSON.stringify(req.body); //[{"name":"test","dates":{"0":true,"1":true}}]; //req.body;
            //poll.participants.dates
 //          console.log(req.body.users);
            //poll.title = "test test";
           
            poll.markModified('participants');
            poll.save(function(err) {
                if (err)
                    res.send("Error !");
                res.json(poll);
            });
            //res.json(poll);
        });    
        //res.json("test");
    });      
    // route to handle delete goes here (app.delete)
    // get single poll
    app.delete('/rest/polls/:id', function(req, res) {
        Poll.findByIdAndRemove(req.params.id, function (err, poll) {
            if (err)
                res.send("Error !"); //res.sendfile('./public/views/error.html');
            res.json(poll);
            //res.sendfile('./public/views/error.html');
        });
    });
    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
