var mongoose = require('mongoose');
var Poll = require('./models/poll');
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
                res.send("Error !");
            res.json(poll);
        });
        
        //res.json("test");
    });
        
    // route to handle creating goes here (app.post)
    app.post('/rest/polls', function(req, res) {
    	
        function createAdminUrl()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for( var i=0; i < 8; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
        
            return text;
        }  
  
    	//generate objectid for unique poll url
    	var objId = mongoose.Types.ObjectId();
    	var pollUrlString = objId.toString();  
    	var adminUrlString = createAdminUrl() + '/admin';

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
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
